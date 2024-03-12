import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { IBookingTypes } from "../types/BookingTypes";
import supabase from "./supabase";

export async function getBookings(): Promise<IBookingTypes[] | null> {
  const { data: bookings, error }: PostgrestSingleResponse<IBookingTypes[]> =
    await supabase
      .from("bookings")
      .select(
        "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, isPaid, cabins(name, id, image, category), guests(id, fullName, email)",
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
