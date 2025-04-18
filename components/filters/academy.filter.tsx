import { Academy } from '@/types';
import { BaseFilter } from './base';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';

interface AcademyFilterProps {
  availableAcademies: Academy[];
  slug?: string;
}

export function AcademyFilter({
  availableAcademies = [],
  slug = DEFAULT_FILTERS_KEYS.ACADEMY_ID,
}: AcademyFilterProps) {
  return (
    <BaseFilter
      label="Academy"
      slug={slug}
      options={availableAcademies.map((academy) => ({
        label: academy.name,
        value: academy.id.toString(),
      }))}
      multiple
    />
  );
}
