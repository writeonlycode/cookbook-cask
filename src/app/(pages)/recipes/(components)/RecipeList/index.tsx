'use client'

import { useRecipes } from '../../(hooks)/useRecipes'
import RecipeFilter from './RecipeFilter'
import RecipeSearch from './RecipeSearch'
import { adjustmentsIcon } from '@/app/(components)/icons/AdjustmentsIcon'
import food from '@/assets/temporary/abillion-BlQc1APEaL0.jpg'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface RecipeListProps {
  initialRecipes?: any
  initialCount?: number
  limit?: number
}

export default function RecipeList({ initialRecipes = [], initialCount, limit = 10 }: RecipeListProps) {
  // Filters
  const [textSearch, setTextSearch] = useState<string | undefined>()
  const [durationRange, setDurationRange] = useState<number[] | undefined>()

  // Modifiers
  const [recipesLimit, setRecipesLimit] = useState(limit)

  // Recipes Data
  const { data, count, pending } = useRecipes(initialRecipes, initialCount, { textSearch, durationRange, limit: recipesLimit })

  // Component Other States
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  return (
    <>
      <div className="mb-[1rem]">
        <div className="flex items-center gap-[1.5rem]">
          <div className="grow">
            <RecipeSearch textSearch={textSearch} setTextSearch={setTextSearch} pending={pending} />
          </div>
          <button onClick={() => setIsFiltersOpen(!isFiltersOpen)} className="relative h-[1.5rem] w-[1.5rem]">
            {durationRange && (
              <span className="absolute right-0 top-0 inline-flex h-[0.5rem] w-[0.5rem] rounded-full bg-primary"></span>
            )}
            {adjustmentsIcon}
          </button>
        </div>
      </div>
      <div className="mb-[2rem] grid grid-cols-2 gap-x-[1.5625rem] gap-y-[2rem]">
        {data?.map((recipe: any) => {
          const duration = moment.duration(recipe.duration)

          return (
            <Link key={recipe.id} href={'/recipes/' + recipe.id} className="flex flex-col">
              <Image
                src={food}
                alt="Recipe Picture"
                className="mb-[1rem] aspect-square w-full rounded-[1rem] object-cover object-center"
              />
              <div className="flex flex-col">
                <h2 className="text-primaryText mb-[0.5rem] text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem]">
                  {recipe.name}
                </h2>
                <p className="text-[0.75rem] font-[500] leading-[0.9375rem] tracking-[0.03125rem] text-secondaryText">
                  <span>Category</span> • <span>{duration.humanize()}</span>
                </p>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="flex flex-col">
        <p className="mb-[1rem] text-center text-[0.75rem] font-[500] leading-[0.9375rem] tracking-[0.03125rem] text-secondaryText">
          Showing {data?.length} of {count} recipes
        </p>
        <button
          onClick={() => setRecipesLimit(recipesLimit + 10)}
          className="flex w-full items-center justify-center gap-[1rem] rounded-[2rem] bg-primary px-[2rem] py-[1.1875rem] text-center text-[0.9375rem] font-[700] leading-[1.125rem] tracking-[0.07rem] text-white disabled:bg-form disabled:text-secondaryText"
          disabled={data?.length === count || pending}
        >
          {pending ? loading : data?.length === count ? 'No More Recipes to Show' : 'Load More'}
        </button>
      </div>
      <RecipeFilter
        durationRange={durationRange}
        setDurationRange={setDurationRange}
        isOpen={isFiltersOpen}
        setIsOpen={setIsFiltersOpen}
      />
    </>
  )
}

const loading = (
  <svg
    className="h-5 w-5 animate-spin text-secondaryText"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)
