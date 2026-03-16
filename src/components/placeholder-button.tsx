import type { ReactNode } from 'react';

export function PlaceholderButton({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <button className={className} type="button">
      {children}
    </button>
  );
}
