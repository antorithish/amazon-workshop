import { moneyConvert } from "../../scripts/utils/utilis-money.js";

describe("moneyConvert", () => {
  it("converts 0 cents", () => {
    expect(moneyConvert(0)).toEqual("$0.00");
  });

  it("convert 1090 cents to $10.90", () => {
    expect(moneyConvert(1090)).toEqual("$10.90");
  });

  it("converts 100080 cents to $1000.80", () => {
    expect(moneyConvert(100080)).toEqual("$1000.80");
  });
});
