import { FormValues } from "../types/FormTypes";
import { IGuestTypes } from "../types/GuestTypes";
import supabase from "./supabase";

// Get Guests ----------------------------------------
export async function getGuests() {
  const { data: guests, error } = await supabase.from("guests").select("*");

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
