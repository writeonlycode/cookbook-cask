'use client'

import Input from './Input'
import TextArea from './TextArea'
import { dragIcon } from '@/app/(components)/icons/DragIcon'
import { plusIcon } from '@/app/(components)/icons/PlusIcon'
import { trashIcon } from '@/app/(components)/icons/TrashIcon'
import { useState } from 'react'

export default function TextAreaArrayInstructions({ recipe, recipeState, recipeError }: any) {
  const [inputArray, setInputArray] = useState(recipe?.instructions || [])

  return (
    <div className="mb-[3.75rem] flex flex-col gap-[1.5rem] ">
      <div className="text-primaryText mb-[0.625rem] text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem]">
        Steps
      </div>
      <Input type="hidden" name="recipe_instructions" value={JSON.stringify(inputArray)} readOnly />
      {inputArray.map((input: any, index: number) => {
        return (
          <div key={index} className="flex items-stretch gap-[0.5rem]">
            <div className="flex flex-col gap-[1rem]">
              <div className="bg-mainText relative mt-[0.4rem] flex max-h-[1.5rem] min-h-[1.5rem] min-w-[1.5rem] max-w-[1.5rem] items-center justify-center rounded-full text-[0.75rem] font-[700] text-white">
                <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">{index + 1}</span>
              </div>
              <span className="cursor-grab">{dragIcon}</span>
            </div>
            <TextArea
              type="text"
              disabled={recipeState}
              rows={4}
              value={input.text}
              onChange={(e: any) => {
                const newArray = inputArray.map((v: any, i: number) => {
                  if (i === index) {
                    return { ...v, text: e.target.value }
                  } else {
                    return v
                  }
                })
                setInputArray(newArray)
              }}
              placeholder="Enter an instruction to prepare the recipe"
              className="border-outline text-secondaryText block w-full rounded-[0.5rem] border px-[1.5rem] py-[1.1875rem] text-[0.9375rem] font-[500] leading-[1.125rem] tracking-[0.07rem]"
            />
            <div className="flex flex-col items-center justify-center">
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
          setInputArray([...inputArray, { text: '', weight: inputArray.length }])
        }}
      >
        {plusIcon} Step
      </button>
    </div>
  )
}
