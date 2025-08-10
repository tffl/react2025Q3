import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach } from "vitest";

import { PageHome } from "./PageHome";

let pageTitle: HTMLElement;

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
    pageTitle = screen.getByRole("heading", { name: "Movies search" });
  });

  test("render page title", () => {
    expect(pageTitle).toBeTruthy();
  });
});