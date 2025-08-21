"use client";

import Image from "next/image";
import * as Yup from "yup";
import { Formik, FormikHelpers, FormikValues } from "formik";
import PaystackPop from "@paystack/inline-js";

import Input from "@/components/Input";
import Select from "@/components/Select";

export default function Home() {
  const initialValues: FormikValues = {
    name: "",
    email: "",
    level: "lvl100",
    school: "media",
    paymentType: "full",
  };

  const handlePaymentSuccess = async (reference: string) => {
    try {
      const response = await fetch(
        `/api/payment/finalize?reference=${reference}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to finalize payment");
      }

      const data = await response.json();
      return data.data.paymentData;
    } catch (error) {
      console.error("Error handling payment success:", error);
    }
  };

  const handlePay = async (
    values: FormikValues,
    helpers: FormikHelpers<FormikValues>
  ) => {
    const popup = new PaystackPop();

    try {
      const response = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          level: values.level,
          school: values.school,
          paymentType: values.paymentType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const data = await response.json();
      console.log("Initiated successfully:", data.data.paymentData);
      // alert("User created successfully!");

      // Start the Paystack payment popup
      popup.resumeTransaction(data?.data?.paymentData?.access_code, {
        onSuccess: (transaction) => {
          console.log("Payment successful:", transaction);
          alert("Payment successful!");
          // Reset form values after submission
          handlePaymentSuccess(transaction.reference)
            .then(() => {
              console.log("Payment records updated successfully");
              helpers.resetForm();
            })
            .catch((error) => {
              console.error("Error updating payment records:", error);
              alert(
                "Payment successful but failed to update records. Please contact support."
              );
            });
        },
        onError: (error) => {
          console.error("Payment error:", error);
          alert("Payment failed. Please try again.");
        },
        onCancel: () => {
          console.log("Payment popup closed");
          alert("Payment popup closed. Please try again.");
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    } finally {
      helpers.setSubmitting(false);
    }
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-xs">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Formik
          initialValues={initialValues}
          onSubmit={handlePay}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(50, "Must be 50 characters or less")
              .required("Full name required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email required"),
            level: Yup.string()
              .oneOf(["lvl100", "lvl200", "lvl300", "lvl400"], "Invalid level")
              .required("Level required"),
            school: Yup.string()
              .oneOf(
                ["media", "fashion", "catering", "cosmetology"],
                "Invalid school"
              )
              .required("School required"),
          })}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full max-w-lg"
            >
              <Input
                label="Full Name"
                name="name"
                handleChange={handleChange}
                value={values.name}
                placeholder="Enter your fullname"
                errorMessage={errors?.name as string}
              />
              <Input
                name="email"
                label="Email Address"
                type="email"
                value={values.email}
                handleChange={handleChange}
                placeholder="Enter your email"
                errorMessage={errors?.email as string}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  name="school"
                  label="School"
                  value={values.school}
                  handleChange={handleChange}
                  options={[
                    { value: "media", label: "Media" },
                    { value: "fashion", label: "Fashion" },
                    { value: "catering", label: "Catering" },
                    { value: "cosmetology", label: "Cosmetology" },
                  ]}
                  errorMessage={errors?.school as string}
                />

                <Select
                  name="level"
                  label="Level"
                  value={values.level}
                  handleChange={handleChange}
                  options={[
                    { value: "lvl100", label: "100" },
                    { value: "lvl200", label: "200" },
                    { value: "lvl300", label: "300" },
                    { value: "lvl400", label: "400" },
                  ]}
                  errorMessage={errors?.level as string}
                />
              </div>

              <Select
                name="paymentType"
                label="Payment Type"
                value={values.paymentType}
                handleChange={handleChange}
                options={[
                  { value: "full", label: "Full Payment" },
                  { value: "minimum", label: "Part Payment" },
                ]}
                errorMessage={errors?.paymentType as string}
              />

              <button
                type="submit"
                className="bg-red-700 text-white rounded-lg px-4 py-3 hover:bg-red-800 transition-colors mt-2 font-semibold"
              >
                Make Payment
              </button>
            </form>
          )}
        </Formik>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://ghschools.online"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to GH Schools →
        </a>
      </footer>
    </div>
  );
}
