import { respondWithError, respondWithSuccess } from "../../utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  const payUrl = process.env.PAYSTACK_URL;
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!payUrl || !secretKey) {
    return respondWithError("Payment service is not configured", 500);
  }

  if (!reference) {
    return respondWithError("Reference is required", 400);
  }

  const headers = {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(`${payUrl}/transaction/verify/${reference}`, {
    method: "GET",
    headers,
    // body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    return respondWithError(
      errorData.message || "Failed to get payment",
      response.status
    );
  }
  const paymentData = await response.json();

  return respondWithSuccess(
    {
      message: "Payment fetched successfully",
      data: {
        paymentData: paymentData?.data || {},
      },
    },
    200
  );
}
