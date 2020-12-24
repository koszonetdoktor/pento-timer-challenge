/** @jsxImportSource @emotion/react */

import { Tracking } from "../types"

type Props = {
    trackings: Tracking[]
}

export default function TrackedTimeList({ trackings }: Props) {
    return (
        <div>
            <ul>
                {trackings.map((t) => (
                    <li key={t.id}>
                        <span>
                            {t.duration} {t.ts}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
