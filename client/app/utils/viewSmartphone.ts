import smartphoneService from "~/services/smartphone.service";

export default async function incrementViewToSmartphone(deviceId: string) {
  return await smartphoneService.viewSmartphone(deviceId)
}