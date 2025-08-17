import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach } from "vitest";

import { store } from "../../store/store";

import { PageHome } from "./PageHome";

let pageTitle: HTMLElement;

const testSetup = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PageHome />
      </MemoryRouter>
    </Provider>,
  );
};

describe("PageHome", () => {
  beforeEach(() => {
    testSetup();
    pageTitle = screen.getByRole("heading", { name: "Movies search" });
  });

  test("should render page title", () => {
    expect(pageTitle).toBeTruthy();
  });
});
