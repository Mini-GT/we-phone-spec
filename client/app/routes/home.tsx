import { Link } from "react-router";
import type { Route } from "./+types/home";
import PhoneCardSlider from "~/components/phoneCardSlider";
import Trending from "~/components/trending";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}

export default function Home() {
  return (
    <div className=" mx-15 overflow-x-hidden">
      <PhoneCardSlider />
      <Trending />
    </div>
  );
}
