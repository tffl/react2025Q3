import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PageDetailView } from "./PageDetailView";

describe("PageDetailView", () => {
  it("render Header component", () => {
    render(
      <MemoryRouter>
        <PageDetailView />
      </MemoryRouter>
    );
    const nav = screen.getByRole("navigation");
    expect(nav).toBeTruthy();
  });
});
