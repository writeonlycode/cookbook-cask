'use client'

import food from '@/assets/temporary/abillion-BlQc1APEaL0.jpg'
import { supabase } from '@/utils/supabase'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface RecipeListProps {
  recipes?: any
  limit?: number
  count?: number
}

export default function RecipeList({ recipes = [], limit = 10, count = 0 }: RecipeListProps) {
  const initialRender = useRef(true)

  const [recipesLimit, setRecipesLimit] = useState(limit)
  const [recipesList, setRecipesList] = useState(recipes)
  const [recipesCount, setRecipesCount] = useState<number | null>(count)
  const [recipesPending, setRecipesPending] = useState(false)

  useEffect(() => {
    const fetchRecipes = async () => {
      setRecipesPending(true)

      const { data: recipes, count } = await supabase
        .from('recipes')
        .select('*', { count: 'exact' })
        .limit(recipesLimit)

      setRecipesList(recipes)
      setRecipesCount(count)
      setRecipesPending(false)
    }

    if (!initialRender.current) {
      fetchRecipes()
    }

    initialRender.current = false
  }, [recipesLimit])

  return (
    <>
      <div className="mb-[2rem] grid grid-cols-2 gap-x-[1.5625rem] gap-y-[2rem]">
        {recipesList?.map((recipe: any) => {
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
                <p className="text-secondaryText text-[0.75rem] font-[500] leading-[0.9375rem] tracking-[0.03125rem]">
                  <span>Category</span> • <span>{duration.humanize()}</span>
                </p>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="flex flex-col">
        <p className="text-secondaryText mb-[1rem] text-center text-[0.75rem] font-[500] leading-[0.9375rem] tracking-[0.03125rem]">
          Showing {recipesList.length} of {recipesCount} recipes
        </p>
        <button
          onClick={() => setRecipesLimit(recipesLimit + 10)}
          className="disabled:bg-form disabled:text-secondaryText flex w-full items-center justify-center gap-[1rem] rounded-[2rem] bg-primary px-[2rem] py-[1.1875rem] text-center text-[0.9375rem] font-[700] leading-[1.125rem] tracking-[0.07rem] text-white"
          disabled={recipesList.length === recipesCount || recipesPending}
        >
          {recipesPending ? loading : recipesList.length === recipesCount ? 'No More Recipes to Show' : 'Load More'}
        </button>
      </div>
    </>
  )
}

const loading = (
  <svg
    className="text-secondaryText h-5 w-5 animate-spin"
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
