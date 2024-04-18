import {
  PostgrestQueryBuilder,
  PostgrestResponse,
} from "@supabase/postgrest-js";
import { FormValues } from "../types/FormTypes";
import supabase, { supabaseUrl } from "./supabase";
import { ICabinTypes } from "../types/cabinTypes";
import { IFilterTypes, ISortTypes } from "../types/GlobalTypes";
import { PAGE_SIZE } from "../utils/constants";

export async function getCabins(
  filter: IFilterTypes,
  sortBy: ISortTypes | undefined,
  page: number | null
) {
  // Query
  let query = supabase.from("cabins").select("*", { count: "exact" });

  // Filter
  if (filter) {
    const { field, value, operator } = filter;
    if (operator === "eq") query = query.eq(field, value);
  }

  // Sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
    console.log(page)

  // Page
  // if (page) {
  //   const from = (page - 1) * PAGE_SIZE;
  //   const to = from + PAGE_SIZE - 1;
  //   query = query.range(from, to);
  // }


  const {
    data: cabins,
    error,
    count,
  } = (await query) as PostgrestResponse<ICabinTypes>;

  if (error) {
    console.error(error);
    throw new Error(
      `Die Zimmerliste konnte nicht geladen werden. ${error.message}: ${error.details}`
    );
  }

  return { cabins, count };
}

export async function createUpdateCabin(
  newCabin: ICabinTypes | FormValues,
  cabinId?: number
) {
  const hastImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  const image =
    typeof newCabin.image === "string" ? newCabin.image : newCabin.image?.[0];

  if (!image) {
    throw new Error("Bild nicht gefunden.");
  }

  const imageName =
    typeof image === "string" ? image : `${Math.random()}-${image.name}`;

  const imagePath = hastImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  // Create Query

  // @ts-expect-error type error from supabase
  let query = supabase.from("cabins") as PostgrestQueryBuilder<an>;

  // if create new cabin
  if (!cabinId) query = query.insert([{ ...newCabin, image: imagePath }]);

  // if update existing cabin
  if (cabinId)
    query = query.update({ ...newCabin, image: imagePath }).eq("id", cabinId);

  // Execute Query
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(
      `Das Zimmer konnte nicht angelegt werden. ${error.message}: ${error.details}`
    );
  }

  // Upload image to storage
  if (hastImagePath) return data;

  const { error: uploadError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, image);

  if (uploadError) {
    console.log(uploadError);
    await supabase.from("cabins").delete().eq("id", data[0].id);

    throw new Error(
      `Das Bild konnte nicht hochgeladen werden, das neue Zimmer wurde nicht erstellt `
    );
  }

  return data;
}

// -------------------------------------

export async function deleteCabin(cabinId: number) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId)
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
