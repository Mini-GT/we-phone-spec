import mongoose, { type InferSchemaType } from 'mongoose';

const deviceSchema = new mongoose.Schema({
    stats: {
      today: { type: Number, default: 0 },
      week: { type: Number, default: 0 },
      month: { type: Number, default: 0 },
      lastReset: {
        today: { type: Date, default: null },
        week: { type: Date, default: null },
        month: { type: Date, default: null },
      },
    },
    name: {type: String, trim: true},
    brand: {type: String, trim: true},
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    description: { type: String, default: "" }, 
    image: { type: String, default: "" },
    launch: {
      announced: { type: String, default: "" },
      released: { type: String, default: "" },
    },
    specs: {
        body: {
          dimensions: { type: String, default: "" },
          weight: { type: String, default: "" },
          build: { type: String, default: "" },
          sim: { type: String, default: "" },
          resistance: { type: String, default: "" },
        },
        display: {
          type: { type: String, default: "" },
          size: { type: String, default: "" },
          resolution: { type: String, default: "" },
          protection: { type: String, default: "" },
        },
        platform: {
          os: { type: String, default: "" },
          chipset: { type: String, default: "" },
          cpu: { type: String, default: "" },
          gpu: { type: String, default: "" },
        },
        memory: {
          cardSlot: { type: String, default: "" },
          internal: { type: String, default: "" },
        },
        camera: {
          main: {
            triple: { type: String, default: "" },
            features: { type: String, default: "" },
            video: { type: String, default: "" },
          },
          selfie: {
            single: { type: String, default: "" },
            features: { type: String, default: "" },
            video: { type: String, default: "" },
          },
        },
        sound: {
          loudspeaker: { type: String, default: "" },
          jack: { type: String, default: "" }
        },
        connection: {
          wlan: { type: String, default: "" },
          bluetooth: { type: String, default: "" },
          nfc: { type: String, default: "" },
          infraredPort: { type: String, default: "" },
          radio: { type: String, default: "" },
          USB: { type: String, default: "" },
        },
        features: {
          sensors: { type: String, default: "" },
        },
        battery: {
          type: { type: String, default: "" },
          charging: { type: String, default: "" },
        },
        misc: {
          colors: { type: String, default: "" },
          models: { type: String, default: "" },
        }
    },
}, { timestamps: true });

// indexes for better query performance
deviceSchema.index({ brand: 1 })
deviceSchema.index({ name: 1 })
deviceSchema.index({ views: -1 })
deviceSchema.index({ likes: -1 })
deviceSchema.index({ "stats.today": 1 })
deviceSchema.index({ "stats.week": 1 })
deviceSchema.index({ "stats.month": 1 })

type Device = InferSchemaType<typeof deviceSchema>

export default mongoose.model<Device>('Device', deviceSchema);