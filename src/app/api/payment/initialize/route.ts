import feeStructure from "../../feeStructure";
import { respondWithError, respondWithSuccess } from "../../utils";

export async function POST(req: Request) {
  const payUrl = process.env.PAYSTACK_URL;
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  const body = await req.json();
  const { name, email, level, school, paymentType } = body;

  if (!payUrl || !secretKey) {
    return respondWithError("Payment service is not configured", 500);
  }

  if (!name || !email) {
    return respondWithError("Name and email are required", 400);
  }

  if (!level) {
    return respondWithError("Slug is required", 400);
  }

  const schoolFeeStructure = feeStructure[school];
  if (!schoolFeeStructure) {
    return respondWithError("Invalid school provided", 400);
  }

  if (!schoolFeeStructure[level]) {
    return respondWithError(
      `No level ${level?.replace("lvl", "")} for the ${school} school`,
      400
    );
  }

  const { amount, minimumAmount } = schoolFeeStructure[level];

  const toPayAmount = paymentType !== "minimum" ? amount : minimumAmount;
  console.log({ toPayAmount, amount, minimumAmount });

  const payload = {
    email,
    amount: Math.ceil(toPayAmount * 100), // Convert to smallest currency unit (GHS in this case)
    currency: "GHS",
    description: `Payment for ${name} at level ${level}`,
    channel: [
      "card",
      "bank",
      "ussd",
      "qr",
      "eft",
      "mobile_money",
      "bank_transfer",
    ],
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: name,
        },
        {
          display_name: "Level",
          variable_name: "level",
          value: level?.replace("lvl", ""),
        },
        {
          display_name: "School",
          variable_name: "school",
          value: school,
        },
        {
          display_name: "Payment Type",
          variable_name: "payment_type",
          value: paymentType,
        },
      ],
    },
  };

  const headers = {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(`${payUrl}/transaction/initialize`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    return respondWithError(
      errorData.message || "Failed to create payment",
      response.status
    );
  }
  const paymentData = await response.json();

  return respondWithSuccess(
    {
      message: "Payment created",
      data: {
        ...body,
        ...payload,
        paymentData: paymentData?.data || {},
      },
    },
    201
  );
}
