import SmartphoneService from "~/services/smartphone.service";

const smartphoneService = new SmartphoneService()
export default async function incrementViewToSmartphone(deviceId: string) {
  return await smartphoneService.viewSmartphone(deviceId)
}