'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import type { FC, ReactElement, ReactNode } from 'react';
import { SWRConfig } from 'swr';

type ProvidersProps = {
  children: ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }): ReactElement => (
  <ThemeProvider attribute="class">
    <NextUIProvider>
      <SWRConfig
        value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}
      >
        {children}
      </SWRConfig>
    </NextUIProvider>
  </ThemeProvider>
);

export default Providers;
