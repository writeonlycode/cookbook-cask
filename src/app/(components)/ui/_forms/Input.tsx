import React from 'react'
import { useFormStatus } from 'react-dom'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, disabled, ...props }, ref) => {
  const { pending } = useFormStatus()
  return <input type={type} className={className} ref={ref} disabled={disabled || pending} {...props} />
})

Input.displayName = 'Input'

export default Input
