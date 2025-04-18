import { BaseFilter, type FilterProps } from './base';
import { Sample, SampleStatus } from '@/types';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { SAMPLE_STATUS } from '@/constants/sample';
interface SampleStatusFilterProps {
  slug?: string;
}

const statuses: FilterProps['options'] = Object.entries(SAMPLE_STATUS).map(([key, value]) => ({
  label: value,
  value: key as SampleStatus,
}));

export function SampleStatusFilter({
  slug = DEFAULT_FILTERS_KEYS.SAMPLE_STATUS,
}: SampleStatusFilterProps) {
  return (
    <BaseFilter label="Sample Status" slug={slug} options={statuses} multiple hasSearch={true} />
  );
}
