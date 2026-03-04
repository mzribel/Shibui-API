export const StudyLevel = {
  BAC_PLUS_2: 'BAC_PLUS_2',
  BAC_PLUS_3: 'BAC_PLUS_3',
  BAC_PLUS_4: 'BAC_PLUS_4',
  BAC_PLUS_5: 'BAC_PLUS_5',
  BAC_PLUS_6: 'BAC_PLUS_6',
  DOCTORATE: 'DOCTORATE',
} as const;

export type StudyLevel = (typeof StudyLevel)[keyof typeof StudyLevel];