import { SAR } from "./sar.interface";

export interface SARListProps {
  sars: SAR[];
  onEdit: (sar: SAR) => void;
  onDelete: (id: number) => void;
  onView: (sar: SAR) => void;
  onSearch: (query: string) => void;
  onSort: (field: string, order: 'asc' | 'desc') => void;
}
