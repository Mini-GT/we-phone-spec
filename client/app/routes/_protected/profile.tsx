import { useEffect, useState } from 'react';
import { Mail, Lock, AlertTriangle, Edit2, UserCheck, UserRound } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { toReadableDate } from '~/utils/formatDate';
import { Form, NavLink, redirect, useLoaderData, useMatches, useNavigate, type ActionFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from 'react-router';
import UserMenuNav from '~/components/userMenuNav';
import { useAuth } from '~/context/authContext';
import { AnimatePresence, motion } from "motion/react"
import EmailService from '../../services/email.service';
import authService from '~/services/auth.service';
import { Spinner } from '~/components/spinner';
import userService from '~/services/user.service';
import type { Route } from './+types/profile';
import type { UserType } from '~/types/globals.type';
import { FormField } from '~/components/form/formField';
import { Input } from '~/components/ui/input';

export function meta({}: MetaFunction) {
  return [
    { title: "Profile - WePhoneSpec" },
    { name: "description", content: "View and manage your profile." },
  ];
}

type FormField = 'name' | 'currentPassword' | 'newPassword' | 'confirmPassword';
type FieldErrors = Record<FormField, boolean>;

export async function action({request}: ActionFunctionArgs) { 
  const token = authService.privateRoute(request) || ""
  let formData = await request.formData()
  const rawFormData = formData.get("profileFormData") as string
  if(rawFormData) {
    const parsedData = JSON.parse(rawFormData)
    const { name, currentPassword, newPassword, confirmPassword } = parsedData

    const fieldInput = {
      isEmptyName: !name,
      isEmptyCurrentPassword: !currentPassword,
      isEmptyNewPassword: !newPassword,
      isEmptyConfirmPassword: !confirmPassword
    }

    if(!name) return fieldInput

    await userService.changeName(token, name)

    if(!currentPassword || !newPassword || !confirmPassword) {
      return fieldInput 
    }

  }
}


export async function loader({request}: LoaderFunctionArgs) {
  const token = authService.privateRoute(request) || "";
  const user = await userService.getMe(token)
  return user
}

const defaultFieldErrors: FieldErrors = {
  name: false,
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
};

export default function Profile({
  actionData
}: Route.ComponentProps) {
  const matches = useMatches()
  const user = matches[0].data as UserType
  const [ formData, setFormData ] = useState({
    id: user.id,
    name: user.name,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [ fieldError, setFieldError ] = useState<FieldErrors>(defaultFieldErrors)
  const [showFields, setShowFields] = useState(true);
  useEffect(() => {
    if (actionData) {
      const mappedErrors: FieldErrors = {
        name: actionData.isEmptyName,
        currentPassword: actionData.isEmptyCurrentPassword,
        newPassword: actionData.isEmptyNewPassword,
        confirmPassword: actionData.isEmptyConfirmPassword,
      };

      setFieldError(mappedErrors);

      // Clear after 3 seconds
      const timeout = setTimeout(() => {
        setFieldError(defaultFieldErrors);
      }, 5000);

      return () => clearTimeout(timeout); // cleanup
    }
  }, [actionData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmailVerification = async () => {
    try {
      const res = await EmailService.sendEmailVerification()
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }
  
  if (!user) {
    return (
      <Spinner spinSize="w-12 h-12" />
    )
  }

  return (
    <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <UserMenuNav tab={"profile"} name={user.name} />

      <div className="w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="text-3xl font-bold text-white flex items-center">
              {/* <span className="mr-3">👤</span> */}
              {/* <UserRound className="mr-3 h-6 w-6" /> */}
              <UserRound fill="#8e44ad" strokeWidth={0} className="mr-3 h-7 w-7" />
              Edit Profile
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 pr-0 md:pr-8">
              {/* Email */}
              <div className="mb-6">
                <FormField 
                  label="Email Address"
                  name="email"
                  value={user.email}
                  labelStyle="block text-gray-400 text-sm mb-2 uppercase tracking-wide"
                  inputStyle="w-full bg-gray-800 rounded px-4 py-3 text-white focus:outline-none"
                  readOnly={true}
                />
              </div>

              {/* Verification Status */}
              {user.status === "verified" ? 
              // verified
              <div className="mb-6 inline-flex items-center gap-2 border border-pink-300 text-pink-300 px-4 py-2 rounded-full text-md font-medium">
                <UserCheck className="w-6 h-6" />
                <span>Verified</span>
              </div> :
              // not verified
              <div className="mb-6 bg-gray-900 border border-gray-800 rounded p-4">
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-500 mr-2 h-5 w-5" />
                  <div>
                    <p className="text-white">
                      Your account has not been verified.
                      <button 
                        className="ml-1 text-pink-400 cursor-pointer hover:underline"
                        onClick={sendEmailVerification}
                      >
                        Click here
                      </button> to
                      send verification email.
                    </p>
                  </div>
                </div>
              </div>
              }

              {/* Name */}
              <div className="mb-6">
                <FormField 
                  label="YOUR NAME"
                  name="name"
                  value={formData.name}
                  onChangeEvent={handleChange}
                  labelStyle="block text-gray-400 text-sm mb-2 uppercase tracking-wide"
                  inputStyle={`w-full bg-gray-800 rounded px-4 py-3 text-white ${fieldError.name ? "border border-2 border-red-400 shake" : null }`}
                />
              </div>

              {/* Join Date */}
              <div className="mb-6">
                <FormField 
                  label="Joined"
                  name="email"
                  value={toReadableDate(user.createdAt || "")}
                  labelStyle="block text-gray-400 text-sm mb-2 uppercase tracking-wide"
                  inputStyle="w-full bg-gray-800 rounded px-4 py-3 text-white focus:outline-none"
                  readOnly={true}
                />
              </div>

              {/* Change Password */}
              <div className="mb-6">
                <button 
                  className="text-gray-400 text-lg flex items-center hover:text-gray-300 cursor-pointer mb-6"
                  onClick={() => setShowFields(!showFields)}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change password
                </button>
                <AnimatePresence initial={false}>
                  {showFields && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="space-y-3">
                        <FormField 
                          label="CURRENT PASSWORD"
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChangeEvent={handleChange}
                          labelStyle="block text-gray-400 text-sm mb-2 uppercase tracking-wide"
                          inputStyle={`w-full bg-gray-800 rounded px-4 py-3 text-white ${fieldError.currentPassword ? "border border-2 border-red-400 shake" : null }`}
                        />
                        <FormField 
                          label="NEW PASSWORD"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChangeEvent={handleChange}
                          labelStyle="block text-gray-400 text-sm mb-2 uppercase tracking-wide"
                          inputStyle={`w-full bg-gray-800 rounded px-4 py-3 text-white ${fieldError.newPassword ? "border border-2 border-red-400 shake" : null }`}
                        />
                        <FormField 
                          label="CONFIRM PASSWORD"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChangeEvent={handleChange}
                          labelStyle="block text-gray-400 text-sm mb-2 uppercase tracking-wide"
                          inputStyle={`w-full bg-gray-800 rounded px-4 py-3 text-white ${fieldError.confirmPassword? "border border-2 border-red-400 shake" : null }`}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Save Button */}
              <Form method="post" action="/user/profile">
                <button 
                    className="w-full bg-pink-300 hover:bg-pink-400 text-gray-900 font-medium py-3 px-4 rounded transition-colors cursor-pointer"
                    value={JSON.stringify(formData)}
                    name="profileFormData"
                  >
                    Save
                </button>
              </Form>
            </div>

            {/* Profile Picture */}
            <div className="mt-8 md:mt-0 flex justify-center">
              <div className="relative">
                <div className="relative">
                  <div className="relative overflow-hidden z-0 w-32 h-32 rounded-full bg-purple-700 flex items-center justify-center border-4 border-purple-600">
                    <img 
                      src={user.profileImage || "/userIcon.svg"} 
                      alt="Profile" 
                      className="object-cover w-full"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:opacity-90">
                    <Edit2 className="h-4 w-4 text-gray-800" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}