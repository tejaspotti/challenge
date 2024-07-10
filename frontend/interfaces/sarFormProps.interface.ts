import { SARFormData } from './sar.interface';

export interface SARFormProps {
    onSubmit: (sar: SARFormData) => void;
    initialData?: SARFormData | null;
    onCancel: () => void;
  }