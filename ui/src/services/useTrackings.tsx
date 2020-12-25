import { useState, useEffect, useRef } from "react"
import { Tracking } from "../types"

export function useTrackings(): {
    trackings: Tracking[]
    error: string | null
    loading: boolean
    addTracking: (newTracking: Tracking) => void
} {
    const isMounted = useRef(false)
    const [trackings, setTrackings] = useState<Tracking[]>([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        isMounted.current = true
        async function init() {
            try {
                const response = await fetch("/trackings")
                if (response.ok) {
                    const json = await response.json()
                    if (isMounted.current) setTrackings(json)
                } else {
                    throw response
                }
            } catch (err) {
                if (isMounted.current) setError(err)
            } finally {
                if (isMounted.current) setLoading(false)
            }
        }
        init()
        return () => {
            isMounted.current = false
        }
    }, [])

    function addTracking(newTracking: Tracking) {
        setTrackings((currentTrackings) => [newTracking, ...currentTrackings])
    }

    return { trackings, error, loading, addTracking }
}
