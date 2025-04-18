'use client';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { routes } from '@/constants/routes';
import { AssignmentPeriod, TrackLearningPeriod, Sample, Student } from '@/types';
import { getCompletionStatus, getProgressValue, getUserName } from '@/utils';
import { useRouter } from 'next/navigation';
import { CompletionStatusForTable, SapmleStatus } from './statuses';

interface TableProps {
  assignments?: AssignmentPeriod[];
  currentLearningPeriod: TrackLearningPeriod;
}

export const SamplesTable = ({ assignments = [] }: TableProps) => {
  const tableRows = Object.entries(
    assignments
      ?.flatMap(({ samples }) => samples)
      .reduce(
        (acc, sample) => {
          if (acc[sample.subject_id]) {
            acc[sample.subject_id].push(sample);
          } else {
            acc[sample.subject_id] = [sample];
          }
          return acc;
        },
        {} as Record<number, Sample[]>
      )
  ).map(([_, samples]) => ({
    sample_1: samples[0],
    sample_2: samples[1],
    subject: samples[0].subject,
  }));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subject</TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>Sample Status</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Done By</TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>Sample Status</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Done By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableRows.map((row) => (
          <TableRow key={`${row.sample_1.id}`}>
            <TableCell>{row.subject.name}</TableCell>
            <TableCell>{row.sample_1.assignment_title}</TableCell>
            <TableCell>
              <SapmleStatus status={row.sample_1.status || null} />
            </TableCell>
            <TableCell>Action</TableCell>
            <TableCell>{row.sample_1.done_by_teacher?.user?.email}</TableCell>
            <TableCell>{row.sample_2?.assignment_title}</TableCell>
            <TableCell>
              <SapmleStatus status={row.sample_2?.status || null} />
            </TableCell>
            <TableCell>Action</TableCell>
            <TableCell>{row.sample_2?.done_by_teacher?.user?.email}</TableCell>
          </TableRow>
        ))}
        {tableRows.length === 0 && (
          <TableRow>
            <TableCell colSpan={9} className="text-center">
              No samples found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export const StudentsTable = ({ assignments = [], currentLearningPeriod }: TableProps) => {
  const router = useRouter();

  const handleClick = (student: Student) => {
    return () => {
      router.push(
        `${routes.compliance.samples}?student_id=${
          student.user.id
        }&learning_period_id=${currentLearningPeriod.id}&name=${getUserName(student.user)}`
      );
    };
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[200px]">Student Name</TableHead>
          <TableHead>Student ID</TableHead>
          <TableHead>School</TableHead>
          <TableHead>Academy</TableHead>
          <TableHead>Track</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Completion Status</TableHead>
          <TableHead>Progress (%)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow
            key={`${assignment.student.id}-${currentLearningPeriod.id}`}
            onClick={handleClick(assignment.student)}
          >
            <TableCell>{getUserName(assignment.student.user)}</TableCell>
            <TableCell>{assignment.student.id}</TableCell>
            <TableCell>{assignment.student.school?.name}</TableCell>
            <TableCell>{assignment.student.academy?.name}</TableCell>
            <TableCell>{assignment.student.track?.name}</TableCell>
            <TableCell>{assignment.student.grade}</TableCell>
            <TableCell>
              <CompletionStatusForTable
                variant={getCompletionStatus(assignment, currentLearningPeriod)}
              />
            </TableCell>
            <TableCell>{getProgressValue(assignment)}%</TableCell>
          </TableRow>
        ))}
        {assignments.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No students found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
