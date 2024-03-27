import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { IBookingTypes } from "../types/BookingTypes";
import supabase from "./supabase";
import { FormValues } from "../types/FormTypes";

export async function getBookings(): Promise<IBookingTypes[] | null> {
  const { data: bookings, error }: PostgrestSingleResponse<IBookingTypes[]> =
    await supabase
      .from("bookings")
      .select(
        "id, created_at, startDate, endDate, numNights, numGuests, status, extrasPrice, totalPrice, isPaid, hasBreakfast, cabins(name, id, image, category, price), guests(id, fullName, address, postalCode, city, country, email, phone, information)",
        { count: "exact" }
      );

  if (error) {
    console.error(error);
    throw new Error(
      `Buchungen konnten nicht geladen werden ${error.message}: ${error.details}`
    );
  }

  return bookings;
}

export async function createUpdateBooking(
  newBooking: IBookingTypes | FormValues,
  bookingId?: number
) {
  // Create Query
  // @ts-expect-error type error from supabase
  let query = supabase.from("bookings") as PostgrestQueryBuilder<an>;

  // if create new booking
  if (!bookingId) query = query.insert([newBooking]);

  // if update existing booking
  console.log(newBooking);
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
