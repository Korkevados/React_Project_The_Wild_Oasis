/** @format */

import { supabaseUrl } from "./supabase";
import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabines").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabines").delete().eq("id", id);
  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be Deleted");
  }
}

export async function createcabin(newcabin, id) {
  const hasImagePath = newcabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newcabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagepath = hasImagePath
    ? newcabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create/edit a cabin
  let query = supabase.from("cabines");

  //A) Create if there is not id
  if (!id) query = query.insert([{ ...newcabin, image: imagepath }]);

  // B) Edit an existing
  if (id) query = query.update({ ...newcabin, image: imagepath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be Created");
  }

  // 2. if succesfully created, upload the image to the bucket
  if (hasImagePath) return data;

  const { error: storageerror } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newcabin.image);

  //3. Delte the cabin if there is an Error with storage
  if (storageerror) {
    const { error } = await supabase.from("cabines").delete().eq("id", data.id);

    if (error) {
      console.error(error.message);
      throw new Error("Cabin photo could not be Uploaded");
    }
  }

  return data;
}
