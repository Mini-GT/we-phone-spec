import { X } from "lucide-react";
import AddDeviceForm from "~/components/dashboard/deviceManagement.tsx/addDeviceForm";
import { Card } from "~/components/ui/card";
import { usePopupButton } from "~/context/popupButtonContext";
import { useSmartphone } from "~/context/smartphoneContext";
import AddUserForm from "./dashboard/usersManagement/addUserForm";
import { Form, useNavigation } from "react-router";
import { Spinner } from "./spinner";
import type { UserFormPath } from "~/types/globals.type";
import { useSelectedUser } from "~/context/selectedUserContext";

export default function CardModal() {
  const { popupButton, setPopupButton } = usePopupButton();
  const { smartphoneFormData: formData, setSmartphoneFormData } = useSmartphone()
  const navigation = useNavigation()
  const { selectedUser, setSelectedUser } = useSelectedUser() 

  const handleInputChange = (path: UserFormPath, value: string | number | boolean) => {
    setSelectedUser(prev => {
      const newData = structuredClone(prev);
      const keys = path.split('.');
      let current: any = newData;
    
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    })
  } 

  function handleCloseForm() {
    // Logic to close the form, e.g., set a state variable to hide it
    setPopupButton(prevState => ({
      ...prevState,
      isAddDeviceClicked: false,
      isAddUserClicked: false,
      popup: false
    }));
    setSmartphoneFormData({
      _id: '',
      name: '',
      brand: '',
      views: 0,
      likes: 0,
      description: '',
      image: '',
      launch: {
        announced: '',
        released: '',
      },
      specs: {
        body: {
          dimensions: '',
          weight: '',
          build: '',
          sim: '',
          resistance: '',
        },
        display: {
          type: '',
          size: '',
          resolution: '',
          protection: '',
        },
        platform: {
          os: '',
          chipset: '',
          cpu: '',
          gpu: '',
        },
        memory: {
          cardSlot: '',
          internal: '',
        },
        camera: {
          main: {
            triple: '',
            features: '',
            video: '',
          },
          selfie: {
            single: '',
            features: '',
            video: '',
          },
        },
        sound: {
          loudspeaker: '',
          jack: '',
        },
        connection: {
          wlan: '',
          bluetooth: '',
          nfc: '',
          infraredPort: '',
          radio: '',
          USB: '',
        },
        features: {
          sensors: '',
        },
        battery: {
          type: '',
          charging: '',
        },
        misc: {
          colors: '',
          models: '',
        },
      },
    })
  }

  return (
    <div className="flex z-1 fixed inset-0 items-center justify-center backdrop-blur-xs bg-black/50">
      <Card className="absolute bg-white shadow-lg animate-popup-enter">
        <button 
          onClick={handleCloseForm} 
          className="z-10 absolute -top-4 -right-3 p-1 text-black bg-white rounded-full cursor-pointer"
          aria-label="Close form"
        >
          <X size={30} />
        </button>
        
        {popupButton.isAddDeviceClicked && 
          <AddDeviceForm>
            <Form method="put" action="/devices">
              <div className="flex justify-end">
                <button 
                  className="flex w-20 h-10 items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  type="submit" 
                  disabled={navigation.formAction === "/devices"}
                  name="deviceObj" 
                  value={JSON.stringify(formData)}
                >
                  {navigation.formAction === "/devices" ? <Spinner parentClassName="w-full h-full" spinSize="ml-1 w-5 h-5" /> : "Submit"}
                </button>
              </div>
            </Form>
          </AddDeviceForm>
        }
        {popupButton.isAddUserClicked && 
          <AddUserForm handleInputChange={handleInputChange}>
            <Form method="put" action="/users">
              <div className="flex justify-end">
                <button 
                  className="flex w-20 h-10 items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  type="submit" 
                  disabled={navigation.formAction === "/users"}
                  name="userFormData" 
                  value={JSON.stringify(selectedUser)}
                >
                  {navigation.formAction === "/users" ? <Spinner parentClassName="w-full h-full" spinSize="ml-1 w-5 h-5" /> : "Submit"}
                </button>
              </div>
            </Form>
          </AddUserForm>
        }
      </Card>
    </div>
  );
}