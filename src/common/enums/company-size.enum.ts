export const CompanySize = {
  TPE: 'TPE',
  PME: 'PME',
  ETI: 'ETI',
  GE: 'GE',
} as const;

export type CompanySize = (typeof CompanySize)[keyof typeof CompanySize];