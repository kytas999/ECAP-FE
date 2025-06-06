'use client';
import { SortableIcon } from '@/components/table/sortable-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { hasPermission } from '@/lib/permissions';
import { useAuth } from '@/providers/auth';
import type { StudentLPEnrollment, TrackLearningPeriod, User } from '@/types';
import { getCompletionStatus, getProgressValue, getUserName } from '@/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { CompletionStatusForTable } from '../statuses';

interface StudentsTableProps {
  assignments?: StudentLPEnrollment[];
  currentLearningPeriod: TrackLearningPeriod;
}

export const StudentsTable = ({ assignments = [], currentLearningPeriod }: StudentsTableProps) => {
  const pathname = usePathname();
  const teacher_id = useSearchParams().get(DEFAULT_FILTERS_KEYS.TEACHER_ID);
  const { user } = useAuth();

  const getPath = (user: User) =>
    `${pathname}/samples?${DEFAULT_FILTERS_KEYS.STUDENT_ID}=${user.id}&${
      DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID
    }=${currentLearningPeriod.id}&${
      teacher_id ? `${DEFAULT_FILTERS_KEYS.TEACHER_ID}=${teacher_id}` : ''
    }&name=${getUserName(user)}`;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="2xl:max-w-44 max-w-32">
            Student Name
            <SortableIcon<StudentLPEnrollment> name="student.user.name" />
          </TableHead>
          <TableHead className="max-w-[12.5%]">
            Student ID
            <SortableIcon<StudentLPEnrollment> name="student_id" />
          </TableHead>
          <TableHead className="max-w-[12.5%]">
            School
            <SortableIcon<StudentLPEnrollment> name="student.school.name" />
          </TableHead>
          <TableHead className="max-w-[12.5%]">
            Academy
            {hasPermission(user, 'sorting', 'sort:academy') && (
              <SortableIcon<StudentLPEnrollment> name="student.academy.name" />
            )}
          </TableHead>
          <TableHead className="max-w-[12.5%]">
            Track
            <SortableIcon<StudentLPEnrollment> name="track.name" />
          </TableHead>
          <TableHead className="max-w-[12.5%]">
            Grade
            <SortableIcon<StudentLPEnrollment> name="student_grade" />
          </TableHead>
          <TableHead className="2xl:max-w-[12.5rem] max-w-[9.375rem]">
            Completion Status
            <SortableIcon<StudentLPEnrollment> name="completed" />
          </TableHead>
          <TableHead className="max-w-[12.5%]">
            Progress (%)
            <SortableIcon<StudentLPEnrollment> name="percentage" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow key={`${assignment.student.id}-${currentLearningPeriod.id}`}>
            <Link className="contents" href={getPath(assignment.student.user)}>
              <TableCell className="2xl:max-w-44 max-w-32 truncate">
                {getUserName(assignment.student.user)}
              </TableCell>
              <TableCell>{assignment.student.id}</TableCell>
              <TableCell>{assignment.student.school?.name}</TableCell>
              <TableCell>{assignment.student.academy?.name}</TableCell>
              <TableCell>{assignment.track?.name}</TableCell>
              <TableCell>{assignment.student_grade}</TableCell>
              <TableCell>
                <CompletionStatusForTable
                  variant={getCompletionStatus(assignment, currentLearningPeriod)}
                />
              </TableCell>
              <TableCell className="text-center">{assignment.percentage}%</TableCell>
            </Link>
          </TableRow>
        ))}
        {assignments.length === 0 && (
          <TableRow className="h-80">
            <TableCell colSpan={8} className="text-center">
              No students found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
