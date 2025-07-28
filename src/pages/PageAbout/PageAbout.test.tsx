import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach } from "vitest";

import { PageAbout } from "./PageAbout";


function checkLinkAttributes(
    element: HTMLElement,
    href: string,
    target = "_blank",
    rel = "noopener noreferrer"
) {
    expect(element).toBeTruthy();
    expect(element.getAttribute("href")).toBe(href);
    expect(element.getAttribute("target")).toBe(target);
    expect(element.getAttribute("rel")).toBe(rel);
}

describe("PageAbout", () => {
    let githubLink: HTMLElement;
    let rssLink: HTMLElement;
    let rssLogo: HTMLElement;

    beforeEach(() => {
        render(
            <MemoryRouter>
                <PageAbout />
            </MemoryRouter>
        );
        githubLink = screen.getByRole("link", { name: /Natasha/i });
        rssLink = screen.getByRole("link", { name: /RS School React Course/i });
        rssLogo = screen.getByAltText("RS School React Course");
    });

    test("render about page description", () => {
        expect(screen.getByText(/This is a non-commercial project/i)).toBeTruthy();
    });

    test("links have correct attributes", () => {
        checkLinkAttributes(githubLink, "https://github.com/tffl");
        checkLinkAttributes(rssLink, "https://rs.school/courses/reactjs");
        expect(rssLogo).toBeTruthy();
        expect(rssLogo.classList.contains("rss-logo")).toBe(true);
    });
});
