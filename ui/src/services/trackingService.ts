import { Tracking } from "../types"
import axios from "axios"

export async function saveTracking(
    name: string,
    duration: number
): Promise<Tracking> {
    try {
        const response = await axios.post("/trackings", { name, duration })
        return response.data
    } catch {
        throw new Error("Could not save tracking")
    }
}
