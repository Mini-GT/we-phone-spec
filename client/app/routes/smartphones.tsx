import TopTenSection from '~/components/topTenSection';
import type { Route } from './+types/smartphones';
import Pagination from '~/components/pagination';
import smartphoneService from '~/services/smartphone.service';
import { useState } from 'react';
import { queryKeysType, type SelectedTabType, type TopViewStatsType } from '~/types/globals.type';
import TopTenLayout from '~/components/topTenLayout';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '~/components/spinner';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smartphones - WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}


// export async function loader({request}: Route.LoaderArgs) {
//     const data = await smartphoneService.getSmartphones()
//     const topViewDevices  = await smartphoneService.getTopDeviceViewStats()

//     if (!data) {
//       throw new Error("Failed to fetch smartphones");
//     }

//     const devices = data.phones
//     return {devices, topViewDevices};
// }

export default function Smartphones() {
  const [selectedTab, setSelectedTab] = useState<SelectedTabType>('Today')

  const { 
    data: smartphones, 
    isLoading: smartphonesIsLoading, 
    isError: smartphonesIsError, 
    error: smartphonesError 
  } = useQuery({
    queryKey: queryKeysType.smartphones,
    queryFn: () => smartphoneService.getSmartphones(),
  })

  const { 
    data: topDevicesByViewStats, 
    isLoading: topDevicesByViewStatsIsLoading, 
    isError: topDevicesByViewStatsIsError, 
    error: topDevicesByViewStatsError 
  } = useQuery({
    queryKey: queryKeysType.topDevicesByViewStats,
    queryFn: () => smartphoneService.getTopDevicesByViewStats(),
  })

  if (smartphonesIsLoading || topDevicesByViewStatsIsLoading) {
    return <Spinner spinSize="w-12" />
  }

  if (smartphonesIsError) {
    return <div>Error: {String(smartphonesError)}</div>
  }
  if (topDevicesByViewStatsIsError) {
    return <div>Error: {String(topDevicesByViewStatsError)}</div>
  }

  const { phones: devices } = smartphones 
  const { topToday, topWeek, topMonth } = topDevicesByViewStats as TopViewStatsType

  return (
    <div className='flex flex-col justify-between lg:flex-row gap-4'>
      {/* Smartphones List */}
      <Pagination 
        data={devices}
        title="Smartphones"
      />

      {/* TOP 10 */}
      <div className='flex flex-col gap-2 w-1/4'>
        <TopTenSection selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="mt-4">
          {selectedTab === 'Today' && <TopTenLayout smartphones={topToday} /> }
          {selectedTab === 'Week' && <TopTenLayout smartphones={topWeek} /> }
          {selectedTab === 'Month' && <TopTenLayout smartphones={topMonth} /> }
        </div>
      </div>
    </div>
  );
}