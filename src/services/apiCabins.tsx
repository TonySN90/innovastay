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

  if (!image) {
    throw new Error("Bild nicht gefunden.");
  }

  const imageName =
    typeof image === "string" ? image : `${Math.random()}-${image.name}`;
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

export async function updateCabin(cabinId: number, updatedCabin: FormValues) {
  const image =
    typeof updatedCabin.image === "string"
      ? updatedCabin.image
      : updatedCabin.image[0];

  if (!image) {
    throw new Error("Bild nicht gefunden.");
  }

  const imageName =
    typeof image === "string" ? image : `${Math.random()}-${image.name}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  const forUpdate = { ...updatedCabin, image: imagePath };
  console.log(forUpdate);

  const { data, error } = await supabase
    .from("cabins")
    .update(forUpdate)
    .eq("id", cabinId)
    .select();

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
    console.log(uploadError);
    await supabase.from("cabins").delete().eq("id", data.id);

    throw new Error(
      `Das Bild konnte nicht hochgeladen werden, das neue Zimmer wurde nicht erstellt `
    );
  }

  return data;
}

export async function deleteCabin(cabinId: number) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId)
    .select()
    .single();

  if (error) {
    console;
    throw new Error(
      `Fehler beim Löschen des Zimmers!. ${error.message}: ${error.details}`
    );
  }
}
