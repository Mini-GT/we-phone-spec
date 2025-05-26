import type { Dispatch, ReactNode, SetStateAction } from "react";

type LoginRegisterFormProps = {
  handleAuthMode: Dispatch<SetStateAction<"login" | "register" | "verify">>;
}

type Smartphone = {
  id: string;
  name: string;
  brand: string;
  views: number;
  likes: number;
  description: string;
  image: string;
  launch: {
    announced: string;
    released: string;
  };
  specs: Specs;
}

type Specs = {
  body: {
    dimensions: string;
    weight: string;
    build: string;
    sim: string;
    resistance: string;
  };
  display: {
    type: string;
    size: string;
    resolution: string;
    protection: string;
  };
  platform: {
    os: string;
    chipset: string;
    cpu: string;
    gpu: string;
  };
  memory: {
    cardSlot: boolean;
    internal: string;
  };
  camera: {
    main: {
      triple: string;
      features: string;
      video: string;
    };
    selfie: {
      single: string;
      features: string;
      video: string;
    };
  };
  sound: {
    loudspeaker: string;
    jack: string[]; // Empty if no headphone jack
  };
  connection: {
    wlan: string;
    bluetooth: string;
    nfc: boolean;
    infraredPort: boolean;
    radio: boolean;
    USB: string[];
  };
  features: {
    sensors: string[];
  };
  battery: {
    type: string;
    charging: string[];
  };
  misc: {
    colors: string[];
    models: string;
  };
}

type SpecItem = {
  label: string;
  value: string | boolean | string[] | undefined;
};

type DeviceSpecProps = {
  title: string;
  data: SpecItem[];
}

interface loginFormType {
  email: string;
  password: string;
}

interface RegisterFormType extends loginFormType {
  name: string;
  confirmPassword: string;
}

type ApiError = {
  message: string;
  statusCode?: number;
  error?: string;
}

type ContextProviderProps = {
  children: ReactNode;
}

type UserMenuProps = {
  name?: string,
  email: string
  profileImage?: string
  createdAt: string
  isVerified: boolean
}

type MenuNav = "profile" | "likelist" | "notificaton" | "settings"

export type {
  LoginRegisterFormProps,
  Smartphone,
  DeviceSpecProps,
  Specs,
  SpecItem,
  RegisterFormType,
  loginFormType,
  ApiError,
  ContextProviderProps,
  UserMenuProps,
  MenuNav
}