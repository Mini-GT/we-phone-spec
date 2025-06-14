import { phones } from 'mockData';
import { useState } from 'react';
import { Link, NavLink, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import TopTenSection from '~/components/topTenSection';
import { formatNumberToCompact } from '~/utils/formatNumber';
import type { Route } from './+types/smartphones';
import Pagination from '~/components/pagination';
import smartphoneService from '~/services/smartphone.service';

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
  return (
    <div className='flex gap-4 mx-15 my-4'>
      {/* Smartphones List */}
      <Pagination 
        data={data}
        title="Smartphones"
      />

      {/* TOP 10 */}
      <div className='w-full  my-4'>
        <TopTenSection />
      </div>
    </div>
  );
}