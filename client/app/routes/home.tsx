import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import PhoneCardSlider from "~/components/phoneCardSlider";
import Trending from "~/components/trending";
import smartphoneService from "~/services/smartphone.service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}

export async function loader({request}: Route.LoaderArgs) {
  const res = await smartphoneService.getSmartphones()
  const smartphone = res?.data
  return smartphone.phones
}

export default function Home() {
const smartphones = useLoaderData<typeof loader>()
  return (
    <div className="lg:mx-15 overflow-x-hidden">
      <PhoneCardSlider smartphones={smartphones} />
      <Trending smartphones={smartphones} />
    </div>
  );
}
