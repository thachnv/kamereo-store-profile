import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import "antd/lib/icon/style/css";

import defaultAvatar from "../../assets/default-avatar.png";
import { Button, Modal, Spin } from "antd";
import {
  editStoreProfile,
  getStoreProfile,
  resetEditStoreProfileStatus
} from "./actions";
import WrappedEditStoreProfile from "./EditStoreProfile";

const storeInfoAttributes = [
  {
    label: "Name",
    key: "name",
    id: "store-name"
  },
  {
    label: "Address",
    key: "address",
    id: "store-address"
  },
  {
    label: "Phone #",
    key: "phone",
    id: "store-phone"
  }
];

const redInvoiceAttributes = [
  {
    label: "Name",
    key: "name",
    id: "company-name"
  },
  {
    label: "Address",
    key: "address",
    id: "company-address"
  },
  {
    label: "Tax Code",
    key: "taxCode",
    id: "company-tax-code"
  }
];

export function StoreProfile({
  storeProfile,
  getStoreProfile,
  editStoreProfile,
  editStoreProfileStatus,
  resetEditStoreProfileStatus,
  editStoreProfileError
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    getStoreProfile();
  }, [getStoreProfile, storeProfile]);

  if (!storeProfile) {
    return (
      <div
        className="p-4 border rounded ml-auto mr-auto flex justify-center items-center"
        style={{ maxWidth: 400, height: 300 }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div
      className="p-4 border rounded ml-auto mr-auto"
      style={{ maxWidth: 400 }}
    >
      <div className="flex justify-center bg-black">
        <img
          alt="avatar"
          width="100%"
          src={storeProfile.logoUrl || defaultAvatar}
        />
      </div>
      <div className="mt-8 font-bold">STORE INFO</div>
      {storeInfoAttributes.map(attr => (
        <div className="flex justify-start mt-2" key={attr.key}>
          <div className="opacity-50" style={{ width: 200 }}>
            {attr.label}
          </div>
          <div id={attr.id}>{storeProfile[attr.key]}</div>
        </div>
      ))}
      <div className="mt-8 font-bold">RED INVOICE INFO</div>
      {redInvoiceAttributes.map(attr => (
        <div className="flex justify-start mt-2" key={attr.key}>
          <div className="opacity-50" style={{ width: 200 }}>
            {attr.label}
          </div>
          <div id={attr.id}>{storeProfile.redInvoice[attr.key]}</div>
        </div>
      ))}
      <div>
        <Button
          className="w-full mt-8"
          type="default"
          onClick={() => setShowEditForm(true)}
        >
          Edit Profile
        </Button>
      </div>
      <Modal visible={showEditForm} width={900} footer={null} closable={false}>
        <WrappedEditStoreProfile
          editStoreProfileStatus={editStoreProfileStatus}
          editStoreProfile={editStoreProfile}
          storeProfile={storeProfile}
          editStoreProfileError={editStoreProfileError}
          onCancel={() => {
            resetEditStoreProfileStatus();
            setShowEditForm(false);
          }}
          onDone={() => {
            resetEditStoreProfileStatus();
            setShowEditForm(false);
          }}
        />
      </Modal>
    </div>
  );
}
const mapStateToProps = state => ({
  storeProfile: state.storeProfile.storeProfile,
  editStoreProfileStatus: state.storeProfile.editStoreProfileStatus,
  editStoreProfileError: state.storeProfile.editStoreProfileError
});

const mapDispatchToProps = dispatch => ({
  getStoreProfile: () => dispatch(getStoreProfile()),
  resetEditStoreProfileStatus: () => dispatch(resetEditStoreProfileStatus()),
  editStoreProfile: storeProfile => dispatch(editStoreProfile(storeProfile))
});

const WrappedStoreProfile = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(StoreProfile);

export default WrappedStoreProfile;
