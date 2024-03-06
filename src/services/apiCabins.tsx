import supabase, { supabaseUrl } from "./supabase";

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

export async function createCabin(newCabin) {
  console.log(newCabin);

  const imageName = `${Math.random()}-${newCabin.image[0]?.name}`;
  console.log(imageName);

  const test = `https://dphwgwsehqjvebdyhncn.supabase.co/storage/v1/object/public/cabin_images/Binz.jpg?t=2024-03-06T18%3A03%3A29.117Z`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(
      `Das Zimmer konnte nicht angelegt werden. ${error.message}: ${error.details}`
    );
  }

  // Upload image to Supabase
  const { error: uploadError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, newCabin.image[0]);

  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(uploadError);
    throw new Error(
      `Das Bild konnte nicht hochgeladern werden, das neue Zimmer wurde nicht erstellt `
    );
  }

  return data;
}
