/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { sizes } from "../styles"
import { formatTime } from "../utils"
import Button from "./Button"

type Props = {
    value: number
    onChange: (value: number) => void
}

export default function Timer({ value, onChange }: Props) {
    const [time, setTime] = useState(0)
    const [counter, setCounter] = useState<NodeJS.Timeout | null>(null)

    useEffect(
        () => () => {
            if (counter) {
                clearInterval(counter)
            }
        },
        // eslint-disable-next-line
        []
    )

    const handleStartStop = () => {
        if (counter !== null) {
            clearInterval(counter)
            setCounter(null)
            onChange(time)
        } else {
            const ref = setInterval(() => {
                setTime((currentTime) => currentTime + 1)
            }, 1000)
            setCounter(ref)
        }
    }

    const handleReset = () => {
        setTime(0)
        onChange(0)
    }

    return (
        <div css={styles.root}>
            <div css={styles.timing}>{formatTime(time)}</div>
            <div css={styles.actionsContainer}>
                <Button onClick={handleStartStop} css={styles.button}>
                    {counter ? "Stop" : "Start"}
                </Button>
                <Button
                    onClick={handleReset}
                    disabled={value === 0 || counter !== null}
                    css={styles.button}
                >
                    Reset
                </Button>
            </div>
        </div>
    )
}

const styles = {
    root: css`
        display: flex;
        flex-direction: column;
    `,
    timing: css`
        font-size: ${sizes.font.xxl};
        text-align: center;
        padding: ${sizes.space.m} 0;
    `,
    button: css`
        margin: 0 ${sizes.space.m};
    `,
    actionsContainer: css`
        margin: auto;
    `,
}
