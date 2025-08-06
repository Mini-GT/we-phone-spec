import type { Dispatch, SetStateAction } from "react";
import type { SelectedTabType } from "~/types/globals.type";

type TopTenSectionProps = {
  selectedTab: SelectedTabType
  setSelectedTab: Dispatch<SetStateAction<SelectedTabType>>
}

const tabs: SelectedTabType[] = ['Today', 'Week', 'Month'];

export default function TopTenSection({ selectedTab, setSelectedTab }: TopTenSectionProps) {

  return (
    <div className='w-full my-4'>
      <div className='flex w-full justify-between'>
        <h1 className="text-xl font-bold">Top 10</h1>
        <div className='flex text-sm border border-[red] rounded-sm overflow-hidden'>
          {tabs.map((tab) => (
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
    </div>
  );
}