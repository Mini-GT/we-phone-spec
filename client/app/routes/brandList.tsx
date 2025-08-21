import { useLoaderData } from "react-router";
import type { Route } from "./+types/brandList";
import smartphoneService from "~/services/smartphone.service";
import Pagination from "~/components/pagination";
import TopTenSection from "~/components/topTenSection";
import { queryKeysType, type ApiTopDeviceResponse, type SelectedTabType, type TopViewStatsType } from "~/types/globals.type";
import { useState } from "react";
import TopTenLayout from "~/components/topTenLayout";
import { QueryClient, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Spinner } from "~/components/spinner";

export async function loader({params}: Route.LoaderArgs) {
  const brand = params.brandName
  const queryClient = new QueryClient()
  const smartphonesByBrand = await queryClient.fetchQuery({
    queryKey: queryKeysType.smartphonesByBrand,
    queryFn: () => smartphoneService.getSmartphonesByBrand(brand)
  })
  
  return { smartphonesByBrand }
} 

export default function BrandList() {
  const [selectedTab, setSelectedTab] = useState<SelectedTabType>('Today')
  const { smartphonesByBrand } = useLoaderData<typeof loader>();

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
      <Pagination
        data={smartphonesByBrand}
        title="Sort by Brand"
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
  )
}