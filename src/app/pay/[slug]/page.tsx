import { notFound } from "next/navigation"
import { PublicPaymentPage } from "@/components/payments/PublicPaymentPage"
import { Scale9ApiError } from "@/lib/scale9/client"
import { getPaymentLink } from "@/lib/scale9/public"

export default async function PaymentLinkPage({ params }: PageProps<"/pay/[slug]">) {
  const { slug } = await params
  let data: unknown

  try {
    const response = await getPaymentLink(slug)
    data = response.data
  } catch (error) {
    if (error instanceof Scale9ApiError && error.status === 404) notFound()
    throw error
  }

  return <PublicPaymentPage data={data} endpoint={`/api/public/payment-links/${encodeURIComponent(slug)}`} kind="link" />
}
