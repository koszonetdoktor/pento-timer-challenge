/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { sizes } from "../styles"
import { addLeadingZero } from "../utils"
import Button from "./Button"

export default function Timer() {
    const [time, setTime] = useState<number>(0)
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
        } else {
            const ref = setInterval(() => {
                setTime((currentTime) => currentTime + 1)
            }, 10)
            setCounter(ref)
        }
    }

    const handleReset = () => {
        setTime(0)
    }

    const hour = Math.floor(time / 60 / 60)
    const min = Math.floor(time / 60) - 60 * hour
    const sec = time - min * 60 - hour * 60 * 60

    return (
        <div css={styles.root}>
            <div css={styles.timing}>{`${addLeadingZero(
                hour
            )} : ${addLeadingZero(min)} : ${addLeadingZero(sec)}`}</div>
            <div css={styles.actionsContainer}>
                <Button onClick={handleStartStop} css={styles.button}>
                    {counter ? "Stop" : "Start"}
                </Button>
                <Button
                    onClick={handleReset}
                    disabled={time !== 0 && counter !== null}
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
        padding: ${sizes.space.l} 0;
    `,
    button: css`
        margin: 0 ${sizes.space.m};
    `,
    actionsContainer: css`
        margin: auto;
    `,
}
