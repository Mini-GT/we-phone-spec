import { phones } from 'mockData';
import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import TopTenSection from '~/components/topTenSection';
import { formatNumberToCompact } from '~/utils/formatNumber';
import type { Route } from './+types/smartphones';
import Pagination from '~/components/pagination';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smartphones - WePhoneSpec" },
  ];
}

export default function Smartphones() {
  const data = phones;
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