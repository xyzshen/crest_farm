'use client'

import React, { useEffect } from 'react';
import TVLComponent from './components/components/TVLComponent';
import EarnComponent from './components/components/EarnComponent';
import TotalAssetsTrend from './components/components/TotalAssetsTrend';
import EarningData from './components/components/EarningData';
import Container from '@/app/components/Container';
import { OverviewApi } from '@/app/service/overview-api';




export default function Page() {
  const [assetsObj, setAssetsObj] = React.useState<any>();
  const [chartData, setChartData] = React.useState<any>();
  const fetchList = () => {
    OverviewApi.getTotalSummary().then((res: any) => {
      if (res) {
        setAssetsObj(res.data);
      }
    })
  }

  const fetchChart = () => {
    OverviewApi.getTotalList().then((res: any) => {
      if (res) {
        setChartData(res.data);
      }
    })
  }

  useEffect(() => {
    fetchList()
    fetchChart()
  }, [])

  return (
    <Container>
      <div className='w-full h-full overflow-auto'>
        <div className='flex justify-between'>
          <TVLComponent data={assetsObj?.totalInvest || []} />
          <EarnComponent data={assetsObj?.totalEarn || []} />
        </div>
        <TotalAssetsTrend data={chartData?.assetList || []} />
        <EarningData data={chartData?.profitList || []} />
      </div>

    </Container>
  );
}
