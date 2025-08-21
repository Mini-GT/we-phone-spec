import TopTenSection from '~/components/topTenSection';
import type { Route } from './+types/smartphones';
import Pagination from '~/components/pagination';
import smartphoneService from '~/services/smartphone.service';
import { useState } from 'react';
import { queryKeysType, type SelectedTabType, type TopViewStatsType } from '~/types/globals.type';
import TopTenLayout from '~/components/topTenLayout';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Spinner } from '~/components/spinner';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smartphones - WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}


export async function loader({request}: Route.LoaderArgs) {
  const queryClient = new QueryClient();
  
  queryClient.fetchQuery({
    queryKey: queryKeysType.smartphones,
    queryFn: () => smartphoneService.getSmartphones(),
    staleTime: 5 * 60 * 1000,
  })
}

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
      <div className='flex flex-col gap-2 h-full sm:w-full lg:w-1/2 xl:w-1/3'>
        <TopTenSection selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="border rounded-md">
          {selectedTab === 'Today' && <TopTenLayout smartphones={topToday} /> }
          {selectedTab === 'Week' && <TopTenLayout smartphones={topWeek} /> }
          {selectedTab === 'Month' && <TopTenLayout smartphones={topMonth} /> }
        </div>
      </div>
    </div>
  );
}