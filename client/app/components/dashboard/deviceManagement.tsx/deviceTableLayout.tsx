import { Trash2 } from "lucide-react";
import { queryKeysType, type Smartphone, type TableSortConfig } from "~/types/globals.type";
import { toReadableDate } from "~/utils/formatDate";
import _ from "lodash";
import { getFirstWord } from "~/utils/getFirstWord";
import { usePopupButton } from "~/context/popupButtonContext";
import { Form } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

type DeviceTableLayoutProps = {
  getSortIcon: (iconTpe: TableSortConfig["key"]) => React.ReactNode;
  handleSort: (sortType: TableSortConfig["key"]) => void;
  currentDevices: Smartphone[];
};

export default function DeviceTableLayout({
  getSortIcon,
  handleSort,
  currentDevices,
}: DeviceTableLayoutProps) {
  const queryClient = useQueryClient()
  const { setPopupButton } = usePopupButton()
  function handlePopupForm() {
    setPopupButton(prevState => ({
      ...prevState,
      popup: true,
      isAddDeviceClicked: true
    }));
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr className="">
            {/* <th className="text-left p-4">
              <input type="checkbox" className="rounded border-gray-300" />
            </th> */}
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('_id')}
            >
              ID <span className="text-xs ml-1">{getSortIcon('_id')}</span>
            </th>
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('name')}
            >
              Name <span className="text-xs ml-1">{getSortIcon('name')}</span>
            </th>
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('brand')}
            >
              Brand <span className="text-xs ml-1">{getSortIcon('brand')}</span>
            </th>
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              // onClick={() => handleSort('os')}
            >
              Operating System
            </th>
            {/* <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              Status
            </th>
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              Role
            </th> */}
            <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              Added Date
            </th>
            {/* <th 
              className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('lastActive')}
            >
              Last Active <span className="text-xs ml-1">{getSortIcon('lastActive')}</span>
            </th> */}
            <th className="text-left p-4 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentDevices.map((device) => (
            <tr key={device._id} className="hover:bg-gray-50">
              {/* <td className="p-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </td> */}
              <td className="p-4 text-gray-700">{device._id}</td>
              <td className=" max-w-[10vw]">
                <div className="flex items-center gap-3">
                  <img 
                    src={`/imgs/phones/${device.image || "phone_placeholder.svg"}`} 
                    alt={device.name}
                    className="w-8 h-8 object-cover"
                    loading="lazy"
                  />
                  <span className="font-medium text-gray-900 truncate">{device.name}</span>
                </div>
              </td>
              <td className="p-4 text-gray-700">{device. brand}</td>
              <td className="p-4 text-gray-700">{getFirstWord(device.specs.platform.os)}</td>
              {/* <td className="p-4 text-gray-700">{device.specs.platform.os}</td> */}
              {/* <td className="p-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.isVerified)}`}>
                  {user.isVerified ? 'Verified' : 'Unverified'}
                </span>
              </td>
              <td className="p-4 text-gray-700">{_.capitalize(user.role)}</td> */}
              <td className="p-4 text-gray-700">{toReadableDate(device.createdAt ?? "")}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Form method="post">
                    <button 
                      name="deviceId" 
                      value={device._id} 
                      // type="submit" 
                      onClick={handlePopupForm}
                    >
                      Edit
                    </button>
                  </Form>
                  <Form method="delete">
                    <button
                      className="p-1 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                      value={device._id}
                      name="deleteDeviceById"
                      onClick={() => queryClient.invalidateQueries({queryKey: queryKeysType.smartphones})}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </Form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}