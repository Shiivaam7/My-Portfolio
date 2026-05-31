"use client";

import { motion } from "framer-motion";
import { useCallback, useState, type FormEvent } from "react";
import { SITE } from "@/lib/constants";
import { submitContactForm } from "@/lib/contact-api";
import {
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormData,
} from "@/lib/contact-validation";
import { Spinner } from "@/components/ui/Spinner";
import { Toast } from "@/components/ui/Toast";

type Status = "idle" | "loading" | "success" | "error";

const INPUT_CLASS =
  "w-full rounded-xl border border-[#915EFF]/50 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#00FFFF]/60 focus:ring-1 focus:ring-[#00FFFF]/30";

const INPUT_ERROR_CLASS =
  "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/30";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({ visible: false, message: "", type: "success" });

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ visible: true, message, type });
      window.setTimeout(() => {
        setToast((t) => ({ ...t, visible: false }));
      }, 5000);
    },
    []
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const form = e.currentTarget;
    const data: ContactFormData = {
      name: String(new FormData(form).get("name") ?? ""),
      email: String(new FormData(form).get("email") ?? ""),
      subject: String(new FormData(form).get("subject") ?? ""),
      message: String(new FormData(form).get("message") ?? ""),
    };

    const clientValidation = validateContactForm(data);
    if (!clientValidation.valid) {
      setFieldErrors(clientValidation.errors);
      setStatus("error");
      showToast("Please fix the errors below.", "error");
      return;
    }

    setStatus("loading");

    try {
      const result = await submitContactForm({
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
      });

      setStatus("success");
      form.reset();
      showToast(
        result.message ?? "Message sent! I'll get back to you soon.",
        "success"
      );
    } catch (err) {
      setStatus("error");
      const error = err as Error & { fieldErrors?: ContactFieldErrors };
      if (error.fieldErrors) {
        setFieldErrors(error.fieldErrors);
      }
      showToast(
        error.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  const fieldError = (key: keyof ContactFormData) =>
    fieldErrors[key] ? (
      <p className="mt-1 text-xs text-red-400">{fieldErrors[key]}</p>
    ) : null;

  const inputClass = (key: keyof ContactFormData) =>
    `${INPUT_CLASS} ${fieldErrors[key] ? INPUT_ERROR_CLASS : ""}`;

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <motion.div
        id="message"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="scroll-mt-28 glass-strong relative overflow-hidden rounded-3xl border border-[#915EFF]/40 p-8 md:p-10"
      >
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#915EFF]/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#00FFFF]/10 blur-3xl" />

        <div className="relative">
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            Let&apos;s Talk
          </h2>
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
            Whether you&apos;re looking to collaborate on an ML project, discuss
            AI solutions, or just want to chat about data science — I&apos;m here
            to help!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-white"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Shivam Kumar"
                className={inputClass("name")}
                disabled={status === "loading"}
              />
              {fieldError("name")}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                className={inputClass("email")}
                disabled={status === "loading"}
              />
              {fieldError("email")}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-white"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Collaboration on ML project"
                className={inputClass("subject")}
                disabled={status === "loading"}
              />
              {fieldError("subject")}
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Share your thoughts..."
                className={`${inputClass("message")} resize-none`}
                disabled={status === "loading"}
              />
              {fieldError("message")}
            </div>

            {fieldErrors._form && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {fieldErrors._form}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#915EFF] to-[#00FFFF] py-3.5 text-base font-semibold text-white shadow-lg shadow-[#915EFF]/25 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Spinner />
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-white/35">
            Messages are delivered to {SITE.email}
          </p>
        </div>
      </motion.div>
    </>
  );
}
