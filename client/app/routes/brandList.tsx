import { useFetcher, useLoaderData, type ActionFunctionArgs } from "react-router";
import type { Route } from "./+types/brandList";
import Pagination from "~/components/pagination";
import TopTenSection from "~/components/topTenSection";
import { queryKeysType, type SelectedTabType, type TopViewStatsType } from "~/types/globals.type";
import { useState } from "react";
import TopTenLayout from "~/components/topTenLayout";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Spinner } from "~/components/spinner";
import SmartphoneService from "~/services/smartphone.service";
import DeviceGridLayout from "~/components/deviceGridLayout";

const smartphoneService = new SmartphoneService()

export async function action({request, params}: ActionFunctionArgs) {
  const queryClient = new QueryClient();
  const brand = params.brandName
  let formData = await request.formData()
  // action coming from "KebabMenu.tsx" component
  const pagination = formData.get("pagination") as string
  const parsedPagination = JSON.parse(pagination) as { take: number, skip: number }
  let result = null

  if(parsedPagination && brand) {
    const data = await queryClient.fetchQuery({
      queryKey: queryKeysType.smartphonesByBrand(brand),
      queryFn: async () => await smartphoneService.getSmartphonesByBrand(brand, parsedPagination.take, parsedPagination.skip)
    })
    // const data = await notificationService.getNotifications()
    result = data
  }
  // if(notifId) {
  //   const deleteResult = await notificationService.deleteNotification(notifId)
  //   result = deleteResult.message
  // }

  return { result }
}

export async function loader({params}: Route.LoaderArgs) {
  const brandName = params.brandName || ""
  return brandName
} 

export default function BrandList() {
  const brandName = useLoaderData<typeof loader>()
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
      <div className="flex flex-col gap-5 w-full">
        <DeviceGridLayout 
          items={smartphones}
          title="Smartphones"
        />

        <Pagination 
          totalItems={totalSmartphones}
          fetcher={fetcher}
          itemsPerPage={24}
          action={`/brand-list/${brandName}`}
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
  )
}