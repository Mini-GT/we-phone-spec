export const phones = [{
  id: "1",
  name: "Pixel 8 Pro",
  brand: "Google",
  views: 2304,
  likes: 300,
  description: "The Google Pixel 8 Pro is Google’s flagship smartphone with a 6.7-inch LTPO OLED display (up to 120Hz), powered by the custom Tensor G3 chip. It features a triple rear camera setup (including a 50MP main sensor), advanced AI photo/video tools, and runs the latest Android with 7 years of software updates. Built for premium performance, AI smarts, and top-tier camera quality.",
  image: "imgs/phones/pixel_8_pro.png",
  launch: {
    announced: "2023, October",
    released: "2023, October"
  },
  specs: {
    body: {
      dimensions: "162.6 x 76.5 x 8.8 mm",
      weight: "213 g",
      build: "Glass front (Gorilla Glass Victus 2), aluminum frame",
      sim: "Nano-SIM and eSIM",
      resistance: "IP68 dust/water resistant",
    },
    display: {
      type: "LTPO OLED",
      size: "6.7 inches",
      resolution: "1344 x 2992 pixels",
      protection: "Corning Gorilla Glass Victus 2",
    },
    platform: {
      os: "Android 14",
      chipset: "Google Tensor G3",
      cpu: "9-core",
      gpu: "Immortalis-G715s MC10",
    },
    memory: {
      cardSlot: false,
      internal: "128GB 12GB RAM",
    },
    camera: {
      main: {
        triple: "50 MP + 48 MP + 48 MP",
        features: "Dual-LED flash, Pixel Shift, Auto-HDR, panorama",
        video: "4K@30/60fps",
      },
      selfie: {
        single: "10.5 MP",
        features: "Auto-HDR",
        video: "4K@30fps",
      },
    },
    sound: {
      loudspeaker: "Yes, with stereo speakers",
      jack: [],
    },
    connection: {
      wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e/7",
      bluetooth: "5.3",
      nfc: true,
      infraredPort: false,
      radio: false,
      USB: ["USB Type-C 3.2"],
    },
    features: {
      sensors: ["Fingerprint", "Accelerometer", "Gyro", "Proximity", "Compass"],
    },
    battery: {
      type: "Li-Ion 5050 mAh",
      charging: ["Fast charging 30W", "Wireless charging 23W"],
    },
    misc: {
      colors: ["Obsidian", "Porcelain", "Bay"],
      models: "GC3VE, G1MNW",
    }
  }
},{
  id: "2",
  name: "Galaxy S25",
  brand: "Samsung",
  views: 5914,
  likes: 1012,
  description: "The Samsung Galaxy S25 is Samsung’s 2025 flagship with a 6.2-inch AMOLED 120Hz display, powered by the Snapdragon 8 Gen 4 (aka Snapdragon 8 Elite). It features a triple camera setup with a 50MP main sensor, improved AI features, and a 4,000mAh battery. It runs One UI 7 based on Android 15 and delivers high performance in a compact design.",
  image: "imgs/phones/samsung_s25.png",
  launch: {
    announced: "2024, January 17",
    released: "2024, January 31"
  },
  specs: {
    body: {
      dimensions: "162.3 x 79 x 8.6 mm",
      weight: "232 g",
      build: "Glass front (Gorilla Glass Victus 2), titanium frame",
      sim: "Nano-SIM and eSIM or Dual SIM",
      resistance: "IP68 dust/water resistant"
    },
    display: {
      type: "Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, 2600 nits",
      size: "6.8 inches",
      resolution: "1440 x 3120 pixels",
      protection: "Corning Gorilla Glass Armor"
    },
    platform: {
      os: "Android 14, One UI 6.1",
      chipset: "Qualcomm SM8650-AC Snapdragon 8 Gen 3 (4 nm)",
      cpu: "Octa-core (1x3.39 GHz Cortex-X4 & 5x3.1 GHz & 2x2.2 GHz)",
      gpu: "Adreno 750"
    },
    memory: {
      cardSlot: false,
      internal: "256GB 12GB RAM"
    },
    camera: {
      main: {
        triple: "200 MP (wide) + 50 MP (periscope telephoto) + 12 MP (ultrawide)",
        features: "PDAF, Laser AF, OIS",
        video: "8K@24/30fps, 4K@30/60fps"
      },
      selfie: {
        single: "12 MP",
        features: "Dual Pixel PDAF",
        video: "4K@30/60fps"
      }
    },
    sound: {
      loudspeaker: "Yes, with stereo speakers",
      jack: []
    },
    connection: {
      wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e/7",
      bluetooth: "5.3, A2DP, LE",
      nfc: true,
      infraredPort: false,
      radio: false,
      USB: ["USB Type-C 3.2", "DisplayPort"]
    },
    features: {
      sensors: ["Fingerprint (under display)", "accelerometer", "gyro", "proximity", "barometer", "compass"]
    },
    battery: {
      type: "Li-Ion 5000 mAh, non-removable",
      charging: ["45W wired", "15W wireless", "4.5W reverse wireless"]
    },
    misc: {
      colors: ["Titanium Black", "Titanium Gray", "Titanium Violet"],
      models: "SM-S928B, SM-S928U, SM-S928W"
    }
  }
}, {
  id: "3",
  name: "iPhone 16 Pro",
  brand: "Apple",
  views: 7561,
  likes: 4402,
  description: "iPhone 15 Pro Max features a Grade 5 titanium design with a new, refined microblasted texture. Titanium has one of the highest strength-to-weight ratios of any metal, making these models incredibly strong and impressively light. iPhone 16 Pro comes in four stunning finishes — including new Desert Titanium.",
  image: "imgs/phones/iphone_16_pro.png",
  launch: {
    announced: "2023, September 12",
    released: "2023, September 22"
  },
  specs: {
    body: {
      dimensions: "159.9 x 76.7 x 8.3 mm",
      weight: "221 g",
      build: "Titanium frame, Ceramic Shield glass",
      sim: "Nano-SIM and eSIM / Dual eSIM",
      resistance: "IP68 dust/water resistant"
    },
    display: {
      type: "LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision",
      size: "6.7 inches",
      resolution: "1290 x 2796 pixels",
      protection: ""
    },
    platform: {
      os: "iOS 17",
      chipset: "Apple A17 Pro (3 nm)",
      cpu: "Hexa-core (2x3.78 GHz + 4x2.11 GHz)",
      gpu: "Apple GPU (6-core)"
    },
    memory: {
      cardSlot: false,
      internal: "256GB 8GB RAM"
    },
    camera: {
      main: {
        triple: "48 MP (wide) + 12 MP (periscope telephoto) + 12 MP (ultrawide)",
        features: "Dual pixel PDAF, sensor-shift OIS",
        video: "4K@24/25/30/60fps"
      },
      selfie: {
        single: "12 MP",
        features: "HDR, Cinematic mode",
        video: "4K@24/25/30/60fps"
      }
    },
    sound: {
      loudspeaker: "Yes, with stereo speakers",
      jack: []
    },
    connection: {
      wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e",
      bluetooth: "5.3, A2DP, LE",
      nfc: true,
      infraredPort: false,
      radio: false,
      USB: ["USB Type-C 3.0"]
    },
    features: {
      sensors: ["Face ID", "accelerometer", "gyro", "proximity", "barometer"]
    },
    battery: {
      type: "Li-Ion 4441 mAh, non-removable",
      charging: ["20W wired", "15W MagSafe wireless"]
    },
    misc: {
      colors: ["Black Titanium", "White Titanium", "Blue Titanium"],
      models: "A2849, A3105, A3106"
    }
  }
}, {
  id: "4",
  name: "iPhone 15 Pro Max",
  brand: "Apple",
  views: 751,
  likes: 402,
  description: "The iPhone 15 Pro Max is Apple’s top-tier phone with a 6.7-inch Super Retina XDR display and a lightweight titanium frame. It runs on the powerful A17 Pro chip, supports advanced gaming and graphics, and features a triple camera system with a new 5x telephoto zoom. It also uses USB-C, has improved battery life, and offers top performance with iOS.",
  image: "imgs/phones/iphone_15_proMax.png",
  launch: {
    announced: "2023, September 12",
    released: "2023, September 22"
  },
  specs: {
    body: {
      dimensions: "159.9 x 76.7 x 8.3 mm",
      weight: "221 g",
      build: "Titanium frame, Ceramic Shield glass",
      sim: "Nano-SIM and eSIM / Dual eSIM",
      resistance: "IP68 dust/water resistant"
    },
    display: {
      type: "LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision",
      size: "6.7 inches",
      resolution: "1290 x 2796 pixels",
      protection: ""
    },
    platform: {
      os: "iOS 17",
      chipset: "Apple A17 Pro (3 nm)",
      cpu: "Hexa-core (2x3.78 GHz + 4x2.11 GHz)",
      gpu: "Apple GPU (6-core)"
    },
    memory: {
      cardSlot: false,
      internal: "256GB 8GB RAM"
    },
    camera: {
      main: {
        triple: "48 MP (wide) + 12 MP (periscope telephoto) + 12 MP (ultrawide)",
        features: "Dual pixel PDAF, sensor-shift OIS",
        video: "4K@24/25/30/60fps"
      },
      selfie: {
        single: "12 MP",
        features: "HDR, Cinematic mode",
        video: "4K@24/25/30/60fps"
      }
    },
    sound: {
      loudspeaker: "Yes, with stereo speakers",
      jack: []
    },
    connection: {
      wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e",
      bluetooth: "5.3, A2DP, LE",
      nfc: true,
      infraredPort: false,
      radio: false,
      USB: ["USB Type-C 3.0"]
    },
    features: {
      sensors: ["Face ID", "accelerometer", "gyro", "proximity", "barometer"]
    },
    battery: {
      type: "Li-Ion 4441 mAh, non-removable",
      charging: ["20W wired", "15W MagSafe wireless"]
    },
    misc: {
      colors: ["Black Titanium", "White Titanium", "Blue Titanium"],
      models: "A2849, A3105, A3106"
    }
  }
}, {
  id: "5",
  name: "Poco F3",
  brand: "Xiaomi",
  views: 3189,
  likes: 4802,
  description: "BEAST-LIKE PERFORMANCE. With flagship 7nm process technology, the performance has been massively improved. When watching videos, playing games or surfing the webs, the processor will be one step ahead, letting you enjoy the new generation of speed.",
  image: "imgs/phones/poco_f3.png",
  launch: {
    announced: "2021, March 22",
    released: "2021, March 27"
  },
  specs: {
    body: {
      dimensions: "163.7 x 76.4 x 7.8 mm (6.44 x 3.01 x 0.31 in)",
      weight: "196 g (6.91 oz)",
      build: "Glass front (Gorilla Glass 5), glass back (Gorilla Glass 5), plastic frame",
      sim: "Nano-SIM + Nano-SIM",
      resistance: "IP53 dust protected and water resistant"
    },
    display: {
      type: "AMOLED, 120Hz, HDR10+, 1300 nits (peak)",
      size: "6.67 inches",
      resolution: "1080 x 2400 pixels",
      protection: "Corning Gorilla Glass 5"
    },
    platform: {
      os: "Android 11, HyperOS",
      chipset: "Qualcomm SM8250-AC Snapdragon 870 5G (7 nm)",
      cpu: "Octa-core (1x3.2 GHz Kryo 585 & 3x2.42 GHz Kryo 585 & 4x1.80 GHz Kryo 585)",
      gpu: "Adreno 650"
    },
    memory: {
      cardSlot: false,
      internal: "Adreno 650"
    },
    camera: {
      main: {
        triple: "48 MP (wide) + 12 MP (periscope telephoto) + 12 MP (ultrawide)",
        features: "Dual pixel PDAF, sensor-shift OIS",
        video: "4K@24/25/30/60fps"
      },
      selfie: {
        single: "12 MP",
        features: "HDR, Cinematic mode",
        video: "4K@24/25/30/60fps"
      }
    },
    sound: {
      loudspeaker: "Yes, with stereo speakers",
      jack: []
    },
    connection: {
      wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e",
      bluetooth: "5.3, A2DP, LE",
      nfc: true,
      infraredPort: false,
      radio: false,
      USB: ["USB Type-C 3.0"]
    },
    features: {
      sensors: ["Face ID", "accelerometer", "gyro", "proximity", "barometer"]
    },
    battery: {
      type: "Li-Ion 4441 mAh, non-removable",
      charging: ["20W wired", "15W MagSafe wireless"]
    },
    misc: {
      colors: ["Black Titanium", "White Titanium", "Blue Titanium"],
      models: "A2849, A3105, A3106"
    }
  }
}, {
  id: "6",
  name: "Pixel 8 Pro",
  brand: "Google",
  views: 2704,
  likes: 500,
  description: "The Google Pixel 8 Pro is Google’s flagship smartphone with a 6.7-inch LTPO OLED display (up to 120Hz), powered by the custom Tensor G3 chip. It features a triple rear camera setup (including a 50MP main sensor), advanced AI photo/video tools, and runs the latest Android with 7 years of software updates. Built for premium performance, AI smarts, and top-tier camera quality.",
  image: "imgs/phones/pixel_8_pro.png",
  launch: {
    announced: "2023, October",
    released: "2023, October"
  },
  specs: {
    body: {
      dimensions: "162.6 x 76.5 x 8.8 mm",
      weight: "213 g",
      build: "Glass front (Gorilla Glass Victus 2), aluminum frame",
      sim: "Nano-SIM and eSIM",
      resistance: "IP68 dust/water resistant",
    },
    display: {
      type: "LTPO OLED",
      size: "6.7 inches",
      resolution: "1344 x 2992 pixels",
      protection: "Corning Gorilla Glass Victus 2",
    },
    platform: {
      os: "Android 14",
      chipset: "Google Tensor G3",
      cpu: "9-core",
      gpu: "Immortalis-G715s MC10",
    },
    memory: {
      cardSlot: false,
      internal: "128GB 12GB RAM",
    },
    camera: {
      main: {
        triple: "50 MP + 48 MP + 48 MP",
        features: "Dual-LED flash, Pixel Shift, Auto-HDR, panorama",
        video: "4K@30/60fps",
      },
      selfie: {
        single: "10.5 MP",
        features: "Auto-HDR",
        video: "4K@30fps",
      },
    },
    sound: {
      loudspeaker: "Yes, with stereo speakers",
      jack: [],
    },
    connection: {
      wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e/7",
      bluetooth: "5.3",
      nfc: true,
      infraredPort: false,
      radio: false,
      USB: ["USB Type-C 3.2"],
    },
    features: {
      sensors: ["Fingerprint", "Accelerometer", "Gyro", "Proximity", "Compass"],
    },
    battery: {
      type: "Li-Ion 5050 mAh",
      charging: ["Fast charging 30W", "Wireless charging 23W"],
    },
    misc: {
      colors: ["Obsidian", "Porcelain", "Bay"],
      models: "GC3VE, G1MNW",
    }
  }
},{
  id: "7",
  name: "Galaxy S25 | S25+",
  brand: "Samsung",
  views: 8914,
  likes: 2012,
  description: "Meet Galaxy S25 and S25+, the ultimate form of Galaxy Ultra with a new titanium exterior and a 6.8\" flat display.6,7 It's an absolute marvel of design.",
  image: "imgs/phones/samsung_s25.png",
  launch: {
    announced: "2024, January 17",
    released: "2024, January 31"
  },
  specs: {
    body: {
      dimensions: "162.3 x 79 x 8.6 mm",
      weight: "232 g",
      build: "Glass front (Gorilla Glass Victus 2), titanium frame",
      sim: "Nano-SIM and eSIM or Dual SIM",
      resistance: "IP68 dust/water resistant"
    },
    display: {
      type: "Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, 2600 nits",
      size: "6.8 inches",
      resolution: "1440 x 3120 pixels",
      protection: "Corning Gorilla Glass Armor"
    },
    platform: {
      os: "Android 14, One UI 6.1",
      chipset: "Qualcomm SM8650-AC Snapdragon 8 Gen 3 (4 nm)",
      cpu: "Octa-core (1x3.39 GHz Cortex-X4 & 5x3.1 GHz & 2x2.2 GHz)",
      gpu: "Adreno 750"
    },
    memory: {
      cardSlot: false,
      internal: "256GB 12GB RAM"
    },
    camera: {
      main: {
        triple: "200 MP (wide) + 50 MP (periscope telephoto) + 12 MP (ultrawide)",
        features: "PDAF, Laser AF, OIS",
        video: "8K@24/30fps, 4K@30/60fps"
      },
      selfie: {
        single: "12 MP",
        features: "Dual Pixel PDAF",
        video: "4K@30/60fps"
      }
    },
    sound: {
      loudspeaker: "Yes, with stereo speakers",
      jack: []
    },
    connection: {
      wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e/7",
      bluetooth: "5.3, A2DP, LE",
      nfc: true,
      infraredPort: false,
      radio: false,
      USB: ["USB Type-C 3.2", "DisplayPort"]
    },
    features: {
      sensors: ["Fingerprint (under display)", "accelerometer", "gyro", "proximity", "barometer", "compass"]
    },
    battery: {
      type: "Li-Ion 5000 mAh, non-removable",
      charging: ["45W wired", "15W wireless", "4.5W reverse wireless"]
    },
    misc: {
      colors: ["Titanium Black", "Titanium Gray", "Titanium Violet"],
      models: "SM-S928B, SM-S928U, SM-S928W"
    }
  }
}, {
  id: "8",
  name: "iPhone 16 Pro",
  brand: "Apple",
  views: 9151,
  likes: 3202,
  description: "iPhone 15 Pro Max features a Grade 5 titanium design with a new, refined microblasted texture. Titanium has one of the highest strength-to-weight ratios of any metal, making these models incredibly strong and impressively light. iPhone 16 Pro comes in four stunning finishes — including new Desert Titanium.",
  image: "imgs/phones/iphone_16_pro.png",
  launch: {
    announced: "2023, September 12",
    released: "2023, September 22"
  },
  specs: {
    body: {
      dimensions: "159.9 x 76.7 x 8.3 mm",
      weight: "221 g",
      build: "Titanium frame, Ceramic Shield glass",
      sim: "Nano-SIM and eSIM / Dual eSIM",
      resistance: "IP68 dust/water resistant"
    },
    display: {
      type: "LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision",
      size: "6.7 inches",
      resolution: "1290 x 2796 pixels",
      protection: ""
    },
    platform: {
      os: "iOS 17",
      chipset: "Apple A17 Pro (3 nm)",
      cpu: "Hexa-core (2x3.78 GHz + 4x2.11 GHz)",
      gpu: "Apple GPU (6-core)"
    },
    memory: {
      cardSlot: false,
      internal: "256GB 8GB RAM"
    },
    camera: {
      main: {
        triple: "48 MP (wide) + 12 MP (periscope telephoto) + 12 MP (ultrawide)",
        features: "Dual pixel PDAF, sensor-shift OIS",
        video: "4K@24/25/30/60fps"
      },
      selfie: {
        single: "12 MP",
        features: "HDR, Cinematic mode",
        video: "4K@24/25/30/60fps"
      }
    },
    sound: {
      loudspeaker: "Yes, with stereo speakers",
      jack: []
    },
    connection: {
      wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e",
      bluetooth: "5.3, A2DP, LE",
      nfc: true,
      infraredPort: false,
      radio: false,
      USB: ["USB Type-C 3.0"]
    },
    features: {
      sensors: ["Face ID", "accelerometer", "gyro", "proximity", "barometer"]
    },
    battery: {
      type: "Li-Ion 4441 mAh, non-removable",
      charging: ["20W wired", "15W MagSafe wireless"]
    },
    misc: {
      colors: ["Black Titanium", "White Titanium", "Blue Titanium"],
      models: "A2849, A3105, A3106"
    }
  }
}, {
  id: "9",
  name: "iPhone 15 Pro Max",
  brand: "Apple",
  views: 7311,
  likes: 4602,
  description: "The iPhone 15 Pro Max is Apple’s top-tier phone with a 6.7-inch Super Retina XDR display and a lightweight titanium frame. It runs on the powerful A17 Pro chip, supports advanced gaming and graphics, and features a triple camera system with a new 5x telephoto zoom. It also uses USB-C, has improved battery life, and offers top performance with iOS.",
  image: "imgs/phones/iphone_15_proMax.png",
  launch: {
    announced: "2023, September 12",
    released: "2023, September 22"
  },
  specs: {
    body: {
      dimensions: "159.9 x 76.7 x 8.3 mm",
      weight: "221 g",
      build: "Titanium frame, Ceramic Shield glass",
      sim: "Nano-SIM and eSIM / Dual eSIM",
      resistance: "IP68 dust/water resistant"
    },
    display: {
      type: "LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision",
      size: "6.7 inches",
      resolution: "1290 x 2796 pixels",
      protection: ""
    },
    platform: {
      os: "iOS 17",
      chipset: "Apple A17 Pro (3 nm)",
      cpu: "Hexa-core (2x3.78 GHz + 4x2.11 GHz)",
      gpu: "Apple GPU (6-core)"
    },
    memory: {
      cardSlot: false,
      internal: "256GB 8GB RAM"
    },
    camera: {
      main: {
        triple: "48 MP (wide) + 12 MP (periscope telephoto) + 12 MP (ultrawide)",
        features: "Dual pixel PDAF, sensor-shift OIS",
        video: "4K@24/25/30/60fps"
      },
      selfie: {
        single: "12 MP",
        features: "HDR, Cinematic mode",
        video: "4K@24/25/30/60fps"
      }
    },
    sound: {
      loudspeaker: "Yes, with stereo speakers",
      jack: []
    },
    connection: {
      wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e",
      bluetooth: "5.3, A2DP, LE",
      nfc: true,
      infraredPort: false,
      radio: false,
      USB: ["USB Type-C 3.0"]
    },
    features: {
      sensors: ["Face ID", "accelerometer", "gyro", "proximity", "barometer"]
    },
    battery: {
      type: "Li-Ion 4441 mAh, non-removable",
      charging: ["20W wired", "15W MagSafe wireless"]
    },
    misc: {
      colors: ["Black Titanium", "White Titanium", "Blue Titanium"],
      models: "A2849, A3105, A3106"
    }
  }
}, {
  id: "10",
  name: "Poco F3",
  brand: "Xiaomi",
  views: 3789,
  likes: 202,
  description: "BEAST-LIKE PERFORMANCE. With flagship 7nm process technology, the performance has been massively improved. When watching videos, playing games or surfing the webs, the processor will be one step ahead, letting you enjoy the new generation of speed.",
  image: "imgs/phones/poco_f3.png",
  launch: {
    announced: "2021, March 22",
    released: "2021, March 27"
  },
  specs: {
    body: {
      dimensions: "163.7 x 76.4 x 7.8 mm (6.44 x 3.01 x 0.31 in)",
      weight: "196 g (6.91 oz)",
      build: "Glass front (Gorilla Glass 5), glass back (Gorilla Glass 5), plastic frame",
      sim: "Nano-SIM + Nano-SIM",
      resistance: "IP53 dust protected and water resistant"
    },
    display: {
      type: "AMOLED, 120Hz, HDR10+, 1300 nits (peak)",
      size: "6.67 inches",
      resolution: "1080 x 2400 pixels",
      protection: "Corning Gorilla Glass 5"
    },
    platform: {
      os: "Android 11, HyperOS",
      chipset: "Qualcomm SM8250-AC Snapdragon 870 5G (7 nm)",
      cpu: "Octa-core (1x3.2 GHz Kryo 585 & 3x2.42 GHz Kryo 585 & 4x1.80 GHz Kryo 585)",
      gpu: "Adreno 650"
    },
    memory: {
      cardSlot: false,
      internal: "Adreno 650"
    },
    camera: {
      main: {
        triple: "48 MP (wide) + 12 MP (periscope telephoto) + 12 MP (ultrawide)",
        features: "Dual pixel PDAF, sensor-shift OIS",
        video: "4K@24/25/30/60fps"
      },
      selfie: {
        single: "12 MP",
        features: "HDR, Cinematic mode",
        video: "4K@24/25/30/60fps"
      }
    },
    sound: {
      loudspeaker: "Yes, with stereo speakers",
      jack: []
    },
    connection: {
      wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e",
      bluetooth: "5.3, A2DP, LE",
      nfc: true,
      infraredPort: false,
      radio: false,
      USB: ["USB Type-C 3.0"]
    },
    features: {
      sensors: ["Face ID", "accelerometer", "gyro", "proximity", "barometer"]
    },
    battery: {
      type: "Li-Ion 4441 mAh, non-removable",
      charging: ["20W wired", "15W MagSafe wireless"]
    },
    misc: {
      colors: ["Black Titanium", "White Titanium", "Blue Titanium"],
      models: "A2849, A3105, A3106"
    }
  }
}, {
  id: "11",
  name: "Pixel 8 Pro",
  brand: "Google",
  views: 2604,
  likes: 1800,
  description: "The Google Pixel 8 Pro is Google’s flagship smartphone with a 6.7-inch LTPO OLED display (up to 120Hz), powered by the custom Tensor G3 chip. It features a triple rear camera setup (including a 50MP main sensor), advanced AI photo/video tools, and runs the latest Android with 7 years of software updates. Built for premium performance, AI smarts, and top-tier camera quality.",
  image: "imgs/phones/pixel_8_pro.png",
  launch: {
    announced: "2023, October",
    released: "2023, October"
  },
  specs: {
    body: {
      dimensions: "162.6 x 76.5 x 8.8 mm",
      weight: "213 g",
      build: "Glass front (Gorilla Glass Victus 2), aluminum frame",
      sim: "Nano-SIM and eSIM",
      resistance: "IP68 dust/water resistant",
    },
    display: {
      type: "LTPO OLED",
      size: "6.7 inches",
      resolution: "1344 x 2992 pixels",
      protection: "Corning Gorilla Glass Victus 2",
    },
    platform: {
      os: "Android 14",
      chipset: "Google Tensor G3",
      cpu: "9-core",
      gpu: "Immortalis-G715s MC10",
    },
    memory: {
      cardSlot: false,
      internal: "128GB 12GB RAM",
    },
    camera: {
      main: {
        triple: "50 MP + 48 MP + 48 MP",
        features: "Dual-LED flash, Pixel Shift, Auto-HDR, panorama",
        video: "4K@30/60fps",
      },
      selfie: {
        single: "10.5 MP",
        features: "Auto-HDR",
        video: "4K@30fps",
      },
    },
    sound: {
      loudspeaker: "Yes, with stereo speakers",
      jack: [],
    },
    connection: {
      wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e/7",
      bluetooth: "5.3",
      nfc: true,
      infraredPort: false,
      radio: false,
      USB: ["USB Type-C 3.2"],
    },
    features: {
      sensors: ["Fingerprint", "Accelerometer", "Gyro", "Proximity", "Compass"],
    },
    battery: {
      type: "Li-Ion 5050 mAh",
      charging: ["Fast charging 30W", "Wireless charging 23W"],
    },
    misc: {
      colors: ["Obsidian", "Porcelain", "Bay"],
      models: "GC3VE, G1MNW",
    }
  }
}]