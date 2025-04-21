import { useState } from 'react';

export default function TopTenSection() {
  const [selectedTab, setSelectedTab] = useState('Today');

  return (
    <div className='w-full my-4'>
      <div className='flex w-full justify-between'>
        <h1 className="text-xl font-bold">Top 10</h1>
        <div className='flex text-sm border border-[red] rounded-sm overflow-hidden'>
          {['Today', 'Weekly', 'Monthly'].map((tab) => (
            <div
              key={tab}
              className={`px-4 flex items-center cursor-pointer ${
                selectedTab === tab ? 'bg-red-500 text-white' : ''
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {selectedTab === 'Today' && <div>Showing Today data</div>}
        {selectedTab === 'Weekly' && <div>Showing Weekly data</div>}
        {selectedTab === 'Monthly' && <div>Showing Monthly data</div>}
      </div>
    </div>
  );
}