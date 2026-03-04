export const OfferStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  CLOSED: 'CLOSED',
} as const;

export type OfferStatus = (typeof OfferStatus)[keyof typeof OfferStatus];