import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import * as reactRouterDom from "react-router-dom";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe("Header", () => {
    let mockNavigate: ReturnType<typeof vi.fn>;
    let mockedUseNavigate: Mock;

    beforeEach(() => {
        mockNavigate = vi.fn();
        mockedUseNavigate = vi.mocked(reactRouterDom.useNavigate) as Mock;
        mockedUseNavigate.mockReturnValue(mockNavigate);
    });

    function testSetup(initialRoutes: string[] = ["/"]) {
        render(
            <MemoryRouter initialEntries={initialRoutes}>
                <Header />
            </MemoryRouter>
        );
    }

    it("render navigation links", () => {
        testSetup();
        expect(screen.getByText("Home")).toBeTruthy();
        expect(screen.getByText("About")).toBeTruthy();
    });

    it("navigate to correct link on click", async () => {
        testSetup();
        await userEvent.click(screen.getByText("About"));
        expect(mockNavigate).toHaveBeenCalledWith("/about");
    });

    it("add active class to link when route is active", () => {
        testSetup(["/about"]);
        expect(screen.getByText("About")).toBeTruthy()
    });
});
