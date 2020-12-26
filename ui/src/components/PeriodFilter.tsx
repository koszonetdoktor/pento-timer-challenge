/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { ChangeEvent } from "react"
import { colors, sizes } from "../styles"

export type Period = "day" | "week" | "month"

type Props = {
    value: string
    onChange: (selectedPeriod: Period) => void
}

export default function PeriodFilter({ value, onChange }: Props) {
    const periods: { period: Period; label: string }[] = [
        { period: "day", label: "Today" },
        { period: "week", label: "This week" },
        { period: "month", label: "This month" },
    ]

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Period)
    }

    return (
        <select
            onChange={handleChange}
            value={value}
            css={styles.root}
            data-testid="selector_period"
        >
            {periods.map((p) => (
                <option value={p.period} key={p.label}>
                    {p.label}
                </option>
            ))}
        </select>
    )
}

const styles = {
    root: css`
        border: 1px solid ${colors.primary.light};
        background: ${colors.gray[1000]};
        border-radius: 5px;
        color: ${colors.primary.light};
        font-size: ${sizes.font.m};
        outline: none;
        margin: ${sizes.space.s} 0;
        padding: ${sizes.space.xs} 0;
    `,
}
