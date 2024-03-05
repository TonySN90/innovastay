import supabase from "./supabase";

export async function getBookings() {
  const { data: bookings, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.error(error);
    throw new Error(
      `Buchungen konnten nicht geladen werden ${error.message}: ${error.details}`
    );
  }

  return bookings;
}
