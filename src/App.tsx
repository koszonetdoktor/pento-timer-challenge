/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react"
import TimeMeasure from "./components/TimeMeasure"
import { colors, sizes } from "./styles"

function App() {
    return (
        <div css={styles.root}>
            <Global styles={styles.body} />
            <h1>Freelancer TimeTracker</h1>
            <TimeMeasure onRecord={(name, time) => console.log(name, time)} />
        </div>
    )
}

export default App

const styles = {
    body: css`
        body {
            font-family: "Source Sans Pro", "sans-serif";
            background-color: ${colors.gray.dark};
            margin: 0;
            color: ${colors.text.main};
        }
        h1 {
            font-weight: 600;
            text-align: center;
        }
    `,
    root: css`
        max-width: 600px;
        margin: auto;
        padding: ${sizes.space.m};
    `,
}
