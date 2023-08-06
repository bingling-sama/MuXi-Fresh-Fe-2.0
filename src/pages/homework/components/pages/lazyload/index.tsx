import React, { lazy, Suspense, ComponentType } from 'react';

export interface LazyLoadProps {
  path: string;
  component?: boolean;
}

const LazyLoad: React.FC<LazyLoadProps> = ({
  path,
  component,
}: LazyLoadProps): React.ReactNode => {
  let Comp: ComponentType<any>;
  if (component) {
    Comp = lazy(async () => await import(`../${path}/index.tsx`));
  } else {
    Comp = lazy(async () => await import(`../../../pages/${path}/index.tsx`));
  }

  return (
    <Suspense fallback={<></>}>
      <Comp />
    </Suspense>
  );
};

export default LazyLoad;
