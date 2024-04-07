'use client'

import { insert, update } from '../../(actions)/actions'
import Input from './Input'
import InputArrayIngredients from './InputArrayIngredients'
import InputSliderDuration from './InputSlider'
import StatusDialog from './StatusDialog'
import TextArea from './TextArea'
import TextAreaArrayInstructions from './TextAreaArrayInstructions'
import { supabase } from '@/utils/supabase'
import moment from 'moment'
import { useFormState } from 'react-dom'

interface RecipeFormProps {
  recipe?: any
}


export default function RecipeForm({ recipe }: RecipeFormProps) {
  const [{ data, error }, action] = useFormState(recipe ? update : insert, { data: null, error: null })


  return (
    <>
      <form action={action} className="relative flex flex-col">
        {recipe && <input type="hidden" name="recipe_id" value={recipe?.id} />}
        <label className="mb-[1.5rem]">
          <div className="text-primaryText mb-[0.625rem] text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem]">
            Food Name
          </div>
          <Input
            type="text"
            disabled={data}
            name="recipe_name"
            defaultValue={recipe?.name}
            placeholder="Enter food name"
            className="border-outline text:primaryText placeholder:text-secondaryText block w-full rounded-[2rem] border px-[1.5rem] py-[1.1875rem] text-[0.9375rem] font-[500] leading-[1.125rem] tracking-[0.07rem]"
          />
        </label>
        <label className="mb-[1.5rem]">
          <div className="text-primaryText mb-[0.625rem] text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem]">
            Description
          </div>
          <TextArea
            name="recipe_description"
            disabled={data}
            defaultValue={recipe?.description}
            placeholder="Tell a little about your food"
            rows={10}
            className="border-outline text-primaryText placeholder:text-secondaryText block w-full rounded-[0.5rem] border p-[1rem] text-[0.75rem] font-[500] leading-[0.9375rem] tracking-[0.03125rem]"
          />
        </label>
        <label className="mb-[1.5rem]">
          <div className="text-primaryText mb-[1rem] text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem]">
            Cooking Duration <span className="text-secondaryText font-[500]">(in minutes)</span>
          </div>
          <div className="mb-[0.5rem] flex items-center justify-between text-[0.9375rem] font-[700] leading-[1.5625rem] tracking-[0.03125rem] text-primary">
            <span>&le;10</span>
            <span>35</span>
            <span>&ge;60</span>
          </div>
          <InputSliderDuration
            name="recipe_duration"
            defaultValue={recipe?.duration ? [moment.duration(recipe.duration).asMinutes()] : [35]}
            min={10}
            max={60}
            step={1}
            disabled={data}
            className="cursor-pointer"
          />
        </label>
        <InputArrayIngredients recipe={recipe} recipeState={data} recipeError={error} />
        <TextAreaArrayInstructions recipe={recipe} recipeState={data} recipeError={error} />
        <StatusDialog success={data} error={error} />
        <Submit />
      </form>
    </>
  )
}

function Submit(props: any) {
  return (
    <button
      disabled={props.disabled}
      className="flex w-full items-center justify-center gap-[1rem] rounded-[2rem] bg-primary px-[2rem] py-[1.1875rem] text-center text-[0.9375rem] font-[700] leading-[1.125rem] tracking-[0.07rem] text-white"
    >
      Upload
    </button>
  )
}
