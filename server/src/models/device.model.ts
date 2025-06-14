import mongoose, { type InferSchemaType } from 'mongoose';

const deviceSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    brand: {type: String, required: true, trim: true},
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    description: {type: String, required: true},
    launch: {
      announced: {type: String, required: true},
      released: {type: String, required: true},
    },
    specs: {
        body: {
          dimensions: {type: String, required: true},
          weight: {type: String, required: true},
          build: {type: String, required: true},
          sim: {type: String, required: true},
          resistance: { type: String, default: "" },
        },
        display: {
          type: {type: String, required: true},
          size: {type: String, required: true},
          resolution: {type: String, required: true},
          protection: { type: String, default: "" },
        },
        platform: {
          os: {type: String, required: true},
          chipset: {type: String, required: true},
          cpu: {type: String, required: true},
          gpu: {type: String, required: true},
        },
        memory: {
          cardSlot: { type: Boolean, default: false },
          internal: {type: String, required: true},
        },
        camera: {
          main: {
            triple: {type: String, required: true},
            features: {type: String, required: true},
            video: {type: String, required: true},
          },
          selfie: {
            single: {type: String, required: true},
            features: {type: String, required: true},
            video: {type: String, required: true},
          },
        },
        sound: {
          loudspeaker: {type: String, required: true},
          jack: {
            hasJackSlot: {type: Boolean, default: false},
            jackFeatures: {type: String, required: true}
          },
        },
        connection: {
          wlan: {type: String, required: true},
          bluetooth: {type: String, required: true},
          nfc: { type: String, required: true },
          infraredPort: { type: Boolean, default: false },
          radio: { type: Boolean, default: false },
          USB: { type: String, required: true },
        },
        features: {
          sensors: { type: String, required: true },
        },
        battery: {
          type: {type: String, required: true},
          charging: { type: String, required: true },
        },
        misc: {
          colors: { type: String, required: true },
          models: {type: String, required: true},
        }
    },
}, { timestamps: true });

// indexes for better query performance
deviceSchema.index({ brand: 1 })
deviceSchema.index({ name: 1 })
deviceSchema.index({ views: -1 })
deviceSchema.index({ likes: -1 })

type Device = InferSchemaType<typeof deviceSchema>

export default mongoose.model<Device>('Device', deviceSchema);