export const getStoreProfile = () => ({
  type: "GET_STORE_PROFILE"
});

export const resetEditStoreProfileStatus = () => ({
  type: "RESET_EDIT_STORE_PROFILE_STATUS"
});

export const editStoreProfile = storeProfile => ({
  type: "EDIT_STORE_PROFILE",
  payload: storeProfile
});
