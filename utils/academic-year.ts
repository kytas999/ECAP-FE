import { Tenant, AcademicYear } from '@/types/school';

const getDefaultAcademicYearIds = (tenant: Tenant, academicYearIds?: string) => {
  if (academicYearIds) {
    return academicYearIds.split(',').filter(Boolean);
  }
  const day = new Date();
  let currentAcademicYear: AcademicYear | undefined;

  for (const track of tenant.tracks) {
    if (track.semesters && track.academicYear) {
      const hasActiveSemester = track.semesters.some(
        (semester) => new Date(semester.start_date) <= day && new Date(semester.end_date) >= day
      );
      if (hasActiveSemester) {
        currentAcademicYear = track.academicYear;
        break;
      }
    }
  }

  if (!currentAcademicYear) {
    if (tenant.tracks && tenant.tracks.length > 0 && tenant.tracks[0].academicYear) {
      currentAcademicYear = tenant.tracks[0].academicYear;
    } else {
      return [];
    }
  }

  return [currentAcademicYear.id.toString()];
};

export { getDefaultAcademicYearIds };
