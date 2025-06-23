import mongoose, { type InferSchemaType } from 'mongoose';

const deviceSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    brand: {type: String, required: true, trim: true},
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    description: { type: String, required: true, default: "" }, 
    image: { type: String, required: true, default: "" },
    launch: {
      announced: { type: String, required: true, default: "" },
      released: { type: String, required: true, default: "" },
    },
    specs: {
        body: {
          dimensions: { type: String, required: true, default: "" },
          weight: { type: String, required: true, default: "" },
          build: { type: String, required: true, default: "" },
          sim: { type: String, required: true, default: "" },
          resistance: { type: String, required: true, default: "" },
        },
        display: {
          type: { type: String, required: true, default: "" },
          size: { type: String, required: true, default: "" },
          resolution: { type: String, required: true, default: "" },
          protection: { type: String, default: "" },
        },
        platform: {
          os: { type: String, required: true, default: "" },
          chipset: { type: String, required: true, default: "" },
          cpu: { type: String, required: true, default: "" },
          gpu: { type: String, required: true, default: "" },
        },
        memory: {
          cardSlot: { type: String, required: true, default: "" },
          internal: { type: String, required: true, default: "" },
        },
        camera: {
          main: {
            triple: { type: String, required: true, default: "" },
            features: { type: String, required: true, default: "" },
            video: { type: String, required: true, default: "" },
          },
          selfie: {
            single: { type: String, required: true, default: "" },
            features: { type: String, required: true, default: "" },
            video: { type: String, required: true, default: "" },
          },
        },
        sound: {
          loudspeaker: { type: String, required: true, default: "" },
          jack: { type: String, default: "" }
        },
        connection: {
          wlan: { type: String, required: true, default: "" },
          bluetooth: { type: String, required: true, default: "" },
          nfc: { type: String, required: true, default: "" },
          infraredPort: { type: String, required: true, default: "" },
          radio: { type: String, required: true, default: "" },
          USB: { type: String, required: true, default: "" },
        },
        features: {
          sensors: { type: String, required: true, default: "" },
        },
        battery: {
          type: { type: String, required: true, default: "" },
          charging: { type: String, required: true, default: "" },
        },
        misc: {
          colors: { type: String, required: true, default: "" },
          models: { type: String, required: true, default: "" },
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