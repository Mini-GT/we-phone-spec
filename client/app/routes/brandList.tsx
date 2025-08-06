import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/brandList";
import smartphoneService from "~/services/smartphone.service";
import Pagination from "~/components/pagination";
import TopTenSection from "~/components/topTenSection";
import type { ApiTopDeviceResponse, SelectedTabType } from "~/types/globals.type";
import { useState } from "react";
import TopTenLayout from "~/components/topTenLayout";

export async function clientLoader({params}: Route.ClientLoaderArgs) {
  const brand = params.brandName
  const devices = await smartphoneService.getSmartphonesByBrand(brand)
  const topViewDevices  = await smartphoneService.getTopDeviceViewStats()
  return { devices, topViewDevices }
} 
clientLoader.hydrate = true;

export function HydrateFallback() {
  return <p>Loading Data...</p>;
}

export default function BrandList() {
  const data = useLoaderData<typeof clientLoader>();
  const { devices, topViewDevices } = data;
  const [selectedTab, setSelectedTab] = useState<SelectedTabType>('Today')
  const { topToday, topWeek, topMonth } = topViewDevices as ApiTopDeviceResponse
  return (
    <div className='flex flex-col justify-between lg:flex-row gap-4'>
      <Pagination
        data={devices}
        title="Sort by Brand"
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
  )
}