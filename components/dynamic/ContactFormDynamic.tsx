"use client";

import { useEffect, useState } from "react";
import { DynamicForm } from "./DynamicForm";
import { useFormSchema } from "@/lib/hooks/useSchema";
import { api } from "@/lib/api";

export function ContactFormDynamic() {
  const { data: schema, isLoading, error: schemaError } = useFormSchema("contact");
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), 5000);
    return () => clearTimeout(timer);
  }, [success]);

  const handleSubmit = async (values: Record<string, string | number | boolean>) => {
    setSubmitError("");
    try {
      await api.submitContact({
        name: String(values.name),
        email: String(values.email),
        subject: String(values.subject),
        message: String(values.message),
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-32 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  if (schemaError || !schema) {
    return (
      <div className="bg-red-50 text-red-700 p-5 rounded-xl border border-red-200">
        Gagal memuat form. Silakan refresh halaman.
      </div>
    );
  }

  return (
    <div>
      {success && (
        <div className="bg-green-50 text-green-700 p-5 rounded-xl mb-8 border border-green-200">
          Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 text-red-700 p-5 rounded-xl mb-8 border border-red-200">
          {submitError}
        </div>
      )}

      <DynamicForm
        schema={schema}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
