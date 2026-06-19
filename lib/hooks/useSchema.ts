"use client";

import { useEffect, useState } from "react";
import { EnumSchema, FormSchema, NavigationSchema, TableSchema } from "@/types/schema";
import { getCachedSchema, schemaApi } from "../schema";

interface UseSchemaState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useFormSchema(name: string) {
  const [state, setState] = useState<UseSchemaState<FormSchema>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getCachedSchema(`form:${name}`, () => schemaApi.getFormSchema(name))
      .then((data) => {
        if (!cancelled) {
          setState({ data, isLoading: false, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ data: null, isLoading: false, error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [name]);

  return state;
}

export function useTableSchema(name: string) {
  const [state, setState] = useState<UseSchemaState<TableSchema>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getCachedSchema(`table:${name}`, () => schemaApi.getTableSchema(name))
      .then((data) => {
        if (!cancelled) {
          setState({ data, isLoading: false, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ data: null, isLoading: false, error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [name]);

  return state;
}

export function useEnumSchema(name: string) {
  const [state, setState] = useState<UseSchemaState<EnumSchema>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getCachedSchema(`enum:${name}`, () => schemaApi.getEnumSchema(name))
      .then((data) => {
        if (!cancelled) {
          setState({ data, isLoading: false, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ data: null, isLoading: false, error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [name]);

  return state;
}

export function useNavigation() {
  const [state, setState] = useState<UseSchemaState<NavigationSchema>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getCachedSchema('navigation', () => schemaApi.getNavigation())
      .then((data) => {
        if (!cancelled) {
          setState({ data, isLoading: false, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ data: null, isLoading: false, error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function usePermission(permission: string) {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // This would typically check against user permissions from auth context
    // For now, return false as placeholder
    let cancelled = false;
    
    const checkPermission = async () => {
      // Simulate async permission check
      await new Promise(resolve => setTimeout(resolve, 0));
      if (!cancelled) {
        setHasPermission(false);
      }
    };
    
    checkPermission();
    
    return () => {
      cancelled = true;
    };
  }, [permission]);

  return hasPermission;
}
