'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/(components)/ui/Dialog'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

export default function StatusDialog({ success, error }: any) {
  const { pending, data, method, action } = useFormStatus()

  return (
    <Dialog open={success || error || pending}>
      <DialogContent className="flex w-[20rem] flex-col rounded-[1.5rem] bg-white p-[3rem]">
        <DialogHeader>
          <DialogTitle className="text-primaryText mb-[0.5rem] text-center text-[1.375rem] font-[700] leading-[2rem] tracking-[0.03125rem]">
            {success ? 'Upload Success!' : error ? 'Ops... Something went wrong!' : 'Uploading...'}
          </DialogTitle>
          <DialogDescription className="text-primaryText flex flex flex-col items-center justify-center text-center text-[0.9375rem] font-[500] leading-[1.5625rem] tracking-[0.0313rem] ">
            {success ? (
              'Your recipe has been uploaded, you can see it on your profile.'
            ) : error ? (
              'You can try again later, or contact an administrator if the error persists.'
            ) : (
              <svg
                className="h-5 w-5 animate-spin text-primary"
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
            {success && (
              <Link
                href={'/recipes/' + success?.id}
                className="mt-[1.5rem] w-full rounded-[2rem] bg-primary px-[2rem] py-[1.1875rem] text-center text-[0.9375rem] font-[700] leading-[1.125rem] tracking-[0.07rem] text-white"
              >
                See Your Recipe
              </Link>
            )}
            {error && (
              <Link
                href={'/recipes'}
                className="mt-[1.5rem] w-full rounded-[2rem] bg-secondary px-[2rem] py-[1.1875rem] text-center text-[0.9375rem] font-[700] leading-[1.125rem] tracking-[0.07rem] text-white"
              >
                Back to Home
              </Link>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
