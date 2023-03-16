/**
 *
 * PerformanceScheduler constants
 *
 */

export const PerformanceSchedulerConstants = {
  GIFT_AMOUNT_OPTIONS: [
    { value: '5', label: '$5' },
    { value: '10', label: '$10' },
    { value: '15', label: '$15' },
  ],
  STAGE_JOIN_PRICE: [
    { value: '5', label: '$5' },
    { value: '10', label: '$10' },
    { value: '15', label: '$15' },
  ],
  STAGE_JOIN_OPTIONS: [
    { value: 'free', label: 'Free' },
    { value: 'priceOf', label: 'Price Of' },
  ],
  PERFORMANCE_TYPE: {
    SKILL: 'skill',
    SALE: 'sale',
    SKILL_SALE: 'skill-sale',
  },
  PERFORMANCE_STATE: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    PAST: 'past',
    LIVE: 'live',
  },
  PERFORMANCE_DB_COLUMN: [
    'name',
    'details',
    'price',
    'type',
    'stageEnabled',
    'stagePrice',
    'stageLimit',
    'maxAudienceSize',
    'themeName',
    'categories',
    'coverUrl',
    'giftEnabled',
    'giftPrice',
    'state',
    'start',
    'end',
    'participationPrice',
  ],
};
