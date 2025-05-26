import { NavLink, useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router";
import { Mail, Lock, AlertTriangle, Edit2 } from 'lucide-react';
import { toReadableDate } from "~/utils/formatDate";
import UserMenuNav from "~/components/userMenuNav";
import { useAuth } from "~/context/authContext";
import type { Route } from "../_protected/+types/likeList";

export default function LikeList() {
  const { user } = useAuth()
  const navigate = useNavigate()
  if(!user) {
    return navigate("/unauthorized")
  }

  return (
    <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-4">
      <UserMenuNav
        tab={"likelist"}
        name={user?.name}
      />

      <div className="w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden">
        <div className="p-8 h-[100vh]">
          <div className="flex items-center mb-8">
            <div className="text-3xl font-bold text-white flex items-center">
              <span className="mr-3">👤</span>
              Like List
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}