import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

// Dynamically import client components
const DynamicShoppingCart = dynamic(() => import("@/components/shopping-cart").then((mod) => mod.ShoppingCart), {
  ssr: false,
})

const DynamicLandingPage = dynamic(() => import("@/components/landing-page"), {
  ssr: false,
})

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicLandingPage />
    </Suspense>
  )
}

