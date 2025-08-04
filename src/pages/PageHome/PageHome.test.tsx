import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach } from "vitest";

import { PageHome, crashButtonText } from "./PageHome";

let crashButton: HTMLElement;
let pageTitle: HTMLElement;
const user = userEvent.setup();

const testSetup = () => {
  render(
    <MemoryRouter>
      <PageHome />
    </MemoryRouter>
  );
};

describe("PageHome", () => {
  beforeEach(() => {
    testSetup();
    crashButton = screen.getByRole("button", { name: crashButtonText });
    pageTitle = screen.getByRole("heading", { name: "Movies search" });
  });

  test("render page title", () => {
    expect(pageTitle).toBeTruthy();
  });

  test("render crash button", () => {
    expect(crashButton).toBeTruthy();
  });

  test("crash button throws error", async () => {
    await expect(() => user.click(crashButton)).rejects.toThrow("Test error");
  });
});