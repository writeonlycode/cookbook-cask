'use client'

import Input from './Input'
import { dragIcon } from '@/app/(components)/icons/DragIcon'
import { plusIcon } from '@/app/(components)/icons/PlusIcon'
import { trashIcon } from '@/app/(components)/icons/TrashIcon'
import { useState } from 'react'

export default function InputArrayIngredients({ recipe, recipeState, recipeError }: any) {
  const [inputArray, setInputArray] = useState(recipe?.ingredients || [])

  return (
    <div className="mb-[3.75rem] flex flex-col gap-[1.5rem] ">
      <div className="text-primaryText mb-[0.625rem] text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem]">
        Ingredients
      </div>
      <Input type="hidden" name="recipe_ingredients" value={JSON.stringify(inputArray)} readOnly />
      {inputArray.map((input: any, index: number) => {
        return (
          <div key={index} className="flex items-center gap-[0.5rem]">
            <span className="cursor-grab">{dragIcon}</span>
            <Input
              type="text"
              disabled={recipeState}
              value={input.name}
              onChange={(e: any) => {
                const newArray = inputArray.map((v: any, i: number) => {
                  if (i === index) {
                    return { ...v, name: e.target.value }
                  } else {
                    return v
                  }
                })
                setInputArray(newArray)
              }}
              placeholder="Enter ingredient"
              className="border-outline text-secondaryText block w-full rounded-[2rem] border px-[1.5rem] py-[1.1875rem] text-[0.9375rem] font-[500] leading-[1.125rem] tracking-[0.07rem]"
            />
            <div className="flex h-full items-center">
              <span
                className="block h-[1.4rem] w-[1.4rem] cursor-pointer"
                onClick={() => {
                  const newArray = inputArray.filter((_: any, i: number) => i !== index)
                  setInputArray(newArray)
                }}
              >
                {trashIcon}
              </span>
            </div>
          </div>
        )
      })}
      <button
        type="button"
        className="border-outline text-primaryText flex w-full items-center justify-center gap-[0.3125rem] rounded-[2rem] border p-[1.1875rem] text-[0.9375rem] font-[500] leading-[1.125rem] tracking-[0.07rem]"
        onClick={() => {
          setInputArray([...inputArray, { name: '', weight: inputArray.length }])
        }}
      >
        {plusIcon} Ingredient
      </button>
    </div>
  )
}
