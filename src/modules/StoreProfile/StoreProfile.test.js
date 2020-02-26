import React from "react";
import { render } from "@testing-library/react";
import { StoreProfile } from "./StoreProfile";

const mockStoreProfile = {
  id: 1,
  logoUrl: "",
  name: "KOI",
  address: "521 Ho Tung Mau",
  district: "8",
  city: "HCM",
  phone: "1234567890",
  redInvoice: {
    name: "KOI",
    address: "123",
    district: "9",
    city: "HCM",
    taxCode: "123"
  }
};
describe("Test Store Profile view", () => {
  it("should render without failure", () => {
    const rendered = render(
      <StoreProfile
        storeProfile={mockStoreProfile}
        getStoreProfile={jest.fn()}
      />
    );
    expect(rendered).toMatchSnapshot();
  });

  it("should call method to get data only once", async () => {
    const mockGetStoreProfile = jest.fn();
    render(
      <StoreProfile
        storeProfile={mockStoreProfile}
        getStoreProfile={mockGetStoreProfile}
      />
    );
    // await waitForElement(() => getByText(rendered.container, "STORE INFO"));
    expect(mockGetStoreProfile).toBeCalledTimes(1);
  });

  it("should fill data correctly", () => {
    const rendered = render(
      <StoreProfile
        storeProfile={mockStoreProfile}
        getStoreProfile={jest.fn()}
      />
    );
    expect(rendered.container.querySelector("#store-name").innerHTML).toBe(
      mockStoreProfile.name
    );
    expect(rendered.container.querySelector("#store-address").innerHTML).toBe(
      mockStoreProfile.address
    );
    expect(rendered.container.querySelector("#store-phone").innerHTML).toBe(
      mockStoreProfile.phone
    );
    expect(rendered.container.querySelector("#company-name").innerHTML).toBe(
      mockStoreProfile.redInvoice.name
    );
    expect(rendered.container.querySelector("#company-address").innerHTML).toBe(
      mockStoreProfile.redInvoice.address
    );
    expect(
      rendered.container.querySelector("#company-tax-code").innerHTML
    ).toBe(mockStoreProfile.redInvoice.taxCode);
  });
});
