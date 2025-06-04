import { NavLink, useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router";
import { Mail, Lock, AlertTriangle, Edit2, Heart } from 'lucide-react';
import { toReadableDate } from "~/utils/formatDate";
import UserMenuNav from "~/components/userMenuNav";
import { useAuth } from "~/context/authContext";
import type { Route } from "../_protected/+types/likeList";
import { requireAuthCookie } from "~/utils/auth";
import Spinner from "~/components/spinner";

export async function loader({request}: LoaderFunctionArgs) {
  const userId = await requireAuthCookie(request);
}

export default function LikeList() {
  const { user, isLoading, error } = useAuth()

  if (isLoading) {
    return (
      <Spinner />
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <p className="text-red-400">Error loading profile. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-4">
      <UserMenuNav
        tab={"likelist"}
        name={user?.name}
      />

      <div className="w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden">
        <div className="p-8 h-[70vh]">
          <div className="flex items-center mb-8">
            <div className="text-3xl font-bold text-white flex items-center">
              {/* <span className="mr-3">👤</span> */}
              {/* <Heart className="mr-3 h-6 w-6" /> */}
              <Heart fill="#e74c3c" strokeWidth={0} className="mr-3 h-7 w-7" />
              Like List
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}