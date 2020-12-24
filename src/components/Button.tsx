/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { colors, sizes } from "../styles"

type Props = {
    children: string
    onClick: () => void
    disabled?: boolean
    className?: string
}

export default function Button({
    children,
    className,
    disabled,
    onClick,
}: Props) {
    return (
        <button
            onClick={disabled ? undefined : onClick}
            css={disabled ? [styles.root, styles.disabled] : styles.root}
            className={className}
        >
            {children}
        </button>
    )
}

const styles = {
    root: css`
        background-color: ${colors.primary.light};
        color: ${colors.primary.dark};
        border: solid 1px transparent;
        font-size: ${sizes.font.l};
        padding: ${sizes.space.xs} ${sizes.space.s};
        font-weight: 600;
        transition: all 0.2s ease;
        transition-property: color, background-color;
        border-radius: 2rem;
        &:focus {
            outline: none;
        }
        &:hover {
            background-color: ${colors.primary.main};
            cursor: pointer;
        }
    `,
    disabled: css`
        background-color: ${colors.gray.main};
        &:hover {
            cursor: default;
            background-color: ${colors.gray.main};
        }
    `,
}
