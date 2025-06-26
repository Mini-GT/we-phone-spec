import { X } from "lucide-react";
import AddDeviceForm from "~/components/dashboard/deviceManagement.tsx/addDeviceForm";
import { Card } from "~/components/ui/card";
import { usePopupButton } from "~/context/popupButtonContext";
import { useSmartphone } from "~/context/smartphoneContext";

export default function AddDevice() {
  const { setPopupButton } = usePopupButton();
  const { setSmartphoneFormData } = useSmartphone()

  function handleCloseForm() {
    // Logic to close the form, e.g., set a state variable to hide it
    setPopupButton(prevState => ({
      ...prevState,
      isAddDeviceClicked: false, 
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
        {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Phone Specifications Form</h1>
          <p className="text-blue-100 mt-2">Enter detailed phone specifications</p>
        </div> */}
        {/* <h2>Add Device</h2>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="submit">Add User</button>
        </form> */}
        <AddDeviceForm />
      </Card>
    </div>
  );
}