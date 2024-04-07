import Slider from '@/app/(components)/ui/Slider'

export default function InputSliderDurationRange({ value, ...props }: any) {
  return (
    <div>
      <Slider value={value} {...props} />
      <p className="mb-[1rem] mt-[1rem] text-center text-[0.75rem] font-[500] leading-[0.9375rem] tracking-[0.03125rem] text-secondaryText">
        {value && value.join('-')} minutes
      </p>
    </div>
  )
}
