import deviceModel from "@/models/device.model"

const changeDeviceStats = async (deviceId: string) => {
  try {
    const device = await deviceModel.findById(deviceId)
    if (!device || !device.stats || !device.stats.lastReset) return

    const now: Date = new Date()
    const resetHour = 4

    const isTodayReset = () => {
      const last = new Date(device.stats?.lastReset?.today || 0)
      const isNewDay = now.toDateString() !== last.toDateString()
      const isPastResetHour = now.getHours() >= resetHour
      return isNewDay && isPastResetHour
    }

    const isWeekReset = () => {
      const last = new Date(device.stats?.lastReset?.week || 0)
      const diffDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
      return Math.floor(diffDays) >= 7
    }

    const isMontReset = () => {
      const last = new Date(device.stats?.lastReset?.month || 0)
      return now.getMonth() !== last.getMonth() || now.getFullYear() !== last.getFullYear()
    }

    // reset
    if (isTodayReset()) {
      device.stats.today = 0
      device.stats.lastReset.today = now
    }

    if (isWeekReset()) {
      device.stats.week = 0
      device.stats.lastReset.week = now
    }

    if (isMontReset()) {
      device.stats.month = 0
      device.stats.lastReset.month = now
    }

    // increment device stats
    device.stats.today += 1
    device.stats.week += 1
    device.stats.month += 1
    device.views += 1

    await device.save()
  } catch (error) {
    if(error){
      console.log(error)
    }
  }
}

export {
  changeDeviceStats
}