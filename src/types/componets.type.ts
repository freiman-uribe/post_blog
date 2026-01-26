//button type props
export interface buttonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  className?: string;
}

//input type props
export interface inputProps {
  modelValue: string;
  placeholder?: string;
  type?: string;
  inputClass?: string;
}

//alert type props
export interface alertProps {
  type?: "Success" | "Error" | "Warning";
  message: string;
}

//search type props
export interface searchProps {
  modelValue: string;
  resultsCount?: number | null;
}

//pagination type props
export interface paginationProps {
    currentPage: number;
    totalPages: number;
    maxVisiblePages?: number;
}

//loader type props
export interface loaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}