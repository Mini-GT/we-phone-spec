import TopTenSection from '~/components/topTenSection';
import type { Route } from './+types/smartphones';
import Pagination from '~/components/pagination';
import { useState } from 'react';
import { queryKeysType, type SelectedTabType, type TopViewStatsType } from '~/types/globals.type';
import TopTenLayout from '~/components/topTenLayout';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Spinner } from '~/components/spinner';
import SmartphoneService from '~/services/smartphone.service';
import { data, useFetcher, type ActionFunctionArgs } from 'react-router';
import DeviceGridLayout from '~/components/deviceGridLayout';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smartphones - WePhoneSpec" },
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
      queryKey: queryKeysType.smartphones,
      queryFn: async () => await smartphoneService.getSmartphones(parsedPagination.take, parsedPagination.skip)
    })
    result = data
  }

  return data({ result })
}

export default function Smartphones() {
  const [selectedTab, setSelectedTab] = useState<SelectedTabType>('Today')
  const fetcher = useFetcher()
  const smartphones = fetcher.data?.result.phones
  const totalSmartphones = fetcher.data?.result.totalDocs

  const { 
    data: topDevicesByViewStats, 
    isLoading: topDevicesByViewStatsIsLoading, 
    isError: topDevicesByViewStatsIsError, 
    error: topDevicesByViewStatsError 
  } = useQuery({
    queryKey: queryKeysType.topDevicesByViewStats,
    queryFn: () => smartphoneService.getTopDevicesByViewStats(),
    staleTime: 5 * 60 * 1000,
  })

  if (topDevicesByViewStatsIsLoading) {
    return <Spinner spinSize="w-12" />
  }

  if (topDevicesByViewStatsIsError) {
    return <div>Error: {String(topDevicesByViewStatsError)}</div>
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
          action="/smartphones"
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