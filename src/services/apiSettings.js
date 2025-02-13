import supabase from './supabase';

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Настройки не могут быть загружены');
  }
  return data;
}

export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Настройки не могут быть обновлены');
  }
  return data;
}
