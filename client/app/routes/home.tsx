import { Link } from "react-router";
import type { Route } from "./+types/home";
import PhoneCardSlider from "~/components/phoneCardSlider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WePhoneSpec" },
    { name: "description", content: "Check the specification of your favorite smartphone!" },
  ];
}

export default function Home() {
  return (
    <div className="mx-auto overflow-x-hidden">
      <PhoneCardSlider />
    </div>
  );
}
