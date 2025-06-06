import {
  AcademicYearFilter,
  CompletionFilter,
  GradeSpanFilter,
  LearningPeriodFilter,
  SampleStatusFilter,
  SchoolFilter,
  SearchTeacherFilter,
  SemesterFilter,
  SubjectFilter,
  TrackFilter,
} from '@/components/filters';
import { SPECIFIC_PAGE_FILTER_KEYS } from '@/constants/filter';
import type { Tenant } from '@/types';
import { getLearningPeriodFromTenant } from '@/utils';
import { FilterWrapper } from './filter-wrapper';

interface DirectorFiltersProps {
  tenant: Tenant;
  academicYearIds: string[];
  tracksIds: string[];
  currentLearningPeriodId: string;
}

export function DirectorFilters({
  tenant,
  academicYearIds,
  tracksIds,
  currentLearningPeriodId,
}: DirectorFiltersProps) {
  const tracks = tenant.tracks.filter((track) =>
    academicYearIds.includes(track.academic_year_id.toString())
  );

  return (
    <FilterWrapper className="2xl:[&_button:has(input)]:col-span-3 2xl:grid-flow-row grid-cols-6 md:[&>button]:basis-1/3">
      <AcademicYearFilter
        availableAcademicYears={tenant.tracks.map((track) => track.academicYear)}
        defaultValue={academicYearIds[0]}
      />
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant, academicYearIds, tracksIds)}
      />
      <SearchTeacherFilter currentLearningPeriodId={currentLearningPeriodId} />

      <CompletionFilter />

      <SchoolFilter
        availableSchools={tenant.schools}
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.SCHOOL_ID}
      />
      <TrackFilter slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.TRACK_ID} availableTracks={tracks} />
      <SemesterFilter
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.ADMIN.SEMESTER_ID}
        availableSemesters={tracks.flatMap((track) => track.semesters)}
      />
      <GradeSpanFilter />
      <SubjectFilter
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.ADMIN.SUBJECT_ID}
        availableSubjects={tracks
          .filter((track) => (tracksIds?.length ? tracksIds.includes(track.id.toString()) : true))
          .flatMap((track) => track.subjects)}
      />
      <SampleStatusFilter slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.SAMPLE_STATUS} />
    </FilterWrapper>
  );
}
