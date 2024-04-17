import { IBookingTypes } from "../types/BookingTypes";
import supabase from "./supabase";
import { FormValues } from "../types/FormTypes";
import { IFilterTypes, ISortTypes } from "../types/GlobalTypes";
import { PAGE_SIZE } from "../utils/constants";
import {
  // @ts-expect-error type error from supabase
  PostgrestQueryBuilder,
  PostgrestResponse,
} from "@supabase/supabase-js";
import { getToday, getYesterday } from "../utils/datesHelper";

export async function getBookings(
  filter: IFilterTypes | undefined,
  sortBy: ISortTypes | undefined,
  page: number
) {
  // Query
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, cabinPrice, extrasPrice, totalPrice, isPaid, hasBreakfast, cabins(name, id, image, category, price), guests(id, fullName, address, postalCode, city, country, email, phone, information)",
      { count: "exact" }
    );

  // Filter
  if (filter) {
    const { field, value, operator } = filter;

    if (operator === "eq") query = query.eq(field, value);
    if (operator === "ilike") query = query.ilike(field, `%${value}%`);
  }

  // Sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const {
    data: bookings,
    error,
    count,
  } = (await query) as PostgrestResponse<IBookingTypes>;

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

  let query = supabase.from("bookings") as PostgrestQueryBuilder<IBookingTypes>;

  // create new booking
  if (!bookingId) query = query.insert([newBooking]);

  // update existing booking
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

export async function getBookingsAfterDate(oldDate) {
  const { data: recentBookings, error } = await supabase
    .from("bookings")
    .select("startDate, endDate")
    // Last 5 days
    // .gte("startDate", oldDate)
    // .lte("startDate", getToday())
    // Today
    .gte("startDate", getYesterday())
    .lte("startDate", getToday({ end: true }))

    .order("startDate", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(
      `Die Buchungen konnten nicht geladen werden ${error.message}: ${error.details}`
    );
  }

  return recentBookings;
}
