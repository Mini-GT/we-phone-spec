import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import TopTenSection from '~/components/topTenSection';
import type { Route } from './+types/smartphones';
import Pagination from '~/components/pagination';
import smartphoneService from '~/services/smartphone.service';
import { useState } from 'react';
import type { SelectedTabType } from '~/types/globals.type';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smartphones - WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}


export async function loader({request}: LoaderFunctionArgs) {
  try {
    const response = await smartphoneService.getSmartphones()
    if (!response || !response.data) {
      throw new Error("Failed to fetch users");
    }

    const devices = response.data.phones
    return devices;
  } catch (error) {
    console.error(error)
  }
}

export default function Smartphones() {
  const data = useLoaderData<typeof loader>()
  const [selectedTab, setSelectedTab] = useState<SelectedTabType>('Today');

  return (
    <div className='flex flex-col lg:flex-row gap-4'>
      {/* Smartphones List */}
      <Pagination 
        data={data}
        title="Smartphones"
      />

      {/* TOP 10 */}
      <div className='flex flex-col gap-2 w-full'>
        <TopTenSection selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="mt-4">
          {selectedTab === 'Today' && <div>Showing Today data</div>}
          {selectedTab === 'Week' && <div>Showing Weekly data</div>}
          {selectedTab === 'Month' && <div>Showing Monthly data</div>}
        </div>
      </div>
    </div>
  );
}