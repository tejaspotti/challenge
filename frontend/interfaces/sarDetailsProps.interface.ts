import { SAR } from "./sar.interface";

export interface SARDetailsProps {
    sar: SAR | null;
    onClose: () => void;
  }