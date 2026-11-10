import { describe, expect, test } from "bun:test";
import { areaPath, linePath } from "./chart";
import { scoreTone, thresholdTone } from "./tone";

describe("linePath / areaPath", () => {
  test("maps values into the box, max at the top", () => {
    expect(linePath([0, 50, 100], 100, 200, 100)).toBe("M0.0 100.0 L100.0 50.0 L200.0 0.0");
  });
  test("clamps values outside [0, max]", () => {
    expect(linePath([-10, 150], 100, 100, 100)).toBe("M0.0 100.0 L100.0 0.0");
  });
  test("closes the area down to the baseline", () => {
    expect(areaPath([0, 100], 100, 100, 50)).toBe("M0.0 50.0 L100.0 0.0 L100 50 L0 50 Z");
  });
});

describe("tones", () => {
  test("thresholdTone: higher is worse", () => {
    expect(thresholdTone(1, 2, 5)).toBe("ok");
    expect(thresholdTone(2, 2, 5)).toBe("warn");
    expect(thresholdTone(5, 2, 5)).toBe("danger");
  });
  test("scoreTone: lower is worse, defaults 80 / 50, overridable", () => {
    expect(scoreTone(90)).toBe("ok");
    expect(scoreTone(79)).toBe("warn");
    expect(scoreTone(49)).toBe("danger");
    expect(scoreTone(65, 70, 40)).toBe("warn");
    expect(scoreTone(72, 70, 40)).toBe("ok");
  });
});
