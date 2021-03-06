/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react"
import { Fragment } from "react"
import Loading from "./components/Loading"
import TimeRecorder from "./components/TimeRecorder"
import TrackedTimeList from "./components/TrackedTimeList/TrackedTimeList"
import { useTrackings } from "./services/useTrackings"
import { colors, sizes } from "./styles"

function App() {
    const { trackings, loading, error, addTracking } = useTrackings()

    if (error) throw error

    return (
        <div css={styles.root}>
            <Global styles={styles.body} />
            <h1>Freelancer TimeTracker</h1>
            {loading ? (
                <Loading />
            ) : (
                <Fragment>
                    <TimeRecorder
                        onRecorded={(newTracking) => addTracking(newTracking)}
                    />
                    <TrackedTimeList trackings={trackings} />
                </Fragment>
            )}
        </div>
    )
}

export default App

const styles = {
    body: css`
        body {
            font-family: "Source Sans Pro", "sans-serif";
            background-color: ${colors.gray[1000]};
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
