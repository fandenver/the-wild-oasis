import supabase, { supabaseUrl } from './supabase.js';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    throw new Error('Домики не могут быть загружены');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error('Домик не может быть создан');
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Изображение домика не удалось загрузить, и домик не был создан',
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    throw new Error('Домик не может быть удален');
  }
}
