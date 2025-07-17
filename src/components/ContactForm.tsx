// components/ContactForm.tsx
"use client";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data: any) => {
    await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: new FormData(document.querySelector("form") as HTMLFormElement),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <input
        {...register("name")}
        placeholder="Your Name"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        {...register("email")}
        type="email"
        placeholder="Your Email"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        {...register("message")}
        placeholder="Your Message"
        rows={5}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <button
        type="submit"
        className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
      {isSubmitSuccessful && <p className="text-green-600 mt-2">Thanks! I'll be in touch.</p>}
    </form>
  );
}
