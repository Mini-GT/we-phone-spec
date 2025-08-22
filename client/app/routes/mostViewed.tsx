import TopTenSection from '~/components/topTenSection';
import type { Route } from './+types/smartphones';
import Pagination from '~/components/pagination';
import smartphoneService from '~/services/smartphone.service';
import { useState } from 'react';
import { queryKeysType, type ApiTopDeviceResponse, type SelectedTabType, type TopViewStatsType } from '~/types/globals.type';
import TopTenLayout from '~/components/topTenLayout';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '~/components/spinner';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Most Viewed Smartphones - WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}


// export async function loader({request}: Route.LoaderArgs) {
//     const { topViewed } = await smartphoneService.getTopAllTimeViewedSmartphones("?limitNumber=0&sort=desc") as ApiTopDeviceResponse
//     const topViewDevices = await smartphoneService.getTopDevicesByViewStats()
//     if (!topViewed || !topViewed.length || !topViewDevices) {
//       throw new Error("Failed to fetch devices");
//     }
//     return {topViewed, topViewDevices};
// }

export default function MostViewed() {
  // const { topViewed, topViewDevices } = useLoaderData<typeof loader>()
  const [selectedTab, setSelectedTab] = useState<SelectedTabType>('Today')
  const { 
    data: topAllTimeViewed, 
    isLoading: topAllTimeViewedIsLoading, 
    isError: topAllTimeViewedIsError, 
    error: topAllTimeViewedError 
  } = useQuery({
    queryKey: queryKeysType.topAllTimeViewed,
    queryFn: () => smartphoneService.getTopAllTimeViewedSmartphones("?limitNumber=5&sort=desc"),
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

  const isAnyLoading =
    topDevicesByViewStatsIsLoading ||
    topAllTimeViewedIsLoading 

  const isAnyError =
    topDevicesByViewStatsIsError ||
    topAllTimeViewedIsError 

  const error =
    topDevicesByViewStatsError ||
    topAllTimeViewedError 

  if (isAnyLoading) {
    return <Spinner spinSize="w-12" />
  }

  if (isAnyError) {
    return <div className="text-red-500 text-center py-10">{String(error)}</div>
  }

  const allTimeViewed = (topAllTimeViewed?.topViewed ?? []) as ApiTopDeviceResponse["topViewed"]
  const { topToday, topWeek, topMonth } = topDevicesByViewStats as TopViewStatsType 
  // const { topToday, topWeek, topMonth } = topViewDevices as ApiTopDeviceResponse

  return (
    <div className='flex flex-col justify-between lg:flex-row gap-4'>
      {/* Smartphones List */}
      <Pagination 
        data={allTimeViewed}
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