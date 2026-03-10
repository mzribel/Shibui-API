export const ContractType = {
  INTERNSHIP: 'INTERNSHIP',
  APPRENTICESHIP: 'APPRENTICESHIP',
} as const;

export type ContractType = (typeof ContractType)[keyof typeof ContractType];