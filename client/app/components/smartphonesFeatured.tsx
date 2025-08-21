import type { Smartphone } from "~/types/globals.type";
import SmartphonesFeaturedSection from "./smartphoneFeatureSection";

type SmartphonesFeaturedProps = {
  topViewed: Smartphone[]
  topLiked: Smartphone[]
  newAdded: Smartphone[]
}

export default function SmartphonesFeatured({ topViewed, topLiked, newAdded }: SmartphonesFeaturedProps) {
  return (
    <div className="min-h-screen text-white">
      <div className="grid grid-cols-1 space-y-5 sm:space-y-0 md:grid-cols-3 sm:gap-2">
        {/* <SmartphonesFeaturedSection title="Top Airing" smartphones={sampleData} /> */}
        <SmartphonesFeaturedSection title="Most Viewed" smartphones={topViewed} viewMore="/most-viewed" />
        <SmartphonesFeaturedSection title="Most Liked" smartphones={topLiked} viewMore="/most-liked" />
        <SmartphonesFeaturedSection title="New on WePhoneSpec" smartphones={newAdded} viewMore="/new-added" />
      </div>
    </div>
  );
}

