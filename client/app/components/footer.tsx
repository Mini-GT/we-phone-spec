import { NavLink } from "react-router";

export default function Footer() {
  const alphabet = ["#", "0-9", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  
  return (
    <div className="mx-15 mt-15 text-white">
      <header className="flex items-center gap-8 border-b border-gray-300 pb-4 mb-4">
        <NavLink to="/" className="flex items-center mb-5 md:mb-0">
          <span className="text-4xl font-black text-gray-900 select-none">
              We<span className="text-indigo-600">PhoneSpec</span>
          </span>
        </NavLink>

        <div className="flex flex-col border-l border-gray-300 pl-8">
          <div className="mx-auto">
            <h1 className="text-black text-xl">Join Now</h1>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <img className="object-cover" src="imgs/discord.png" alt="Discord" />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <img className="object-cover" src="imgs/reddit.png" alt="Reddit" />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <img className="object-cover" src="imgs/twitter.png" alt="Twitter" />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <img className="object-cover" src="imgs/telegram.png" alt="Telegram" />
            </button>
          </div>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-600">A-Z LIST</h2>
        <p className="mb-4 text-gray-600">Searching device order by alphabet name A to Z.</p>
        <div className="flex flex-wrap gap-2">
          <button className="bg-white text-black px-4 py-1 rounded">All</button>
          {alphabet.map((char) => (
            <button key={char} className="bg-[#3b3a50] hover:bg-[#555] px-4 py-1 rounded text-white font-semibold cursor-pointer">
              {char}
            </button>
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
