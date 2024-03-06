import supabase from "./supabase";

export async function getGuests() {
  const { data: guests, error } = await supabase.from("guests").select("*");

  if (error) {
    throw new Error(
      `Gäste konnten nicht geladen werden ${error.message}: ${error.details}`
    );
  }

  return guests;
}
