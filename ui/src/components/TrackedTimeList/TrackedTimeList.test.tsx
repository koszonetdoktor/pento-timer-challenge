import React from "react"
import { fireEvent, render } from "@testing-library/react"
import TrackedTimeList from "./TrackedTimeList"
import { Tracking } from "../../types"
import { getTime, startOfISOWeek, startOfMonth } from "date-fns"

const mockTrackings: Tracking[] = [
    { id: "1", duration: 400, name: "Track", ts: getTime(new Date()) },
    { id: "2", duration: 400, name: "Track", ts: getTime(new Date()) },
    {
        id: "3",
        duration: 400,
        name: "Track",
        ts: getTime(startOfISOWeek(new Date())),
    },
    {
        id: "4",
        duration: 400,
        name: "Track",
        ts: getTime(startOfISOWeek(new Date())),
    },
    {
        id: "5",
        duration: 400,
        name: "Track",
        ts: getTime(startOfMonth(new Date())),
    },
    {
        id: "6",
        duration: 400,
        name: "Track",
        ts: getTime(startOfMonth(new Date())),
    },
]

describe("TrackedTimeList", () => {
    test("Don't show list whan no tracking", () => {
        const { queryByTestId } = render(<TrackedTimeList trackings={[]} />)
        expect(queryByTestId("tracking_list")).toBeFalsy()
    })
    test("Show today's trackings on initial render", () => {
        const { getAllByTestId } = render(
            <TrackedTimeList trackings={mockTrackings} />
        )

        const listItems = getAllByTestId("tracking_listItem")
        expect(listItems).toHaveLength(2)
    })
    test("Show this week's trackings", () => {
        const { getAllByTestId, getByTestId } = render(
            <TrackedTimeList trackings={mockTrackings} />
        )
        const filter = getByTestId("selector_period")
        fireEvent.change(filter, { target: { value: "week" } })

        const listItems = getAllByTestId("tracking_listItem")
        expect(listItems).toHaveLength(4)
    })
    test("Show this month's trackings", () => {
        const { getAllByTestId, getByTestId } = render(
            <TrackedTimeList trackings={mockTrackings} />
        )
        const filter = getByTestId("selector_period")
        fireEvent.change(filter, { target: { value: "month" } })

        const listItems = getAllByTestId("tracking_listItem")
        expect(listItems).toHaveLength(6)
    })
})
