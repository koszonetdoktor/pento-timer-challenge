/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { colors } from "../styles"

export default function Loading() {
    return (
        <div css={styles.root}>
            <div css={styles.spinner}></div>
        </div>
    )
}

const styles = {
    root: css`
        display: flex;
        justify-content: center;
    `,
    spinner: css`
        border: 8px solid ${colors.primary.light};
        border-radius: 50%;
        border-top: 8px solid ${colors.primary.dark};
        width: 80px;
        height: 80px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 1s linear infinite;

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `,
}
