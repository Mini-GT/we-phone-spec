import { useLoaderData } from "react-router";
import type { Route } from "./+types/brandList";
import smartphoneService from "~/services/smartphone.service";
import Pagination from "~/components/pagination";
import TopTenSection from "~/components/topTenSection";

export async function clientLoader({params}: Route.ClientLoaderArgs) {
  const brand = params.brandName
  const devices = await smartphoneService.getSmartphonesByBrand(brand);
  // if (!devices) {
  //   throw new Error("No devices found for this brand");
  // }
  return devices;
} 
clientLoader.hydrate = true;

export function HydrateFallback() {
  return <p>Loading Data...</p>;
}

export default function BrandList() {
  const devices = useLoaderData<typeof clientLoader>();
  return (
    <div className="flex gap-4 mx-15 my-4">
      <Pagination
        data={devices}
        title="Sort by Brand"
      />

      {/* TOP 10 */}
      <div className='w-full  my-4'>
        <TopTenSection />
      </div>
    </div>
  )
}