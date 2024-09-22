'use client'

import React from 'react';
import TVLComponent from './components/components/TVLComponent';
import EarnComponent from './components/components/EarnComponent';
import TotalAssetsTrend from './components/components/TotalAssetsTrend';
import EarningData from './components/components/EarningData';
import Container from '@/app/components/Container';




export default function Page() {
  return (
    <Container>
      <div className='w-full h-full overflow-auto'>
        <div className='flex justify-between'>
          <TVLComponent />
          <EarnComponent />
        </div>
        <TotalAssetsTrend />
        <EarningData />
      </div>

    </Container>
  );
}
