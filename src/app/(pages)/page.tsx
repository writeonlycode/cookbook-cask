import onboarding from '@/assets/images/recipes-cask-onboarding.png'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  cookies()

  return (
    <main className="mx-auto flex max-w-prose flex-col items-center justify-center px-[1.5rem]">
      <Image src={onboarding} alt="" className="mb-[3rem]" />
      <div className="mb-[4.5rem] max-w-[14rem]">
        <h1 className="text-mainText mb-[1rem] text-center text-[1.375rem] font-[700] leading-[2rem] tracking-[0.03125rem]">
          Start Cooking
        </h1>
        <p className="text-secondaryText text-center text-[1.0625rem] font-[500] leading-[1.6875rem] tracking-[0.03125rem]">
          Let’s join our community to cook better food!
        </p>
      </div>
      <Link
        href="/recipes"
        className="w-full rounded-[2rem] bg-primary p-[1.1875rem] text-center text-[0.9375rem] font-[700] leading-[1.125rem] tracking-[0.07rem] text-white"
      >
        Get Started
      </Link>
    </main>
  )
}
