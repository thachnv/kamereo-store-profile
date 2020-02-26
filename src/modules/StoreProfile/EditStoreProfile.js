import React, { useEffect, useState } from "react";
import * as yup from "yup";

import "antd/lib/icon/style/css";

import defaultAvatar from "../../assets/default-avatar.png";
import {
  Button,
  Divider,
  Form,
  Icon,
  Input,
  notification,
  Select,
  Spin,
  Upload
} from "antd";
import { ErrorMessage, Formik } from "formik";

const initialFormValues = {
  storeName: "",
  storeAddress: "",
  storeDistrict: "8",
  storeCity: "",
  storePhone: "",
  riCompanyName: "",
  riCompanyAddress: "",
  riCompanyDistrict: "8",
  riCompanyCity: "",
  riCompanyTaxCode: ""
};

export const formValuesToStoreProfile = values => {
  return {
    name: values.storeName,
    address: values.storeAddress,
    district: values.storeDistrict,
    city: values.storeCity,
    phone: values.storePhone,
    redInvoice: {
      name: values.riCompanyName,
      address: values.riCompanyAddress,
      district: values.riCompanyDistrict,
      city: values.riCompanyCity,
      taxCode: values.riCompanyTaxCode
    }
  };
};

export const storeProfileToFormValues = storeProfile => {
  return {
    storeName: storeProfile.name,
    storeAddress: storeProfile.address,
    storeDistrict: storeProfile.district,
    storeCity: storeProfile.city,
    storePhone: storeProfile.phone,
    riCompanyName: storeProfile.redInvoice.name,
    riCompanyAddress: storeProfile.redInvoice.address,
    riCompanyDistrict: storeProfile.redInvoice.district,
    riCompanyCity: storeProfile.redInvoice.city,
    riCompanyTaxCode: storeProfile.redInvoice.taxCode
  };
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function EditStoreProfile({
  editStoreProfile,
  storeProfile,
  editStoreProfileStatus,
  onCancel,
  onDone,
  editStoreProfileError
}) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(storeProfile.logoUrl || "");

  const handleChangeImage = info => {
    if (info.file.status === "uploading") {
      setUploading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl => {
        setUploading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  if (editStoreProfileStatus === "done") {
    onDone();
  }

  useEffect(() => {
    if (editStoreProfileStatus === "error" && editStoreProfileError) {
      notification.error({
        message: editStoreProfileError.message
      });
    }
  }, [editStoreProfileStatus, editStoreProfileError]);

  const formValues = storeProfile
    ? storeProfileToFormValues(storeProfile)
    : initialFormValues;

  const handleSubmit = values => {
    const data = formValuesToStoreProfile(values);
    data.logoUrl = imageUrl;
    editStoreProfile(data);
  };

  const validateSchema = yup.object().shape({
    storeName: yup.string(),
    storeAddress: yup.string(),
    storeDistrict: yup.string(),
    storeCity: yup.string(),
    storePhone: yup
      .string()
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        "Phone Number is invalid"
      ),
    riCompanyName: yup.string(),
    riCompanyAddress: yup.string(),
    riCompanyDistrict: yup.string(),
    riCompanyCity: yup.string(),
    riCompanyTaxCode: yup.string()
  });

  return (
    <div className="pl-16 pr-16 ml-auto mr-auto mt-8" style={{ maxWidth: 900 }}>
      <div>
        <Icon type="edit" className="text-xl text-primary" />
        <span className="ml-4 font-bold">EDIT STORE PROFILE</span>
      </div>
      <Divider />
      <div className="flex justify-between">
        <div className="w-1/3 pr-8">
          <div className="font-bold">STORE IMAGE</div>
          <div className="border rounded overflow-hidden mt-8">
            <img
              alt="store avatar"
              width="100%"
              src={imageUrl || defaultAvatar}
            />
          </div>
          <div className="text-right mt-4">
            <Button type="link" onClick={() => setImageUrl("")}>
              Remove
            </Button>
            <div className="inline-block ml-2">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={handleChangeImage}
                showUploadList={false}
              >
                <Button type="primary">
                  {uploading && <Icon type="loading" spin />}Upload
                </Button>
              </Upload>
            </div>
          </div>
        </div>
        <div className="w-2/3 pl-8">
          <Spin spinning={editStoreProfileStatus === "editing"}>
            <div className="font-bold">BASIC INFO</div>
            <div className="mt-8">
              <Formik
                initialValues={formValues}
                onSubmit={handleSubmit}
                validationSchema={validateSchema}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  errors
                }) => (
                  <Form onSubmit={handleSubmit} name="editStoreProfileForm">
                    <Form.Item
                      label="Store Name"
                      validateStatus={errors.storeName ? "error" : "success"}
                      help={<ErrorMessage name="storeName" />}
                    >
                      <Input
                        name="storeName"
                        onChange={handleChange}
                        value={values.storeName}
                      />
                    </Form.Item>
                    <Form.Item label="Store Address">
                      <div className="flex justify-start">
                        <div className="w-1/2">
                          <Input
                            placeholder="Address"
                            name="storeAddress"
                            onChange={handleChange}
                            value={values.storeAddress}
                          />
                        </div>
                        <div className="w-1/4 pl-4">
                          <Select
                            placeholder="District"
                            name="storeDistrict"
                            onChange={v => setFieldValue("storeDistrict", v)}
                            value={values.storeDistrict}
                          >
                            <Select.Option value="8">Q.8</Select.Option>
                            <Select.Option value="9">Q.9</Select.Option>
                          </Select>
                        </div>
                        <div className="w-1/4 pl-4">
                          <Select
                            placeholder="City"
                            name="storeCity"
                            onChange={v => setFieldValue("storeCity", v)}
                            value={values.storeCity}
                          >
                            <Select.Option value="HCM">HCM</Select.Option>
                            <Select.Option value="HN">HN</Select.Option>
                          </Select>
                        </div>
                      </div>
                    </Form.Item>
                    <Form.Item
                      label="Phone #"
                      validateStatus={errors.storePhone ? "error" : "success"}
                      help={<ErrorMessage name="storePhone" />}
                    >
                      <Input
                        placeholder="Phone"
                        name="storePhone"
                        onChange={handleChange}
                        value={values.storePhone}
                      />
                    </Form.Item>
                    <div className="mt-8" />
                    <div className="font-bold">RED INVOICE INFO</div>
                    <div className="mt-4" />
                    <Form.Item label="Company Name">
                      <Input
                        name="riCompanyName"
                        onChange={handleChange}
                        value={values.riCompanyName}
                      />
                    </Form.Item>
                    <Form.Item label="Company Address">
                      <div className="flex justify-start">
                        <div className="w-1/2">
                          <Input
                            name="riCompanyAddress"
                            onChange={handleChange}
                            value={values.riCompanyAddress}
                          />
                        </div>
                        <div className="w-1/4 pl-4">
                          <Select
                            placeholder="District"
                            name="riCompanyDistrict"
                            onChange={v =>
                              setFieldValue("riCompanyDistrict", v)
                            }
                            value={values.riCompanyDistrict}
                          >
                            <Select.Option value="8">Q.8</Select.Option>
                            <Select.Option value="9">Q.9</Select.Option>
                          </Select>
                        </div>
                        <div className="w-1/4 pl-4">
                          <Select
                            placeholder="City"
                            name="riCompanyCity"
                            onChange={v => setFieldValue("riCompanyCity", v)}
                            value={values.riCompanyCity}
                          >
                            <Select.Option value="HCM">HCM</Select.Option>
                            <Select.Option value="HN">HN</Select.Option>
                          </Select>
                        </div>
                      </div>
                    </Form.Item>
                    <Form.Item label="MST">
                      <Input
                        name="riCompanyTaxCode"
                        onChange={handleChange}
                        value={values.riCompanyTaxCode}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        className="w-full"
                        type="primary"
                        htmlType="submit"
                      >
                        Save
                      </Button>
                      <Button className="w-full" type="link" onClick={onCancel}>
                        Cancel
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </Formik>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
}

export default EditStoreProfile;
