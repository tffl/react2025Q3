import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("should render the error message", () => {
    const testMessage = "error message";

    render(<ErrorMessage message={testMessage} />);

    expect(screen.getByText(testMessage)).toBeInTheDocument()
    expect(screen.getByText(testMessage).className).toContain("basic-text");
  });
});
