/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { ChangeEvent } from "react"
import { colors, sizes } from "../styles"

type Props = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    className?: string
}

export default function Input({ value, className, disabled, onChange }: Props) {
    return (
        <input
            value={value}
            onChange={onChange}
            css={disabled ? [styles.root, styles.disabled] : styles.root}
            disabled={disabled}
            className={className}
        />
    )
}

const styles = {
    root: css`
        border: 1px solid ${colors.primary.light};
        background: ${colors.gray[1000]};
        border-radius: 2rem;
        color: ${colors.primary.light};
        font-size: ${sizes.font.m};
        outline: none;
        text-indent: ${sizes.space.xs};
        padding: ${sizes.space.xs};
    `,
    disabled: css`
        border-color: ${colors.gray[500]};
        &:hover {
            cursor: default;
        }
    `,
}
