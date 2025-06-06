import { routes } from '@/constants/routes';
import { Circle } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

interface StepperProps {
  steps: string[];
  activeStep: number;
  onClick?: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="grid grid-flow-col flex-wrap grid-rows-3 sm:grid-rows-2 gap-y-14 lg:grid-rows-none">
      {steps.map((step, index) => (
        <div key={step} className="flex-1 relative">
          <hr
            data-first={index === 0}
            className="absolute top-4 left-0 right-0 -translate-y-1/2 border-t border-primary data-[first=true]:left-1/2"
          />
          <Link href={`${routes.settings.setup}?step=${index}`} className="contents">
            <Circle
              className="relative size-8 text-primary stroke-[0.5px] mx-auto fill-white data-[active=true]:fill-primary cursor-pointer"
              data-active={index === activeStep}
            />
          </Link>

          <p className="text-lg text-neutral-black font-medium mt-6 text-center">{step}</p>
        </div>
      ))}
    </div>
  );
};

export { Stepper };
