type LoginFormProps = {
  isLoginClicked: boolean;
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

export type {
  LoginFormProps,
  Smartphone,
  DeviceSpecProps,
  Specs,
  SpecItem
}