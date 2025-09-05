import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import PhoneCardSlider from "~/components/phoneCardSlider";
import Trending from "~/components/trending";
import { queryKeysType, type ApiTopDeviceResponse, type TopViewStatsType } from "~/types/globals.type";
import SmartphonesFeatured from "~/components/smartphonesFeatured";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "~/components/spinner";
import SmartphoneService from "~/services/smartphone.service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}

// export async function loader({request}: Route.LoaderArgs) {
//   const { topToday } = await smartphoneService.getTopDevicesByViewStats() as ApiTopDeviceResponse
//   const { topViewed } = await smartphoneService.getTopAllTimeViewedSmartphones("?limitNumber=5&sort=desc") as ApiTopDeviceResponse
//   const { topLiked } = await smartphoneService.getTopLikedSmartphones("?limitNumber=5&sort=desc") as ApiTopDeviceResponse
//   const { newAddedSmartphones } = await smartphoneService.getNewAddedSmartphones("?limitNumber=5&sort=desc") as ApiTopDeviceResponse
//   return { topToday, topViewed, topLiked, newAddedSmartphones }
// }
const smartphoneService = new SmartphoneService()

export default function Home() {
  const { 
    data: topDevicesByViewStats, 
    isLoading: topDevicesByViewStatsIsLoading, 
    isError: topDevicesByViewStatsIsError, 
    error: topDevicesByViewStatsError 
  } = useQuery({
    queryKey: queryKeysType.topDevicesByViewStats,
    queryFn: () => smartphoneService.getTopDevicesByViewStats(),
  })

  const { 
    data: topAllTimeViewed, 
    isLoading: topAllTimeViewedIsLoading, 
    isError: topAllTimeViewedIsError, 
    error: topAllTimeViewedError 
  } = useQuery({
    queryKey: queryKeysType.topAllTimeViewed,
    queryFn: () => smartphoneService.getTopAllTimeViewedSmartphones(),
  })

  const { 
    data: topAllTimeLiked, 
    isLoading: topAllTimeLikedIsLoading, 
    isError: topAllTimeLikedIsError, 
    error: topAllTimeLikedError 
  } = useQuery({
    queryKey: queryKeysType.topAllTimeLiked,
    queryFn: () => smartphoneService.getTopLikedSmartphones(),
  })

  const { 
    data: newAddedSmartphones, 
    isLoading: newAddedSmartphonesIsLoading, 
    isError: newAddedSmartphonesIsError, 
    error: newAddedSmartphonesError 
  } = useQuery({
    queryKey: queryKeysType.newAddedSmartphones,
    queryFn: () => smartphoneService.getNewAddedSmartphones(),
  })

  const isAnyLoading =
    topDevicesByViewStatsIsLoading ||
    topAllTimeViewedIsLoading ||
    topAllTimeLikedIsLoading ||
    newAddedSmartphonesIsLoading

  const isAnyError =
    topDevicesByViewStatsIsError ||
    topAllTimeViewedIsError ||
    topAllTimeLikedIsError ||
    newAddedSmartphonesIsError

  const error =
    topDevicesByViewStatsError ||
    topAllTimeViewedError ||
    topAllTimeLikedError ||
    newAddedSmartphonesError

  if (isAnyLoading) {
    return <Spinner spinSize="w-12" />
  }

  if (isAnyError) {
    return <div className="text-red-500 text-center py-10">{String(error)}</div>
  }

  const topToday = (topDevicesByViewStats?.topToday ?? []) as TopViewStatsType["topToday"]
  const allTimeViewed = (topAllTimeViewed?.topViewed ?? []) as ApiTopDeviceResponse["topViewed"]
  const allTimeLiked = (topAllTimeLiked?.topLiked ?? []) as ApiTopDeviceResponse["topLiked"]
  const newAdded = (newAddedSmartphones?.newAddedSmartphones ?? []) as ApiTopDeviceResponse["newAddedSmartphones"]
  
  return (
    <div className="flex flex-col gap-5 h-full mt-2 space-y-10 overflow-x-hidden">
      <PhoneCardSlider smartphones={topToday} />
      <Trending smartphones={topToday} />
      <SmartphonesFeatured topViewed={allTimeViewed} topLiked={allTimeLiked} newAdded={newAdded} />
    </div>
  );
}
