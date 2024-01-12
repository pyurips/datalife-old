import { CircularProgress } from '@nextui-org/react';
import { ReactNode } from 'react';

export default function Need({
  icon,
  value,
  color,
}: {
  icon: ReactNode;
  value: number;
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined;
}) {
  return (
    <div className="relative w-fit">
      <CircularProgress
        aria-label="Loading..."
        size="lg"
        value={value}
        color={color}
        showValueLabel={false}
      />

      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full rounded-[100%]">
        <div className="flex items-center justify-center w-[30px] h-[30px] rounded-[100%]">
          {icon}
        </div>
      </div>
    </div>
  );
}
