export const Role = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  COMPANY: 'COMPANY',
} as const;

export type Role = (typeof Role)[keyof typeof Role];