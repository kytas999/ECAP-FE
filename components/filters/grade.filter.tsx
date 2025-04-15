import { BaseFilter } from './base';

interface GradeFilterProps {
  slug?: string;
}

const GRADES = Array.from({ length: 12 }, (_, index) => ({
  label: `Grade ${index + 1}`,
  value: `Grade ${index + 1}`,
}));

export function GradeFilter({ slug = 'student.grade' }: GradeFilterProps) {
  return <BaseFilter label="Grade" slug={slug} options={GRADES} multiple hasSearch={true} />;
}
