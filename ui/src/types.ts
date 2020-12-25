export type Tracking = {
    id: string
    name: string
    duration: number
    ts: number
}

export type ProgressStates = "ideal" | "loading" | "error"
