import { supabase } from '@/utils/supabase'
import { useEffect, useRef, useState } from 'react'

interface UseRecipesOptions {
  textSearch?: string
  durationRange?: number[]
  limit?: number
}

interface UseRecipesReturn {
  data?: any
  count?: number
  pending: boolean
}

export function useRecipes(
  initialValue: any,
  { textSearch, durationRange, limit }: UseRecipesOptions
): UseRecipesReturn {
  const initialRender = useRef(true)
  const debounceTimerId = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [response, setResponse] = useState({ data: initialValue, count: initialValue.length })
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const fetchRecipes = async () => {
      setPending(true)

      const query = supabase.from('recipes').select('*', { count: 'exact' })

      if (textSearch) {
        query.ilike('name', `%${textSearch}%`)
      }

      if (durationRange) {
        query.gte('duration', durationRange[0] + " minutes")
        query.lte('duration', durationRange[1] + " minutes")
      }

      if (limit) {
        query.limit(limit)
      }

      const response = await query

      setResponse(response)
      setPending(false)
    }

    if (!initialRender.current) {
      if (debounceTimerId.current) clearTimeout(debounceTimerId.current)
      debounceTimerId.current = setTimeout(fetchRecipes, 800)
    }

    initialRender.current = false
  }, [textSearch, durationRange, limit])

  return { ...response, pending }
}
