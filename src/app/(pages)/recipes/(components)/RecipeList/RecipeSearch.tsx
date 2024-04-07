'use client'

import { loadingIcon } from '@/app/(components)/icons/LoadingIcon'
import { searchIcon } from '@/app/(components)/icons/SearchIcon'

interface SearchProps {
  textSearch?: string
  setTextSearch: React.Dispatch<React.SetStateAction<string | undefined>>
  pending: boolean
}

export default function RecipeSearch({ textSearch, setTextSearch, pending, ...props }: SearchProps) {
  return (
    <div className="relative">
      <input
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
        placeholder="Search"
        className="w-full rounded-[2rem] bg-form py-[1.1875rem] pe-[1.5rem] ps-[3.5rem] text-[0.9375rem] font-[500] tracking-[-0.07rem] placeholder:font-[500] placeholder:text-[#9FA5C0]"
      />
      <div className="absolute left-[1.5rem] top-[1.1875rem] h-[1.5rem] w-[1.5rem] text-[#3E5481]">{searchIcon}</div>
      {pending && (
        <div className="text-primaryText absolute right-[1.5rem] top-[1.1875rem] h-[1.5rem] w-[1.5rem]">
          {loadingIcon}
        </div>
      )}
    </div>
  )
}
