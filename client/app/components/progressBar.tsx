import { useEffect, useState } from "react";

type ProgressBarProps = {
  isPending: boolean 
}

export default function ProgressBar({ isPending }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const triggerNavigationProgress = () => {
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setProgress(0)
          }, 300)
          return 100
        }
        return isPending ? prev + Math.random() * 25 : 100
      })
    }, 200)
  }

  useEffect(() => {
    triggerNavigationProgress()
  }, [isPending])

  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <div
        className="h-0.5 bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}