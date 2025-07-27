import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PagePagination from "./PagePagination";

const user = userEvent.setup();
const maxPages = 10;
let onPageChange: ReturnType<typeof vi.fn>;

function setup({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    render(
        <PagePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
        />
    );
}

describe("PagePagination", () => {
    beforeEach(() => {
        onPageChange = vi.fn();
        setup({ currentPage: 1, totalPages: 10, onPageChange });
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it("render 10 buttons", () => {
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeLessThanOrEqual(maxPages);
    });

    it("the current page's button is disabled", () => {
        cleanup();
        setup({ currentPage: 1, totalPages: 10, onPageChange });
        const currentBtn = screen.getByRole("button", { name: "1" }) as HTMLButtonElement;
        expect(currentBtn.disabled).toBe(true);
    });

    it("when click on button switch onPageChange to correct page number", async () => {
        cleanup();
        setup({ currentPage: 1, totalPages: 10, onPageChange });
        const button = screen.getByRole("button", { name: "2" });
        await user.click(button);
        expect(onPageChange).toHaveBeenCalledWith(2);
    });
});
