import { useLoaderData } from 'react-router';
import TopTenSection from '~/components/topTenSection';
import type { Route } from './+types/smartphones';
import Pagination from '~/components/pagination';
import smartphoneService from '~/services/smartphone.service';
import { useState } from 'react';
import type { ApiTopDeviceResponse, SelectedTabType } from '~/types/globals.type';
import TopTenLayout from '~/components/topTenLayout';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Adedd Smartphones - WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}


export async function loader({request}: Route.LoaderArgs) {
  const { newAddedSmartphones } = await smartphoneService.getNewAddedSmartphones("?limitNumber=0&sort=desc") as ApiTopDeviceResponse
  const topViewDevices = await smartphoneService.getTopDevicesByViewStats()
  if (!newAddedSmartphones || !newAddedSmartphones.length || !topViewDevices) {
    throw new Error("Failed to fetch devices");
  }
  return { newAddedSmartphones, topViewDevices};
}

export default function NewAdded() {
  const { newAddedSmartphones, topViewDevices} = useLoaderData<typeof loader>()
  const [selectedTab, setSelectedTab] = useState<SelectedTabType>('Today')
  const { topToday, topWeek, topMonth } = topViewDevices as ApiTopDeviceResponse
  return (
    <div className='flex flex-col justify-between lg:flex-row gap-4'>
      {/* Smartphones List */}
      <Pagination 
        data={newAddedSmartphones}
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