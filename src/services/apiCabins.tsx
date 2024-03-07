import { FormValues } from "../types/FormTypes";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(
      `Die Zimmerliste konnte nicht geladen werden. ${error.message}: ${error.details}`
    );
  }

  return cabins;
}

export async function createCabin(newCabin: FormValues) {
  const image =
    typeof newCabin.image === "string" ? newCabin.image : newCabin.image[0];

  const imageName = `${Math.random()}-${image.name}`;
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

  // Upload image to storage
  const { error: uploadError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, image);

  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(uploadError);
    throw new Error(
      `Das Bild konnte nicht hochgeladen werden, das neue Zimmer wurde nicht erstellt `
    );
  }

  return data;
}
