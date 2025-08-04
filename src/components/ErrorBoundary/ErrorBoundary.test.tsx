import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import ErrorBoundary from "./ErrorBoundary";

const user = userEvent.setup();

describe("ErrorBoundary ui test", () => {
    let reloadMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        reloadMock = vi.fn();

        Object.defineProperty(window, "location", {
            configurable: true,
            value: {
                ...window.location,
                reload: reloadMock,
            },
        });
    });

    it("render ui and reload page on button click", async () => {
        const Bomb = () => {
            throw new Error("Test error");
        };

        render(
            <ErrorBoundary>
                <Bomb />
            </ErrorBoundary>
        );

        const button = screen.getByRole("button", { name: /reload page/i });
        expect(button).toBeTruthy();

        await user.click(button);

        expect(reloadMock).toHaveBeenCalled();
    });
});
