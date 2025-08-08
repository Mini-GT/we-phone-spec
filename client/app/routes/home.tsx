import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import PhoneCardSlider from "~/components/phoneCardSlider";
import Trending from "~/components/trending";
import smartphoneService from "~/services/smartphone.service";
import type { ApiTopDeviceResponse } from "~/types/globals.type";
import SmartphonesFeatured from "~/components/smartphonesFeatured";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}

export async function loader({request}: Route.LoaderArgs) {
  const { topToday } = await smartphoneService.getTopDeviceViewStats() as ApiTopDeviceResponse
  const { topViewed } = await smartphoneService.getTopViewedSmartphones("?limitNumber=5&sort=desc") as ApiTopDeviceResponse
  const { topLiked } = await smartphoneService.getTopLikedSmartphones("?limitNumber=5&sort=desc") as ApiTopDeviceResponse
  const { newAddedSmartphones } = await smartphoneService.getNewAddedSmartphones("?limitNumber=5&sort=desc") as ApiTopDeviceResponse
  return { topToday, topViewed, topLiked, newAddedSmartphones }
}

export default function Home() {
const { topToday, topViewed, topLiked, newAddedSmartphones } = useLoaderData<typeof loader>()
  if (!topToday || !topViewed || !topLiked || !newAddedSmartphones) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mx-15 lg:mx-0 overflow-x-hidden">
      <PhoneCardSlider smartphones={topToday} />
      <Trending smartphones={topToday} />
      <SmartphonesFeatured topViewed={topViewed} topLiked={topLiked} newAdded={newAddedSmartphones} />
    </div>
  );
}
