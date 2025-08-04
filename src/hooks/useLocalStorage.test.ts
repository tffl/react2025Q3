import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

import useLocalStorage from "./useLocalStorage";

const testKey = "test-key";
const defaultValue = "default";
const newValue = "newValue";
const invalidJson = "invalid json";

describe("useLocalStorage hook", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it("update localStorage", () => {
        const { result } = renderHook(() => useLocalStorage(testKey, defaultValue));
        act(() => {
            result.current[1](newValue);
        });
        expect(result.current[0]).toBe(newValue);
        expect(localStorage.getItem(testKey)).toBe(JSON.stringify(newValue));
    });

    it("return default value if JSON parsing fails", () => {
        localStorage.setItem(testKey, invalidJson);
        const { result } = renderHook(() => useLocalStorage(testKey, defaultValue));
        expect(result.current[0]).toBe(defaultValue);
    });
});
