import { useFormStatus } from 'react-dom'

export default function Input(props: any) {
  const { pending } = useFormStatus()
  return <input {...props} disabled={props.disabled || pending} />
}
