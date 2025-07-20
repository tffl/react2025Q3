import { faker } from '@faker-js/faker';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import SearchBar from "./SearchBar";

const testSetup = ({
  value = "",
  onChange = vi.fn(),
  onSubmit = vi.fn(),
} = {}) => {
  render(<SearchBar value={value} onChange={onChange} onSubmit={onSubmit} />);
  const input = screen.getByPlaceholderText(/search movies/i);
  const button = screen.getByRole("button", { name: /search/i });
  return { input, button, onChange, onSubmit };
};

const userRequest = faker.lorem.words(1);

describe("SearchBar", () => {
  it("renders search input", () => {
    const { input } = testSetup();
    expect(input).toBeTruthy();
  });

  it("renders search button", () => {
    const { button } = testSetup();
    expect(button).toBeTruthy();
  });

  it("calls onChange by typing", async () => {
    const { input, onChange } = testSetup();
    await userEvent.type(input, userRequest);
    expect(onChange).toHaveBeenCalled();
  });

  it("calls onSubmit by clicking search button", async () => {
    const { button, onSubmit } = testSetup({ value: userRequest });
    await userEvent.click(button);
    expect(onSubmit).toHaveBeenCalled();
  });
});