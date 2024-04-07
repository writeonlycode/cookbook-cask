'use client'

import Slider from '@/app/(components)/ui/Slider'
import { useState } from 'react'

export default function InputSliderDuration(props: any) {
  const [value, setValue] = useState(props.defaultValue)

  return (
    <div>
      <Slider {...props} value={value} onValueChange={(value) => setValue(value)} />
      <p className="mb-[1rem] mt-[1rem] text-center text-[0.75rem] font-[500] leading-[0.9375rem] tracking-[0.03125rem] text-secondaryText">
        {typeof value === 'object' ? value.join("-") : value} minutes
      </p>
    </div>
  )
}
