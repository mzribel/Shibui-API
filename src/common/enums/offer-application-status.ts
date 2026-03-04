export const OfferApplicationStatus = {
  SUBMITTED: 'SUBMITTED',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED',
  CANCELLED: 'CANCELLED',
} as const;

export type OfferApplicationStatus = (typeof OfferApplicationStatus)[keyof typeof OfferApplicationStatus];