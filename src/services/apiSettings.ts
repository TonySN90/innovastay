import { ISettingsTypes } from "../types/settingsTypes";
import supabase from "./supabase";

export async function getSettings() {
  const { data: settings, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error(error);
    throw new Error(
      `Fehler beim Abrufen der Einstellungen. ${error.message}: ${error.details}`
    );
  }

  return { settings, error };
}

export async function updateSettings(newSettings: ISettingsTypes, id: number) {
  console.log(newSettings, id);

  const { data, error } = await supabase
    .from("settings")
    .update({ ...newSettings })
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(
      `Fehler beim Aktualisieren der Einstellungen. ${error.message}: ${error.details}`
    );
  }

  return data;
}
