/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import {
    endOfDay,
    endOfISOWeek,
    endOfMonth,
    isWithinInterval,
    startOfDay,
    startOfISOWeek,
    startOfMonth,
} from "date-fns"
import { useState } from "react"
import { colors, sizes } from "../../styles"
import { Tracking } from "../../types"
import { formatDate, formatReadableTime } from "../../utils"
import PeriodFilter, { Period } from "../PeriodFilter"

type Props = {
    trackings: Tracking[]
}

export default function TrackedTimeList({ trackings }: Props) {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>("day")

    const filteredTrackings = trackings.filter((t) => {
        const currentDate = new Date(t.ts)
        const todayDate = new Date()
        switch (selectedPeriod) {
            case "day":
                return isWithinInterval(currentDate, {
                    start: startOfDay(todayDate),
                    end: endOfDay(todayDate),
                })
            case "week":
                return isWithinInterval(currentDate, {
                    start: startOfISOWeek(todayDate),
                    end: endOfISOWeek(todayDate),
                })
            case "month":
                return isWithinInterval(currentDate, {
                    start: startOfMonth(todayDate),
                    end: endOfMonth(todayDate),
                })
            default:
                return false
        }
    })

    return (
        <div css={styles.root}>
            <PeriodFilter
                onChange={(period) => setSelectedPeriod(period)}
                value={selectedPeriod}
            />
            {filteredTrackings.length !== 0 ? (
                <ul css={styles.list} data-testid="tracking_list">
                    <li key="header" css={[styles.listItem, styles.header]}>
                        <span css={styles.cell.base}>Name</span>
                        <span css={[styles.cell.base, styles.cell.time]}>
                            Duration
                        </span>
                        <span css={[styles.cell.base, styles.cell.time]}>
                            Date
                        </span>
                    </li>
                    {filteredTrackings.map((t) => (
                        <li
                            key={t.id}
                            css={styles.listItem}
                            data-testid="tracking_listItem"
                        >
                            <span css={styles.cell.base}>{t.name}</span>
                            <span css={[styles.cell.base, styles.cell.time]}>
                                {formatReadableTime(t.duration)}
                            </span>
                            <span css={[styles.cell.base, styles.cell.time]}>
                                {formatDate(t.ts)}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p css={styles.emptyMsg}>No trackings in this period</p>
            )}
        </div>
    )
}

const styles = {
    root: css`
        padding: 0 ${sizes.space.m};
        height: 35vh;
        overflow-x: scroll;
    `,
    list: css`
        padding: 0;
        list-style: none;
        margin: 0;
        & li:nth-of-type(even) {
            background: ${colors.gray[900]};
        }
    `,
    listItem: css`
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: ${sizes.space.s} 0;
        border-radius: 5px;
    `,
    header: css`
        font-weight: 700;
    `,
    cell: {
        base: css`
            width: 30%;
        `,
        time: css`
            text-align: right;
        `,
    },
    emptyMsg: css`
        font-size: ${sizes.font.m};
    `,
}
