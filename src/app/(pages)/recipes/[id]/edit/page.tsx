import RecipeForm from '../../(components)/RecipeForm'
import { supabase } from '@/utils/supabase'
import moment from 'moment'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function RecipeEditPage({ params: { id } }: any) {
  cookies()
  const { data: recipe, error } = await supabase
    .from('recipes')
    .select('*, ingredients (*), instructions (*)')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  const duration = moment.duration(recipe?.duration)

  return (
    <main className="mx-auto flex min-h-screen max-w-prose flex-col px-[1.5rem] py-[1.5rem]">
      <div className="mb-[2rem] mt-[0.75rem] flex items-center justify-between">
        <Link
          href={'/recipes/' + id}
          className="text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem] text-secondary"
        >
          Cancel
        </Link>
      </div>
      <RecipeForm recipe={recipe} />
    </main>
  )
}
