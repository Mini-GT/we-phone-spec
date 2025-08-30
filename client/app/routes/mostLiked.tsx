import TopTenSection from '~/components/topTenSection';
import type { Route } from './+types/smartphones';
import Pagination from '~/components/pagination';
import { useState } from 'react';
import { queryKeysType, type SelectedTabType, type TopViewStatsType } from '~/types/globals.type';
import TopTenLayout from '~/components/topTenLayout';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Spinner } from '~/components/spinner';
import SmartphoneService from '~/services/smartphone.service';
import { data, useFetcher } from 'react-router';
import DeviceGridLayout from '~/components/deviceGridLayout';
import type { ActionFunctionArgs } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Most Liked Smartphones - WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}

const smartphoneService = new SmartphoneService()

export async function action({request}: ActionFunctionArgs) {
  const queryClient = new QueryClient();
  let formData = await request.formData()
  // action coming from "KebabMenu.tsx" component
  const pagination = formData.get("pagination") as string
  const parsedPagination = JSON.parse(pagination) as { take: number, skip: number }
  let result = null
  
  if(parsedPagination) {
    const data = await queryClient.fetchQuery({
      queryKey: queryKeysType.topAllTimeLiked,
      queryFn: async () => await smartphoneService.getTopLikedSmartphones(parsedPagination.skip, parsedPagination.take)
    })
    result = data
  }

  return data({ result })
}

export default function MostViewed() {
  const [selectedTab, setSelectedTab] = useState<SelectedTabType>('Today')
  const fetcher = useFetcher()
  const smartphones = fetcher.data?.result.topLiked
  const totalSmartphones = fetcher.data?.result.totalDocs

  const { 
    data: topDevicesByViewStats, 
    isLoading: topDevicesByViewStatsIsLoading, 
    isError: topDevicesByViewStatsIsError, 
    error: topDevicesByViewStatsError 
  } = useQuery({
    queryKey: queryKeysType.topDevicesByViewStats,
    queryFn: () => smartphoneService.getTopDevicesByViewStats(),
  })

  const isAnyLoading = topDevicesByViewStatsIsLoading

  const isAnyError = topDevicesByViewStatsIsError

  const error = topDevicesByViewStatsError

  if (isAnyLoading) {
    return <Spinner spinSize="w-12" />
  }

  if (isAnyError) {
    return <div className="text-red-500 text-center py-10">{String(error)}</div>
  }

  const { topToday, topWeek, topMonth } = topDevicesByViewStats as TopViewStatsType 

  return (
    <div className='flex flex-col justify-between lg:flex-row gap-4'>
      {/* Smartphones List */}
      <div className="flex flex-col gap-5 w-full">
        <DeviceGridLayout 
          items={smartphones}
          title="Smartphones"
        />

        <Pagination 
          totalItems={totalSmartphones}
          fetcher={fetcher}
          itemsPerPage={24}
          action="/most-liked"
        />
      </div>

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