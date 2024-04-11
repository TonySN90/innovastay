import {
  PostgrestSingleResponse,
  // @ts-expect-error type error from supabase
  PostgrestQueryBuilder,
} from "@supabase/supabase-js";
import { IBookingTypes } from "../types/BookingTypes";
import supabase from "./supabase";
import { FormValues } from "../types/FormTypes";
import { IFilterTypes, ISortTypes } from "../types/GlobalTypes";
import { PAGE_SIZE } from "../utils/contants";

export async function getBookings(
  filter: IFilterTypes,
  sortBy: ISortTypes | undefined,
  page = 1
): Promise<IBookingTypes[] | null> {
  // Query

  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, cabinPrice, extrasPrice, totalPrice, isPaid, hasBreakfast, cabins(name, id, image, category, price), guests(id, fullName, address, postalCode, city, country, email, phone, information)",
      { count: "exact" }
    ) as PostgrestQueryBuilder<IBookingTypes[]>;

  // Filter

  if (filter) {
    const { field, value, operator } = filter;

    if (operator === "eq") query = query.eq(field, value);
    if (operator === "in" && Array.isArray(value))
      query = query.in(
        field,
        value.map((guest: { id: number }) => guest.id)
      );
    if (operator === "ilike") query = query.ilike(field, `%${value}%`);
  }

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    console.log(from, to);

    query = query.range(from, to);
  }

  const {
    data: bookings,
    error,
    count,
  }: PostgrestSingleResponse<IBookingTypes[]> = await query;

  if (error) {
    console.error(error);
    throw new Error(
      `Buchungen konnten nicht geladen werden ${error.message}: ${error.details}`
    );
  }

  return { bookings, count };
}
export async function getBooking(bookingId: number) {
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", bookingId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(
      `Buchung konnte nicht geladen werden ${error.message}: ${error.details}`
    );
  }

  return booking;
}

export async function createUpdateBooking(
  newBooking: IBookingTypes | FormValues,
  bookingId?: number
) {
  // Create Query

  let query = supabase.from("bookings") as PostgrestQueryBuilder<
    IBookingTypes[]
  >;

  // if create new booking
  if (!bookingId) query = query.insert([newBooking]);

  // if update existing booking
  if (bookingId) query = query.update({ ...newBooking }).eq("id", bookingId);

  // Execute Query
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(
      `Der Gast konnte nicht angelegt werden. ${error.message}: ${error.details}`
    );
  }

  return data;
}

export async function deleteBooking(bookingId: number) {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(
      `Fehler beim Löschen des Zimmers!. ${error.message}: ${error.details}`
    );
  }

  return data;
}

// export async function getBookingsByFilter(filter: string, status: string) {
//   const { data: bookings, error } = await supabase
//     .from("bookings")
//     .select(
//       "id, created_at, startDate, endDate, numNights, numGuests, status, cabinPrice, extrasPrice, totalPrice, isPaid, hasBreakfast, cabins(name, id, image, category, price), guests(id, fullName, address, postalCode, city, country, email, phone, information)",
//       { count: "exact" }
//     )
//     .eq(filter, status);

//   if (error) {
//     throw new Error(
//       `Fehler beim Abrufen der gefilterten Buchungen. ${error.message}: ${error.details}`
//     );
//   }
//   return bookings;
// }
