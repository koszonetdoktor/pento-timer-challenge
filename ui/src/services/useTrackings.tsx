import { useState, useEffect, useRef } from "react"
import { Tracking } from "../types"
import axios from "axios"

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
                const response = await axios.get("/trackings")
                if (isMounted.current) setTrackings(response.data)
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
