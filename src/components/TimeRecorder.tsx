import React, { Fragment, useState } from "react"
import Timer from "./Timer"
import Saver from "./Saver"
import { ProgressStates, Tracking } from "../types"
import { saveTracking } from "../services/trackingService"

type Props = {
    onRecorded: (tracking: Tracking) => void
}

export default function TimeRecorder({ onRecorded }: Props) {
    const [measuredTime, setMeasuredTime] = useState<number>(0)
    const [savingProgress, setSavingProgress] = useState<ProgressStates>(
        "ideal"
    )

    const handleSave = async (name: string) => {
        try {
            setSavingProgress("loading")
            const { id, ts } = await saveTracking(name, measuredTime)
            onRecorded({
                name,
                duration: measuredTime,
                id: `${Math.random()}`, //TODO from backend
                ts: Date.now(), //TODO from backend
            })
            setSavingProgress("ideal")
        } catch {
            setSavingProgress("error")
        }
    }

    return (
        <Fragment>
            <Timer
                value={measuredTime}
                onChange={(value: number) => setMeasuredTime(value)}
            />
            <Saver
                disabled={measuredTime === 0}
                savingProgress={savingProgress}
                onSave={handleSave}
            />
        </Fragment>
    )
}
