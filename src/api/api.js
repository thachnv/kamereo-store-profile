let storeProfile = {
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

const fetchStoreProfile = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(storeProfile), 400);
  });
};

const updateStoreProfile = newStoreProfile => {
  return new Promise((resolve, reject) => {
    if (newStoreProfile.name === "dup") {
      setTimeout(() => {
        reject({
          message: "Store Name is duplicated, choose another one"
        });
      }, 400);
    } else {
      storeProfile = newStoreProfile;
      setTimeout(() => resolve(storeProfile), 400);
    }
  });
};

export { fetchStoreProfile, updateStoreProfile };
