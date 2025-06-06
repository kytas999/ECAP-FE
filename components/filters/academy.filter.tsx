import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import type { Academy } from '@/types';
import { BaseFilter } from './base';
import { getUser } from '@/lib/get-user';
import { hasPermission } from '@/lib/permissions';

interface AcademyFilterProps {
  availableAcademies: Academy[];
  slug?: string;
}

export async function AcademyFilter({
  availableAcademies = [],
  slug = DEFAULT_FILTERS_KEYS.ACADEMY_ID,
}: AcademyFilterProps) {
  const user = await getUser();
  const isSortingAllowed = hasPermission(user!, 'sorting', 'sort:academy');
  if (!isSortingAllowed) {
    return null;
  }

  return (
    <BaseFilter
      label="Academy"
      defaultPlaceholder="All Academies"
      slug={slug}
      options={availableAcademies.map((academy) => ({
        label: academy.name,
        value: academy.id.toString(),
      }))}
      multiple
    />
  );
}
