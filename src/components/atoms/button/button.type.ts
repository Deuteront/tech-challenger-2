export type props = {
  onClick: () => void;
  className: string[];
  icon?: string;
  text?: string;
} & ({ icon: string; text?: string } | { icon?: never; text: string });
