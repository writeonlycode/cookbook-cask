import RecipeList from './(components)/RecipeList'
import { supabase } from '@/utils/supabase'
import { cookies } from 'next/headers'

export default async function RecipeListPage() {
  cookies()
  const { data: recipes, error, count } = await supabase.from('recipes').select('*', { count: 'exact' }).limit(10)

  return (
    <main className="mx-auto flex min-h-screen max-w-prose flex-col px-[1.5rem] py-[1.5rem]">
      <RecipeList initialRecipes={recipes} initialCount={count as number} limit={10} />
    </main>
  )
}
