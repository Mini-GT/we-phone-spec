import { useState } from "react";
import { useUser } from "~/context/userContext";
import { Button } from "./ui/button";

const avatars: AvatarTypes[] = [
  "/imgs/profile/male_1.png",
  "/imgs/profile/male_2.png",
  "/imgs/profile/male_3.png",
  "/imgs/profile/female_1.png",
  "/imgs/profile/female_2.png",
  "/imgs/profile/female_3.png",
];

export type AvatarTypes = 
  | "/imgs/profile/male_1.png"
  | "/imgs/profile/male_2.png"
  | "/imgs/profile/male_3.png"
  | "/imgs/profile/female_1.png"
  | "/imgs/profile/female_2.png"
  | "/imgs/profile/female_3.png"

export default function AvatarPicker() {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarTypes>();
  const { setUser, user } = useUser()

  const handleSelect = (avatar: AvatarTypes) => {
    setSelectedAvatar(avatar)
    setUser(prev => {
      if(!prev) return null
      return { ...prev, profileImage: avatar }
    })
  };

  return (
    <div className="absolute top-23 p-3 bg-white shadow-lg border rounded-xl grid grid-cols-3 gap-3">
      {avatars.map((avatar) => (
        <img
          key={avatar}
          src={avatar}
          alt="Avatar option"
          loading="lazy"
          className={`object-fill w-19 h-19 rounded-full border cursor-pointer transition hover:scale-110 ${
            avatar === selectedAvatar ? "ring-2 ring-blue-500" : ""
          }`}
          onClick={() => handleSelect(avatar)}
        />
      ))}
      {/* <div className="flex justify-center gap-7 col-span-3"> 
        <Button className="w-20">Save</Button>
        <Button className="w-20">Cancel</Button>
      </div> */}
    </div>
  );
}
