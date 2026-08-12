import { notFound } from "next/navigation"
import { PublicPaymentPage } from "@/components/payments/PublicPaymentPage"
import { Scale9ApiError } from "@/lib/scale9/client"
import { getCheckout } from "@/lib/scale9/public"

export default async function CheckoutPage({ params }: PageProps<"/checkout/[identifier]">) {
  const { identifier } = await params
  let data: unknown

  try {
    const response = await getCheckout(identifier)
    data = response.data
  } catch (error) {
    if (error instanceof Scale9ApiError && error.status === 404) notFound()
    throw error
  }

  return <PublicPaymentPage data={data} endpoint={`/api/public/checkout/${encodeURIComponent(identifier)}`} kind="checkout" />
}
