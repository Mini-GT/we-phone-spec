import { useState } from "react";
import { NavLink } from "react-router";

export const brands = [
  "SAMSUNG", "APPLE", "HUAWEI", "NOKIA", "SONY", "LG", "HTC", "MOTOROLA", "LENOVO",
  "XIAOMI", "GOOGLE", "HONOR", "OPPO", "REALME", "ONEPLUS", "NOTHING", "VIVO", "MEIZU",
  "ASUS", "ALCATEL", "ZTE", "MICROSOFT", "UMIDIGI", "COOLPAD", "OSCAL", "SHARP", "MICROMAX",
  "INFINIX", "ULEFONE", "TECNO", "DOOGEE", "BLACKVIEW", "CUBOT", "OUKITEL", "ITEL", "TCL"
  ] as const;

export type BrandType = typeof brands[number];

export default function Footer() {
  const [selectedBrand] = useState<string>("");

  return (
    <div className="mt-15 text-white">
      <header className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-8 border-b border-gray-300 pb-4 mb-4">
        <NavLink to="/" className="flex items-center">
          <span className="text-4xl font-black text-gray-900 select-none">
            We<span className="text-indigo-600">PhoneSpec</span>
          </span>
        </NavLink>

        <div className="flex flex-col sm:border-l border-gray-300 sm:pl-8">
          <div className="mx-auto">
            <h1 className="text-black text-xl">Join Now</h1>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <img className="object-cover" src="/imgs/discord.png" alt="Discord" />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <img className="object-cover" src="/imgs/reddit.png" alt="Reddit" />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <img className="object-cover" src="/imgs/twitter.png" alt="Twitter" />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <img className="object-cover" src="/imgs/telegram.png" alt="Telegram" />
            </button>
          </div>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-600">BRAND LIST</h2>
        <p className="mb-4 text-gray-600">Search device by brand name.</p>
        <div className="flex flex-wrap gap-2">
          {/* <button className="bg-gray-800 text-white hover:bg-blue-700 font-semibold transition cursor-pointer px-4 py-2 rounded">All</button> */}
          {brands.map((brand) => (
            <NavLink
              to={`/brand-list/${brand.toLowerCase()}`}
              key={brand}
              className={`px-4 py-2 rounded font-semibold text-sm xl:text-lg transition cursor-pointer ${
                selectedBrand === brand
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white hover:bg-blue-700"
              }`}
            >
              {brand}
            </NavLink>
          ))}
        </div>
      </section>

      <footer className="mt-10 text-sm text-gray-600">
        <div className="flex flex-wrap gap-4 mb-2">
          <a href="#" className="hover:text-gray-900">Terms of service</a>
          <a href="#" className="hover:text-gray-900">DMCA</a>
          <a href="#" className="hover:text-gray-900">Contact</a>
        </div>
        <p>WePhoneSpec does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p>
        <p>© WePhoneSpec.to. All rights reserved.</p>
      </footer>
    </div>
  );
}
