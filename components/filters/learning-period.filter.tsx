'use client';
import { BaseFilter } from './base';
import { TrackLearningPeriod } from '@/types';
import { formatLearningPeriodDate, mergeLearningPeriods } from '@/utils';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';

interface LearningPeriodFilterProps {
  availablePeriods: TrackLearningPeriod[];
  slug?: string;
}

export const LearningPeriodFilter = ({
  availablePeriods = [],
  slug = DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID,
}: LearningPeriodFilterProps) => {
  const mergedPeriods = mergeLearningPeriods(availablePeriods);

  return (
    <BaseFilter
      label="Learning Period"
      slug={slug}
      options={mergedPeriods.map((period) => ({
        label: period.name,
        value: period.id.toString(),
        start_date: period.start_date,
        end_date: period.end_date,
      }))}
      hasSearch={true}
      render={(option: any) => {
        return (
          <div>
            <b className="block truncate max-w-60" title={option.label}>
              {option.label}
            </b>
            <p>
              {formatLearningPeriodDate(option.start_date)} -{' '}
              {formatLearningPeriodDate(option.end_date)}
            </p>
          </div>
        );
      }}
    />
  );
};
