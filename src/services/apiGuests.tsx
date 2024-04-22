import { PostgrestResponse } from "@supabase/supabase-js";
import { FormValues } from "../types/FormTypes";
import { IFilterTypes, ISortTypes } from "../types/GlobalTypes";
import { IGuestTypes } from "../types/GuestTypes";
import { PAGE_SIZE_GUESTS } from "../utils/constants";
import supabase from "./supabase";

// Get Guests --------------------------------------------
export async function getGuests(
  filter: IFilterTypes,
  sortBy: ISortTypes | undefined,
  page: number | null
) {
  let query = supabase.from("guests").select("*", { count: "exact" });

  // Filter
  if (filter) {
    const { field, value, operator } = filter;
    if (operator === "ilike") query = query.ilike(field, `%${value}%`);
    if (operator === "eq") query = query.eq(field, value);
  }

  // Sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // Page
  // if (page) {
  //   const from = (page - 1) * PAGE_SIZE_GUESTS;
  //   const to = from + PAGE_SIZE_GUESTS - 1;
  //   query = query.range(from, to);
  // }

  const {
    data: guests,
    error,
    count,
  } = (await query) as PostgrestResponse<IGuestTypes>;

  if (error) {
    throw new Error(
      `Gäste konnten nicht geladen werden ${error.message}: ${error.details}`
    );
  }

  return { guests, count };
}

// Create or Update Guest --------------------------------

export async function createUpdateGuest(
  newGuest: IGuestTypes | FormValues,
  guestId?: number
) {
  // Create Query
  // @ts-expect-error type error from supabase
  let query = supabase.from("guests") as PostgrestQueryBuilder<an>;

  // if create new guest
  if (!guestId) query = query.insert([newGuest]);

  // if update existing guest
  if (guestId) query = query.update({ ...newGuest }).eq("id", guestId);

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

export async function deleteGuest(guestId: number) {
  const { data, error } = await supabase
    .from("guests")
    .delete()
    .eq("id", guestId)
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
