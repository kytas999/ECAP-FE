import { getComplianceAdminFilter } from '@/lib/api/compliance';

import { rolePage } from '@/components/layouts/role-page';
import { AdminFilters } from '@/components/pages/compliance/filters';
import { TeacherSection } from '@/components/pages/compliance/sections';
import type { TeachersSectionProps } from '@/components/pages/compliance/sections/teachers-section';
import { DEFAULT_FILTERS_KEYS, SPECIFIC_PAGE_FILTER_KEYS } from '@/constants/filter';
import { getDefaultAcademicYearIds } from '@/utils/academic-year';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Compliance',
};

export async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<TeachersSectionProps['param']>;
}) {
  const awaitedParams = (await searchParams) as any;
  const tenant = await getComplianceAdminFilter();
  const academicYearIds = getDefaultAcademicYearIds(
    tenant,
    awaitedParams[DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]
  );
  const tracksIds = awaitedParams[SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.TRACK_ID]?.split(',');
  const currentLearningPeriodId = awaitedParams[DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID];

  return (
    <>
      <AdminFilters
        tenant={tenant}
        academicYearIds={academicYearIds}
        tracksIds={tracksIds}
        currentLearningPeriodId={currentLearningPeriodId}
      />
      <TeacherSection param={awaitedParams} tenant={tenant!} academicYearIds={academicYearIds} />
    </>
  );
}

export default rolePage(CompliancePage, ['ADMIN', 'SUPER_ADMIN']);
