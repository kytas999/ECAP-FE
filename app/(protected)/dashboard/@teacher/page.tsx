import React from 'react';
import { ProgressCard } from '../components/progress-card';
import { StatisticsList } from '../components/statistics-list';
import { TrackRow } from '../components/track-row';
import { LearningPeriodCard } from '../components/learning-period-card';

export default function TeacherDashboard() {
  const statistics = [
    { label: 'Homeschool', percentage: 80 },
    { label: 'Virtual', percentage: 50 },
    { label: 'Flex', percentage: 60 },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
      <ProgressCard title="Current LP Compliance" percentage={80} />
      <ProgressCard title="Year-to-Date Compliance" percentage={20} />

      <StatisticsList items={statistics} />

      <div className="col-span-1 md:col-span-2">
        <TrackRow
          track="Track A: LP1"
          dateRange="July 1 - Aug 3"
          status="Complete"
          statusColor="text-green-500"
        />
        <TrackRow
          track="Track A: LP3, Track B: LP1"
          dateRange="Aug 28 - Oct 4"
          status="Incomplete"
          statusColor="text-red-500"
        />
        <TrackRow
          track="Track A: LP4, Track B: LP2"
          dateRange="Oct 7 - Nov 22"
          status="In Progress"
          statusColor="text-blue-500"
        />
        <TrackRow
          track="Track A: LP5, Track B: LP3"
          dateRange="Dec 2 - Jan 17"
          status="Upcoming"
          statusColor="text-gray-500"
        />
      </div>

      <LearningPeriodCard
        track="Track A: LP4, Track B: LP2"
        date="Oct 7 - Nov 22"
        deadline="Nov 29"
        status="In Progress"
        compliance={80}
      />
      <LearningPeriodCard
        track="Track A: LP5, Track B: LP3"
        date="Dec 2 - Jan 17"
        deadline="Jan 24"
        status="Upcoming"
        compliance={0}
      />
    </div>
  );
}
