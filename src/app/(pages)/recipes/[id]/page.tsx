import RecipeDelete from '../(components)/RecipeDelete'
import food from '@/assets/temporary/abillion-BlQc1APEaL0.jpg'
import { supabase } from '@/utils/supabase'
import moment from 'moment'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

interface RecipeSinglePageProps {
  params: { id: number }
}

export default async function RecipeSinglePage({ params: { id } }: RecipeSinglePageProps) {
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
    <main className="relative">
      <Image
        src={food}
        alt="Recipe Picture"
        className="absolute z-[-1] mb-[1rem] aspect-square h-[24rem] w-full object-cover object-center"
      />
      <div className="mx-auto max-w-prose pt-[1rem]">
        <div className="flex items-center justify-between">
          <Link
            href="/recipes"
            className="relative flex h-[3.5rem] w-[3.5rem] rounded-full bg-white/20 text-white backdrop-blur-[0.5rem]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute left-[50%] top-[50%] h-6 w-6 translate-x-[-54%] translate-y-[-50%]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="flex items-center justify-center gap-[1rem]">
            <Link
              href={'/recipes/' + id + '/edit'}
              className="relative flex h-[3.5rem] w-[3.5rem] rounded-full bg-secondary text-white backdrop-blur-[0.5rem]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute left-[50%] top-[50%] h-6 w-6 translate-x-[-54%] translate-y-[-50%]"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </Link>
            <RecipeDelete id={id} />
          </div>
        </div>
        <article className="relative mt-[16rem] rounded-[2rem] bg-white px-[1.5rem] py-[2.75rem]">
          <div className="bg-outline absolute left-[50%] top-[1rem] h-[0.3125rem] w-[2.5rem] translate-x-[-50%]" />
          <h1 className="text-primaryText mb-[0.5rem] text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem]">
            {recipe.name}
          </h1>
          <p className="text-secondaryText text-[0.9375rem] font-[500] leading-[1.5625rem] tracking-[0.03125rem]">
            <span>Category</span> • <span>{duration.humanize()}</span>
          </p>
          <div className="bg-outline my-[1rem] h-[1px] w-full" />
          <h2 className="text-primaryText mb-[0.5rem] text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem]">
            Description
          </h2>
          <p className="text-secondaryText text-[0.9375rem] font-[500] leading-[1.5625rem] tracking-[0.03125rem]">
            {recipe.description}
          </p>
          <div className="bg-outline my-[1rem] h-[1px] w-full" />
          <h2 className="text-primaryText mb-[0.5rem] text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem]">
            Ingredients
          </h2>
          <ul>
            {recipe.ingredients
              .sort((a: any, b: any) => {
                return a.weight - b.weight
              })
              .map(({ id, name, order }: any) => {
                return (
                  <li
                    key={id}
                    className="text-primaryText mb-[0.9375rem] flex items-center gap-[0.5rem] text-[0.9375rem] font-[500] leading-[1.5625rem] tracking-[0.03125rem]"
                  >
                    <div className="flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-full bg-[#E3FFF8]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={4}
                        stroke="currentColor"
                        className="h-[0.8rem] w-[0.8rem] text-primary"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>{name}</div>
                  </li>
                )
              })}
          </ul>
          <div className="bg-outline my-[1rem] h-[1px] w-full" />
          <h2 className="text-primaryText mb-[0.5rem] text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem]">
            Steps
          </h2>
          <ul>
            {recipe.instructions
              .sort((a: any, b: any) => {
                return a.weight - b.weight
              })
              .map((instruction: any, index: number) => {
                return (
                  <li
                    key={instruction.id}
                    className="text-primaryText mb-[1rem] flex items-start gap-[1rem] text-[0.9375rem] font-[500] leading-[1.5625rem] tracking-[0.0313rem]"
                  >
                    <div className="bg-mainText relative mt-[0.2rem] flex max-h-[1.5rem] min-h-[1.5rem] min-w-[1.5rem] max-w-[1.5rem] items-center justify-center rounded-full text-[0.75rem] font-[700] text-white">
                      <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                        {index + 1}
                      </span>
                    </div>
                    {instruction.text}
                  </li>
                )
              })}
          </ul>
        </article>
      </div>
    </main>
  )
}
