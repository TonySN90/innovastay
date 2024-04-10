import { FormValues } from "../types/FormTypes";
import { IFilterTypes, ISortTypes } from "../types/GlobalTypes";
import { IGuestTypes } from "../types/GuestTypes";
import supabase from "./supabase";

// Get Guests ----------------------------------------
export async function getGuests(
  filter: IFilterTypes,
  sortBy: ISortTypes | undefined
) {
  let query = supabase.from("guests").select("*");

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

  const { data: guests, error } = await query;

  if (error) {
    throw new Error(
      `Gäste konnten nicht geladen werden ${error.message}: ${error.details}`
    );
  }

  return guests;
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
  console.log(newGuest);
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
