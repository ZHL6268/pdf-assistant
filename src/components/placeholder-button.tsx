import type { ReactNode } from 'react';

export function PlaceholderButton({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return <span className={className}>{children}</span>;
}
