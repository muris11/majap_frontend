"use client";

import { FormSchema } from "@/types/schema";
import { useState, FormEvent } from "react";
import { DynamicField } from "./DynamicField";

interface DynamicFormProps {
  schema: FormSchema;
  initialValues?: Record<string, string | number | boolean>;
  onSubmit: (values: Record<string, string | number | boolean>) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

export function DynamicForm({
  schema,
  initialValues = {},
  onSubmit,
  onCancel,
  isLoading = false,
}: DynamicFormProps) {
  const [values, setValues] = useState<Record<string, string | number | boolean>>(() => {
    const defaults: Record<string, string | number | boolean> = {};
    schema.fields.forEach((field) => {
      defaults[field.name] = initialValues[field.name] ?? field.default ?? "";
    });
    return defaults;
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    schema.fields.forEach((field) => {
      const value = values[field.name];
      const validation = field.validation;

      if (!validation) return;

      if (validation.required && !value && value !== 0 && value !== false) {
        newErrors[field.name] = `${field.label} wajib diisi`;
        return;
      }

      if (validation.email && value && typeof value === "string") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Format email tidak valid";
          return;
        }
      }

      if (validation.max && typeof value === "string" && value.length > validation.max) {
        newErrors[field.name] = `${field.label} maksimal ${validation.max} karakter`;
        return;
      }

      if (validation.min && typeof value === "string" && value.length < validation.min) {
        newErrors[field.name] = `${field.label} minimal ${validation.min} karakter`;
        return;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      // Handle API validation errors
      if (error instanceof Error && 'errors' in (error as unknown as { errors: ValidationErrors })) {
        setErrors((error as unknown as { errors: ValidationErrors }).errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFieldVisible = (field: typeof schema.fields[0]): boolean => {
    if (!field.visible_if) return true;

    const { field: conditionField, value: conditionValue, operator = 'eq' } = field.visible_if;
    const currentValue = values[conditionField];

    switch (operator) {
      case 'eq':
        return currentValue === conditionValue;
      case 'neq':
        return currentValue !== conditionValue;
      case 'gt':
        return Number(currentValue) > Number(conditionValue);
      case 'lt':
        return Number(currentValue) < Number(conditionValue);
      default:
        return true;
    }
  };

  const renderAction = (action: typeof schema.actions[0]) => {
    const baseClass = "px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2";
    
    const variantClass = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500/50",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50",
    };

    if (action.type === "submit") {
      return (
        <button
          key={action.type}
          type="submit"
          disabled={isSubmitting || isLoading}
          className={`${baseClass} ${variantClass[action.variant]} ${
            (isSubmitting || isLoading) ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Mengirim..." : action.label}
        </button>
      );
    }

    if (action.type === "cancel" && onCancel) {
      return (
        <button
          key={action.type}
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className={`${baseClass} ${variantClass[action.variant]}`}
        >
          {action.label}
        </button>
      );
    }

    if (action.type === "reset") {
      return (
        <button
          key={action.type}
          type="reset"
          disabled={isSubmitting}
          className={`${baseClass} ${variantClass[action.variant]}`}
        >
          {action.label}
        </button>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {schema.description && (
        <p className="text-gray-600 mb-6">{schema.description}</p>
      )}

      {schema.fields.map((field) => {
        if (!isFieldVisible(field)) return null;

        return (
          <DynamicField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
            disabled={isSubmitting || isLoading}
          />
        );
      })}

      <div className="flex gap-3 pt-4">
        {schema.actions.map(renderAction)}
      </div>
    </form>
  );
}
