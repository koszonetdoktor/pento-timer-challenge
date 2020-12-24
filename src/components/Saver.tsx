/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { useState } from "react"
import { sizes, colors } from "../styles"
import { ProgressStates } from "../types"
import Button from "./Button"
import Input from "./Input"

type Props = {
    disabled: boolean
    savingProgress: ProgressStates
    onSave: (name: string) => void
}

export default function Saver({ disabled, savingProgress, onSave }: Props) {
    const [name, setName] = useState("")

    const handleSaveClick = () => {
        onSave(name)
        setName("")
    }

    return (
        <div css={styles.root}>
            <Input
                value={name}
                disabled={disabled}
                onChange={(e) => setName(e.target.value)}
                css={styles.input}
            />
            <Button disabled={disabled} onClick={handleSaveClick}>
                {savingProgress === "loading" ? "Save..." : "Save"}
            </Button>
            {savingProgress === "error" && (
                <span css={styles.error}>Could not save</span>
            )}
        </div>
    )
}

const styles = {
    root: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: ${sizes.space.l} 0;
    `,
    input: css`
        width: 90%;
        margin-bottom: ${sizes.space.s};
    `,
    error: css`
        padding-top: ${sizes.space.s};
        color: ${colors.error};
    `,
}
