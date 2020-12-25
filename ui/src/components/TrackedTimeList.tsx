/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { useState } from "react"
import { colors, sizes } from "../styles"
import { Tracking } from "../types"
import { formatDate, formatReadableTime } from "../utils"
import PeriodFilter, { Period } from "./PeriodFilter"

type Props = {
    trackings: Tracking[]
}

export default function TrackedTimeList({ trackings }: Props) {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>("day")

    return (
        <div css={styles.root}>
            <PeriodFilter
                onChange={(period) => setSelectedPeriod(period)}
                value={selectedPeriod}
            />
            <ul css={styles.list}>
                <li key="header" css={[styles.listItem, styles.header]}>
                    <span css={styles.cell.base}>Name</span>
                    <span css={[styles.cell.base, styles.cell.time]}>
                        Duration
                    </span>
                    <span css={[styles.cell.base, styles.cell.time]}>Date</span>
                </li>
                {trackings.map((t) => (
                    <li key={t.id} css={styles.listItem}>
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
}
