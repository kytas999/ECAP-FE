import { Loader2 } from 'lucide-react';

export const PageLoading = () => {
  return (
    <section className="flex flex-col items-center justify-center h-[90vh]">
      <Loader2 className="animate-spin" />
    </section>
  );
};
