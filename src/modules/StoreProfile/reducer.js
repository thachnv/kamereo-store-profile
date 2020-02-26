const initialState = {
  storeProfile: null,
  editStoreProfileStatus: "idle"
};

const storeProfile = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STORE_PROFILE_SUCCESS":
      return {
        ...state,
        storeProfile: action.payload
      };
    case "EDIT_STORE_PROFILE":
      return {
        ...state,
        editStoreProfileStatus: "editing"
      };
    case "EDIT_STORE_PROFILE_SUCCESS":
      return {
        ...state,
        storeProfile: action.payload,
        editStoreProfileStatus: "done"
      };
    case "EDIT_STORE_PROFILE_FAILED":
      return {
        ...state,
        editStoreProfileError: action.editStoreProfileError,
        editStoreProfileStatus: "error"
      };
    case "RESET_EDIT_STORE_PROFILE_STATUS":
      return {
        ...state,
        editStoreProfileStatus: "idle"
      };
    default:
      return state;
  }
};

export default storeProfile;
