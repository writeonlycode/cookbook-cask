'use client'

import InputSliderDurationRange from './InputSliderDurationRange'
import { cn } from '@/utils/cn'
import { useRef, useState } from 'react'

interface RecipeFilterProps {
  durationRange?: number[]
  setDurationRange: React.Dispatch<React.SetStateAction<number[] | undefined>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RecipeFilter({
  durationRange,
  setDurationRange,
  isOpen,
  setIsOpen,
  ...props
}: RecipeFilterProps) {
  const ref = useRef(null)
  const [internalDurationRange, setInternalDurationRange] = useState(durationRange || [10, 60])

  return (
    <>
      <div
        ref={ref}
        onClick={(e) => {
          if (e.target === ref.current) setIsOpen(false)
        }}
        className={cn('fixed inset-0 items-end justify-center bg-black/60', {
          'flex animate-fade-in': isOpen,
          'hidden animate-fade-out': !isOpen,
        })}
      >
        <div
          className={cn('w-full max-w-prose rounded-t-[2rem] bg-white px-[1.5rem] py-[2rem]', {
            'animate-slide-in-top': isOpen,
            'animate-slide-out-top': !isOpen,
          })}
        >
          <h2 className="mb-[2rem] text-center text-[1.0625rem] font-[700] leading-[1.6875rem] tracking-[0.03125rem] text-[#3E5481]">
            Add a Filter
          </h2>
          <div className="mb-[3.25rem]">
            <label className="mb-[1.5rem]">
              <div className="mb-[1rem] text-[1.0625rem] font-[700] leading-[1.6875rem] text-[#3E5481]">
                Cooking Duration <span className="font-[500] text-[#9FA5C0]">(in minutes)</span>
              </div>
              <div className="mb-[0.5rem] flex items-center justify-between text-[0.9375rem] font-[700] leading-[1.5625rem] tracking-[0.03125rem] text-primary">
                <span>&le;10</span>
                <span>35</span>
                <span>&ge;60</span>
              </div>
              <InputSliderDurationRange
                name="recipe_duration_range"
                defaultValue={internalDurationRange || [10, 60]}
                value={internalDurationRange}
                onValueChange={(value: any) => setInternalDurationRange(value)}
                min={10}
                max={60}
                step={1}
                className="cursor-pointer"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 items-center justify-center gap-[0.9375rem]">
            <button
              onClick={() => {
                setInternalDurationRange(durationRange || [10, 60])
                setIsOpen(false)
              }}
              className="rounded-[2rem] bg-form px-[2rem] py-[1.1875rem] text-center text-[0.9375rem] font-[700] leading-[1.125rem] tracking-[0.07rem] text-mainText"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setDurationRange(internalDurationRange)
                setIsOpen(false)
              }}
              className="rounded-[2rem] bg-primary px-[2rem] py-[1.1875rem] text-center text-[0.9375rem] font-[700] leading-[1.125rem] tracking-[0.07rem] text-white"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
