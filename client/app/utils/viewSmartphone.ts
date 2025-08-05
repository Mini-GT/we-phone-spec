import smartphoneService from "~/services/smartphone.service";

export default async function viewSmartphone(deviceId: string) {
  await smartphoneService.viewSmartphone(deviceId)
}