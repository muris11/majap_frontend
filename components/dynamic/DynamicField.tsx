"use client";

import { FormField } from "@/types/schema";
import { ChangeEvent } from "react";

interface DynamicFieldProps {
  field: FormField;
  value: string | number | boolean;
  onChange: (name: string, value: string | number | boolean) => void;
  error?: string;
  disabled?: boolean;
}

export function DynamicField({
  field,
  value,
  onChange,
  error,
  disabled = false,
}: DynamicFieldProps) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    let newValue: string | number | boolean = target.value;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      newValue = target.checked;
    } else if (field.type === "number") {
      newValue = parseFloat(target.value) || 0;
    }

    onChange(field.name, newValue);
  };

  const baseInputClass = `
    w-full px-4 py-2 rounded-lg border transition-colors
    focus:outline-none focus:ring-2 focus:ring-blue-500/50
    ${error 
      ? "border-red-500 bg-red-50" 
      : "border-gray-300 bg-white hover:border-gray-400"
    }
    ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}
  `;

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
        return (
          <input
            type={field.type}
            name={field.name}
            value={String(value || "")}
            onChange={handleChange}
            placeholder={field.placeholder}
            disabled={disabled}
            className={baseInputClass}
          />
        );

      case "textarea":
        return (
          <textarea
            name={field.name}
            value={String(value || "")}
            onChange={handleChange}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            disabled={disabled}
            className={baseInputClass}
          />
        );

      case "select":
        return (
          <select
            name={field.name}
            value={String(value || "")}
            onChange={handleChange}
            disabled={disabled}
            className={baseInputClass}
          >
            <option value="">-- Pilih --</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name={field.name}
              checked={Boolean(value)}
              onChange={handleChange}
              disabled={disabled}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{field.label}</span>
          </label>
        );

      case "date":
        return (
          <input
            type="date"
            name={field.name}
            value={String(value || "")}
            onChange={handleChange}
            disabled={disabled}
            className={baseInputClass}
          />
        );

      default:
        return (
          <input
            type="text"
            name={field.name}
            value={String(value || "")}
            onChange={handleChange}
            placeholder={field.placeholder}
            disabled={disabled}
            className={baseInputClass}
          />
        );
    }
  };

  if (field.type === "checkbox") {
    return (
      <div className="mb-4">
        {renderField()}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {field.label}
        {field.validation?.required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>
      {renderField()}
      {field.hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{field.hint}</p>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
