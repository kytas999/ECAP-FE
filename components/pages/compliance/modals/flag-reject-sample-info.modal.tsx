'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { useAuth } from '@/providers/auth';
import type { Sample } from '@/types';
import { isAdminOrDirector } from '@/utils';
import { CircleAlertIcon } from 'lucide-react';
import { ReasonForMissingSample, SampleInfoForModal } from './shared';

export function FlagRejectSampleInfoModal({
  children,
  sample,
}: React.PropsWithChildren<{ sample: Sample }>) {
  const { user } = useAuth();
  const isDirector = isAdminOrDirector(user);
  const title = (
    <>
      <Badge variant="red" className="mb-4">
        <CircleAlertIcon className="size-4" />
        Rejected: {new Date(sample.flag_rejected?.createdAt || '').toLocaleDateString()}
      </Badge>
      <p>Missing Work Sample</p>
    </>
  );

  const reason = isDirector ? (
    <>
      <ReasonForMissingSample sample={sample} isDirector={isDirector} />
      <br />
      <b className="text-primary pt-4">Reason for rejecting missing sample:</b>{' '}
      {sample.flag_rejected?.reason}
    </>
  ) : (
    <>
      <p>
        <ReasonForMissingSample sample={sample} isDirector={isDirector} />
      </p>
      <p>
        <b>Reason for rejecting missing sample:</b> "{sample.flag_rejected?.reason}"
      </p>
    </>
  );

  const description = isDirector ? (
    <>
      <b>Date Flagged:</b> {new Date(sample.flag_rejected?.createdAt || '').toLocaleDateString()}
    </>
  ) : (
    ''
  );

  return (
    <ResponsiveDialog
      className="md:w-1/2"
      trigger={children}
      title={title}
      description={description}
      hasCloseButton
    >
      <form className="flex flex-col size-full">
        <section className="flex justify-between flex-wrap md:flex-nowrap gap-y-1 md:pt-6 gap-x-4">
          <SampleInfoForModal sample={sample} type="view_rejected" />
        </section>
        <p className="py-6">{reason}</p>
        <DialogClose asChild>
          <Button className="w-fit self-end" size="lg">
            Close
          </Button>
        </DialogClose>
      </form>
    </ResponsiveDialog>
  );
}
