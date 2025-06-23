import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import type { ContextProviderProps, Smartphone } from "~/types/globals.type";
import smartphoneService from "~/services/smartphone.service";

type SmartpoheContextType = {
  smartphoneFormData: Smartphone
  setSmartphoneFormData: (device: Smartphone) => void
}

export const SmartphoneContext = createContext<SmartpoheContextType | undefined>(undefined)

export function SmartphoneProvider({ children }: ContextProviderProps) {
  const [smartphoneFormData, setSmartphoneFormData] = useState<Smartphone>({
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
  });

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