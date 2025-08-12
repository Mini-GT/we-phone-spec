import { useFetcher } from "react-router";

export function useAddViewToSmartphone() {
  const fetcher = useFetcher();

  return (deviceName: string, deviceId: string) => {
    fetcher.submit(
      { smartphoneViewId: deviceId },
      { 
        method: "post",
        action: `/smartphones/${deviceName}-${deviceId}`
      }
    )
  }
}