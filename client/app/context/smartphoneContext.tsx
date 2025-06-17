import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import type { ContextProviderProps, Smartphone } from "~/types/globals.type";
import smartphoneService from "~/services/smartphone.service";

type SmartpoheContextType = {
  smartphoneFormData: Omit<Smartphone, "id" | "image">
  setSmartphoneFormData: (device: Omit<Smartphone, "id" | "image">) => void
}

export const SmartphoneContext = createContext<SmartpoheContextType | undefined>(undefined)

export function SmartphoneProvider({ children }: ContextProviderProps) {
  const [smartphoneFormData, setSmartphoneFormData] = useState<Omit<Smartphone, "id" | "image">>({
    name: '',
    brand: '',
    views: 0,
    likes: 0,
    description: '',
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
        cardSlot: false,
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
        jack: {
          hasJackSlot: false,
          jackFeatures: '',
        },
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
  });

  // const [smartphoneForm, setSmartphoneForm] = useState()
  // const { data: smartphones, isLoading, error } = useQuery({
  //   queryFn: () => smartphoneService.getSmartphones(),
  //   queryKey: ["smartphones"],
  //   staleTime: 1000 * 60 * 1, // keeps data fresh for 1 minute
  //   refetchOnWindowFocus: false, // dont refetch on tab switch
  // })

  return (
    <SmartphoneContext value={{ smartphoneFormData, setSmartphoneFormData }}>
      {children}
    </SmartphoneContext>
  );
}

export function useSmartphone() {
  const context = useContext(SmartphoneContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
}