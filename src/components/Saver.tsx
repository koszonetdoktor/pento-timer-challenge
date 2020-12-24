/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { useState } from "react"
import { sizes } from "../styles"
import Button from "./Button"
import Input from "./Input"

type Props = {
    disabled: boolean
    onSaved: (name: string) => void
}

export default function Saver({ disabled, onSaved }: Props) {
    const [name, setName] = useState("")

    const handleSaveClick = () => {
        onSaved(name)
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
                Save
            </Button>
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
}
