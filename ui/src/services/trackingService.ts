import { Tracking } from "../types"

export async function saveTracking(
    name: string,
    duration: number
): Promise<Tracking> {
    const response = await fetch("/trackings", {
        method: "POST",
        body: JSON.stringify({ name, duration }),
    })
    if (response.ok) return response.json()
    throw new Error("Could not save tracking")
}
