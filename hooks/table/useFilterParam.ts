import { PAGE_KEY } from '@/components/table/pagination-section';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useFilterParam(slug: string, multiple = true, combined = false) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = searchParams.get(slug) || '';
  const selectedValues = raw ? (multiple ? raw.split(',') : [raw]) : [];

  const handleSelect = (value: string) => {
    let newValues: string[];

    if (multiple) {
      if (combined) {
        newValues = selectedValues.some((v) => value.split(',').some((val) => val === v))
          ? selectedValues.filter((v) => !value.split(',').some((val) => val === v))
          : [...selectedValues, value];
      } else {
        newValues = selectedValues.some((v) => v == value)
          ? selectedValues.filter((v) => v != value)
          : [...selectedValues, value];
      }
    } else {
      newValues = selectedValues.some((v) => v == value) ? [] : [value];
    }

    const params = new URLSearchParams(searchParams.toString());

    if (newValues.length) {
      params.set(slug, newValues.join(','));
      params.set(PAGE_KEY, '1');
    } else {
      params.delete(slug);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const reset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(slug);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    selectedValues,
    handleSelect,
    reset,
  };
}
