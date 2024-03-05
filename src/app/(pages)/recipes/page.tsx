import RecipeList from './(components)/RecipeList'
import { supabase } from '@/utils/supabase'
import { cookies } from 'next/headers'

export default async function RecipeListPage() {
  cookies()
  const { data: recipes, error, count } = await supabase.from('recipes').select('*', { count: 'exact' }).limit(10)

  return (
    <main className="mx-auto flex min-h-screen max-w-prose flex-col px-[1.5rem] py-[1.5rem]">
      <RecipeList recipes={recipes} limit={10} count={count as number} />
    </main>
  )
}

// const author = (
//   <div className="mb-[1rem] flex items-center gap-[0.5rem]">
//     <Image src={profile} alt="" className="h-[2rem] w-[2rem] rounded-full object-cover object-center" />
//     <p className="text-primaryText text-[0.75rem] font-[500] leading-[0.9375rem] tracking-[0.03125rem]">Author Name</p>
//   </div>
// )
