'use client'

import { useFormStatus } from 'react-dom'

export default function TextArea(props: any) {
  const { pending } = useFormStatus()
  return <textarea {...props} disabled={props.disabled || pending} />
}
