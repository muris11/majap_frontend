export interface FormField {
  name: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'date' | 'image' | 'richtext' | 'number' | 'password';
  label: string;
  placeholder?: string;
  hint?: string;
  rows?: number;
  options?: SelectOption[];
  default?: string | number | boolean;
  accept?: string;
  maxSize?: number;
  validation?: FieldValidation;
  visible_if?: VisibilityCondition;
}

export interface SelectOption {
  value: string | number;
  label: string;
  color?: string;
}

export interface FieldValidation {
  required?: boolean;
  email?: boolean;
  max?: number;
  min?: number;
  pattern?: string;
}

export interface VisibilityCondition {
  field: string;
  value: unknown;
  operator?: 'eq' | 'neq' | 'gt' | 'lt';
}

export interface FormAction {
  type: 'submit' | 'cancel' | 'reset';
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
}

export interface FormSchema {
  name: string;
  title: string;
  description?: string;
  fields: FormField[];
  actions: FormAction[];
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  type?: 'text' | 'badge' | 'image' | 'date' | 'actions';
  color_map?: Record<string, string>;
}

export interface TableFilter {
  key: string;
  label: string;
  type: 'select' | 'checkbox' | 'date_range' | 'text';
  options?: SelectOption[];
  endpoint?: string;
}

export interface TableSchema {
  name: string;
  title: string;
  columns: TableColumn[];
  filters: TableFilter[];
  actions: string[];
  pagination: {
    per_page_options: number[];
    default_per_page: number;
  };
}

export interface EnumSchema {
  name: string;
  options: SelectOption[];
}

export interface NavigationItem {
  key: string;
  label: string;
  href: string;
  icon: string;
}

export interface NavigationSchema {
  items: NavigationItem[];
  user_items?: NavigationItem[];
}

export interface PermissionsSchema {
  permissions: string[];
  roles: string[];
}
