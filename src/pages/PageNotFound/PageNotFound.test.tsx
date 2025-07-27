import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach, afterEach } from "vitest";

import { PageNotFound, pageNotFoundText } from "./PageNotFound";

const user = userEvent.setup();

let backBtn: HTMLElement;
let originalLocation: Location;

describe("PageNotFound", () => {
  beforeEach(() => {
    originalLocation = window.location;

    delete (window as unknown as { location?: Location }).location;
    (window as unknown as { location?: Partial<Location> }).location = { href: "" };

    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );

    backBtn = screen.getByRole("button", { name: /back home/i });
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  test("render header text", () => {
    const heading = screen.getByRole("heading", { name: pageNotFoundText });
    expect(heading).toBeTruthy();
  });

  test("render back home button", () => {
    expect(backBtn).toBeTruthy();
  });

  test("back home button redirects to home page", async () => {
    await user.click(backBtn);
    expect(window.location.href).toBe("/");
  });
});
