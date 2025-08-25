import TopTenSection from '~/components/topTenSection';
import type { Route } from './+types/smartphones';
import Pagination from '~/components/pagination';
import { useState } from 'react';
import { queryKeysType, type ApiTopDeviceResponse, type SelectedTabType, type TopViewStatsType } from '~/types/globals.type';
import TopTenLayout from '~/components/topTenLayout';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '~/components/spinner';
import SmartphoneService from '~/services/smartphone.service';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Adedd Smartphones - WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}


// export async function loader({request}: Route.LoaderArgs) {
//   const { newAddedSmartphones } = await smartphoneService.getNewAddedSmartphones("?limitNumber=0&sort=desc") as ApiTopDeviceResponse
//   const topViewDevices = await smartphoneService.getTopDevicesByViewStats()
//   if (!newAddedSmartphones || !newAddedSmartphones.length || !topViewDevices) {
//     throw new Error("Failed to fetch devices");
//   }
//   return { newAddedSmartphones, topViewDevices};
// }

const smartphoneService = new SmartphoneService()

export default function NewAdded() {
  // const { newAddedSmartphones, topViewDevices} = useLoaderData<typeof loader>()
  const [selectedTab, setSelectedTab] = useState<SelectedTabType>('Today')
  const { 
    data: newAddedSmartphones, 
    isLoading: newAddedSmartphonesIsLoading, 
    isError: newAddedSmartphonesIsError, 
    error: newAddedSmartphonesError 
  } = useQuery({
    queryKey: queryKeysType.newAddedSmartphones,
    queryFn: () => smartphoneService.getNewAddedSmartphones("?limitNumber=5&sort=desc"),
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
    newAddedSmartphonesIsLoading

  const isAnyError =
    topDevicesByViewStatsIsError ||
    newAddedSmartphonesIsError

  const error =
    topDevicesByViewStatsError ||
    newAddedSmartphonesError

  if (isAnyLoading) {
    return <Spinner spinSize="w-12" />
  }

  if (isAnyError) {
    return <div className="text-red-500 text-center py-10">{String(error)}</div>
  }

  const newAdded = (newAddedSmartphones?.newAddedSmartphones ?? []) as ApiTopDeviceResponse["newAddedSmartphones"]
  const { topToday, topWeek, topMonth } = topDevicesByViewStats as TopViewStatsType

  // const topToday = (topDevicesByViewStats?.topToday ?? []) as TopViewStatsType["topToday"]
  // const allTimeViewed = (topAllTimeViewed?.topViewed ?? []) as ApiTopDeviceResponse["topViewed"]
  // const allTimeLiked = (topAllTimeLiked?.topLiked ?? []) as ApiTopDeviceResponse["topLiked"]
  // const { topToday, topWeek, topMonth } = topViewDevices as ApiTopDeviceResponse

  return (
    <div className='flex flex-col justify-between lg:flex-row gap-4'>
      {/* Smartphones List */}
      <Pagination 
        data={newAdded}
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