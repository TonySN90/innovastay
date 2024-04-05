import {
  PostgrestSingleResponse,
  // @ts-expect-error type error from supabase
  PostgrestQueryBuilder,
} from "@supabase/supabase-js";
import { IBookingTypes } from "../types/BookingTypes";
import supabase from "./supabase";
import { FormValues } from "../types/FormTypes";
import { IFilterTypes } from "../types/GlobalTypes";

export async function getBookings(
  filter: IFilterTypes
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
        value.map((guest) => guest.id)
      );
  }

  const { data: bookings, error }: PostgrestSingleResponse<IBookingTypes[]> =
    await query;

  if (error) {
    console.error(error);
    throw new Error(
      `Buchungen konnten nicht geladen werden ${error.message}: ${error.details}`
    );
  }

  return bookings;
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

export async function getBookingsByFilter(filter: string, status: string) {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, cabinPrice, extrasPrice, totalPrice, isPaid, hasBreakfast, cabins(name, id, image, category, price), guests(id, fullName, address, postalCode, city, country, email, phone, information)",
      { count: "exact" }
    )
    .eq(filter, status);

  if (error) {
    throw new Error(
      `Fehler beim Abrufen der gefilterten Buchungen. ${error.message}: ${error.details}`
    );
  }
  return bookings;
}
