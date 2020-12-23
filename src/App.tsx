/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react"
import { colors } from "./styles"

function App() {
    return (
        <div css={styles.root}>
            <Global styles={styles.body} />
            <h1>HEllo</h1>
        </div>
    )
}

export default App

const styles = {
    body: css`
        body {
            font-family: "Source Sans Pro", "sans-serif";
            background-color: #d9e2ec;
            margin: 0;
        }
    `,
    root: css`
        max-width: 600px;
        margin: auto;
        background-color: white;
    `,
}
