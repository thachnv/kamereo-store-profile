import React from "react";
import {
  fireEvent,
  getByText,
  render,
  wait,
  waitForElement
} from "@testing-library/react";
import EditStoreProfile, { storeProfileToFormValues } from "./EditStoreProfile";

describe("Test Edit Store Profile ", () => {
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

  it("should render without failure", () => {
    const rendered = render(
      <EditStoreProfile storeProfile={mockStoreProfile} />
    );
    expect(rendered).toMatchSnapshot();
  });

  it("should fill initial data correctly", () => {
    const rendered = render(
      <EditStoreProfile storeProfile={mockStoreProfile} />
    );
    const expectedFieldValue = storeProfileToFormValues(mockStoreProfile);
    Object.keys(expectedFieldValue).forEach(key => {
      const value = expectedFieldValue[key];

      const field = rendered.container.querySelector(`input[name='${key}'`);
      if (field) {
        expect(field.value).toBe(value);
      }
    });
  });

  test("phone validation should work properly", async () => {
    const rendered = render(
      <EditStoreProfile
        storeProfile={mockStoreProfile}
        editStoreProfile={jest.fn}
      />
    );

    const phoneField = rendered.container.querySelector(
      `input[name="storePhone"`
    );
    const form = rendered.container.querySelector(
      `form[name="editStoreProfileForm"]`
    );

    fireEvent.change(phoneField, { target: { value: "123" } });

    fireEvent.submit(form);

    await waitForElement(() =>
      getByText(rendered.container, "Phone Number is invalid")
    );

    expect(
      getByText(rendered.container, "Phone Number is invalid")
    ).toBeTruthy();
  });

  test("should call edit store profile when submit if form is correct", async () => {
    const mockEditStoreProfile = jest.fn();
    const rendered = render(
      <EditStoreProfile
        storeProfile={mockStoreProfile}
        editStoreProfile={mockEditStoreProfile}
      />
    );

    const form = rendered.container.querySelector(
      `form[name="editStoreProfileForm"]`
    );

    fireEvent.submit(form);

    await wait();

    expect(mockEditStoreProfile).toBeCalled();
  });
});
