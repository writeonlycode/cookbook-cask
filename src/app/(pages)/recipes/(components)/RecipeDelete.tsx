'use client'

import { destroy } from '../(actions)/actions'
import { Dialog, DialogContent } from '@/app/(components)/ui/Dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useFormState, useFormStatus } from 'react-dom'

interface RecipeDeleteProps {
  id: number
}

export default function RecipeDelete({ id }: RecipeDeleteProps) {
  const [error, action] = useFormState(destroy, undefined)

  if (error) {
    console.error('Error:', error)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="relative flex h-[3.5rem] w-[3.5rem] rounded-full bg-secondary text-white backdrop-blur-[0.5rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute left-[50%] top-[50%] h-6 w-6 translate-x-[-54%] translate-y-[-50%]"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className="flex w-[20rem] flex-col rounded-[1.5rem] bg-white p-[3rem]">
        {!error && (
          <form action={action}>
            <h2 className="text-primaryText mb-[0.5rem] text-center text-[1.375rem] font-[700] leading-[2rem] tracking-[0.03125rem]">
              Are you sure you want to delete this recipe?
            </h2>
            <p className="text-primaryText mb-[1.5rem] flex flex flex-col items-center justify-center text-center text-[0.9375rem] font-[500] leading-[1.5625rem] tracking-[0.0313rem]">
              This action is permanent!
            </p>
            <input name="id" value={id} readOnly className="hidden" />
            <Submit />
          </form>
        )}
        {error && (
          <div>
            <h2 className="text-primaryText mb-[0.5rem] text-center text-[1.375rem] font-[700] leading-[2rem] tracking-[0.03125rem]">
              Error
            </h2>
            <p className="text-primaryText mb-[1.5rem] flex flex flex-col items-center justify-center text-center text-[0.9375rem] font-[500] leading-[1.5625rem] tracking-[0.0313rem]">
              You can try again later, or contact an administrator if the error persists.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Submit(props: any) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className="flex w-full items-center justify-center gap-[1rem] rounded-[2rem] bg-secondary px-[2rem] py-[1.1875rem] text-center text-[0.9375rem] font-[700] leading-[1.125rem] tracking-[0.07rem] text-white"
    >
      {pending && (
        <svg
          className="h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      Delete Recipe
    </button>
  )
}
