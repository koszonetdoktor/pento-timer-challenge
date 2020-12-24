import React, { Fragment, useState } from "react"
import Timer from "./Timer"
import Saver from "./Saver"

type Props = {
    onRecord: (name: string, time: number) => void
}

export default function TimeMeasure({ onRecord }: Props) {
    const [measuredTime, setMeasuredTime] = useState<number>(0)

    const handleSave = (name: string) => {
        onRecord(name, measuredTime)
    }

    return (
        <Fragment>
            <Timer
                value={measuredTime}
                onChange={(value: number) => setMeasuredTime(value)}
            />
            <Saver disabled={measuredTime === 0} onSaved={handleSave} />
        </Fragment>
    )
}
