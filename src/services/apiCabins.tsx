import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(
      `Zimmer konnten nicht geladen werden ${error.message}: ${error.details}`
    );
  }

  return cabins;
}
