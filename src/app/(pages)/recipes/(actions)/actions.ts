'use server'

import { supabase } from '@/utils/supabase'
import moment from 'moment'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function insert(previousState: any, formData: FormData) {
  const recipeFormData = {
    recipe_name: formData.get('recipe_name'),
    recipe_description: formData.get('recipe_description'),
    recipe_duration: moment.duration(formData.get('recipe_duration') as string, 'minutes'),
    recipe_ingredients: JSON.parse(formData.get('recipe_ingredients') as string),
    recipe_instructions: JSON.parse(formData.get('recipe_instructions') as string),
  }

  const { data, error } = await supabase.rpc('create_recipe', recipeFormData)

  if (!error) revalidatePath('/recipes')

  return { data, error }
}

export async function update(previousState: any, formData: FormData) {
  const recipeFormData = {
    recipe_id: formData.get('recipe_id'),
    recipe_name: formData.get('recipe_name'),
    recipe_description: formData.get('recipe_description'),
    recipe_duration: moment.duration(formData.get('recipe_duration') as string, 'minutes'),
    recipe_ingredients: JSON.parse(formData.get('recipe_ingredients') as string),
    recipe_instructions: JSON.parse(formData.get('recipe_instructions') as string),
  }

  const { data, error } = await supabase.rpc('update_recipe', recipeFormData)

  if (!error) revalidatePath('/recipes')

  return { data, error }
}

export async function destroy(previousState: any, formData: FormData) {
  const { error } = await supabase.from('recipes').delete().eq('id', formData.get('id'))

  if (!error) {
    revalidatePath('/recipes')
    redirect('/recipes')
  }

  return error
}
