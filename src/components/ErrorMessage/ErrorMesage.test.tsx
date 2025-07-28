import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
    it("render the error message", () => {
        const testMessage = "error message";

        render(<ErrorMessage message={testMessage} />);

        expect(screen.getByText(testMessage)).toBeTruthy();
        expect(screen.getByText(testMessage).className).toContain('basic-text');
    });
});
