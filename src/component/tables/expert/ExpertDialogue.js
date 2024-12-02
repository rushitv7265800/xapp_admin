/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "../../extras/Button";
import Input, { Image, ExInput } from "../../extras/Input";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../../redux/slice/dialogueSlice";
import { expertAdd, expertUpdate } from "../../../redux/slice/expertSlice";
import { addExpert, updateExpert } from "../../../redux/api";
import Multiselect from "multiselect-react-dropdown";
import { getAllServices } from "../../../redux/slice/serviceSlice";
import { permissionError } from "../../../util/Alert";

export const ExpertDialogue = ({ data, setData }) => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  const hasPermission = useSelector((state) => state.auth.admin.flag);
  const { service } = useSelector((state) => state.service);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState();
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [email, setEmail] = useState("");
  const [mongoId, setMongoId] = useState();
  const [commission, setCommission] = useState(null);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [IFSCCode, setIFSCCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [password, setPassword] = useState("");
  const [allService, setAllService] = useState([]);

  useEffect(() => {
    if (dialogueData) {
      setFname(dialogueData?.fname);
      setLname(dialogueData?.lname);
      setAge(dialogueData?.age);
      setGender(dialogueData?.gender);
      setMobile(dialogueData?.mobile);
      setEmail(dialogueData?.email);
      setImagePath(dialogueData?.image);
      setMongoId(dialogueData?._id);
      setCommission(dialogueData?.commission);
      setBankName(dialogueData?.bankDetails?.bankName);
      setAccountNumber(dialogueData?.bankDetails?.accountNumber);
      setIFSCCode(dialogueData?.bankDetails?.IFSCCode);
      setBranchName(dialogueData?.bankDetails?.branchName);
      setUpiId(dialogueData?.upiId);
      setPassword(dialogueData?.password);
    }
  }, [dialogueData]);

  const [error, setError] = useState({
    fname: "",
    lname: "",
    mobile: "",
    // email: "",
    image: "",
    gender: "",
    age: "",
    commission: "",
    allService: "",
    bankName: "",
    accountNumber: "",
    IFSCCode: "",
    branchName: "",
    upiId: "",
    password: "",
  });

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const handleSubmit = async (e) => {
    if (!hasPermission) return permissionError();
    if (
      !lname ||
      !fname ||
      !age ||
      !mobile ||
      !gender ||
      !image ||
      !commission ||
      commission > 99 ||
      !bankName ||
      !accountNumber ||
      !branchName ||
      !IFSCCode ||
      !upiId ||
      !password ||
      !allService?.length
    ) {
      let error = {};
      if (!lname) error.lname = "Last name is required";
      if (!fname) error.fname = "First name is required";
      if (!image?.length === 0 || !imagePath)
        error.image = "Image is required!";
      if (!age) error.age = "age is required";
      if (!mobile) error.mobile = "mobile number is required";
      if (mobile.length < 6 || mobile.length > 13)
        error.mobile = "Mobile number must be 6 to 13 digits";
      if (age < 18 || age > 100) error.age = "Invalid Age";
      if (commission > 99) error.commission = "Invalid Commission";
      if (!commission) error.commission = "commission is required";
      if (!bankName) error.bankName = "bankName is required";
      if (!accountNumber) error.accountNumber = "accountNumber is required";
      if (!branchName) error.branchName = "branchName is required";
      if (!IFSCCode) error.IFSCCode = "IFSC Code is required";
      if (!upiId) error.upiId = "upiId is required";
      if (!password) error.password = "password is required";
      if (!allService?.length)
        error.allService = "At least one service must be selected";
      return setError({ ...error });
    } else if (!isEmailValid) {
      const error = { email: "Email address is invalid" };
      return setError({ ...error });
    } else {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("lname", lname);
      formData.append("fname", fname);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("commission", commission);
      formData.append("IFSCCode", IFSCCode);
      formData.append("accountNumber", accountNumber);
      formData.append("branchName", branchName);
      formData.append("upiId", upiId);
      formData.append("password", password);
      formData.append("bankName", bankName);
      const serviceIds = allService?.map((service) => service.id)?.join(",");
      formData.append("serviceId", serviceIds);

      if (mongoId) {
        const payload = { formData, expertId: mongoId };
        dispatch(expertUpdate(payload));
      } else {
        dispatch(expertAdd(formData));
      }
      dispatch(closeDialog());
    }
  };
  useEffect(() => {
    dispatch(getAllServices({ start: 0, limit: 100, search: "ALL" }));
  }, []);

  useEffect(() => {
    const addData = dialogueData?.serviceData?.map((item) => {
      const { _id, ...rest } = item;
      return { id: _id, ...rest };
    });
    setAllService(addData);
  }, [dialogueData]);

  const serviceList = service?.map((list) => ({
    name: list?.name,
    id: list?._id,
  }));

  const selectedServiceNames = dialogueData
    ? dialogueData?.serviceData?.map((selectedId) => {
        const matchingService = service?.find(
          (service) => service._id === selectedId._id
        );
        return { id: matchingService?._id, name: matchingService?.name };
      })
    : [];

  function onSelect(selectedList, selectedItem) {
    const updatedServices =
      allService !== undefined ? [...allService, selectedItem] : [selectedItem];
    setAllService(updatedServices);
  }

  function onRemove(selectedList, removedItem) {
    const updatedServices = selectedList?.filter(
      (item) => item.id !== removedItem.id
    );
    setAllService(updatedServices);
  }

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImagePath(URL.createObjectURL(e.target.files[0]));
    setError((prevErrors) => ({
      ...prevErrors,
      image: "",
    }));
  };

  return (
    <div className="dialog">
      <div class="w-100">
        <div class="row justify-content-center">
          <div class="col-xl-5 col-md-8 col-11">
            <div class="mainDiaogBox">
              <div class="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-theme m0">Expert Dialogue</h2>
                </div>
                <div className="col-4">
                  <div
                    className="closeButton"
                    onClick={() => {
                      dispatch(closeDialog());
                    }}
                  >
                    <i className="ri-close-line"></i>
                  </div>
                </div>
              </div>

              <div className="row align-items-start formBody">
                <div className="row my-4">
                  <div className="col-12">
                    <Multiselect
                      options={serviceList}
                      selectedValues={
                        selectedServiceNames ? selectedServiceNames : []
                      }
                      onSelect={onSelect}
                      onRemove={onRemove}
                      displayValue="name"
                      className="cursor-pointer"
                    />
                  </div>
                  {error.allService && (
                    <p className="errorMessage">{error?.allService}</p>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`fname`}
                    name={`fname`}
                    value={fname}
                    label={`First name`}
                    placeholder={`First name`}
                    errorMessage={error.fname && error.fname}
                    onChange={(e) => {
                      setFname(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          fname: `First Name Is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          fname: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    value={lname}
                    id={`lname`}
                    name={`lname`}
                    label={`Last Name`}
                    placeholder={`Last Name`}
                    errorMessage={error.lname && error.lname}
                    onChange={(e) => {
                      setLname(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          lname: `Last Name Is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          lname: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`number`}
                    value={mobile}
                    id={`mono`}
                    name={`mobile`}
                    label={`Mobile Number`}
                    minLength={6}
                    maxLength={13}
                    placeholder={`Mobile Number`}
                    errorMessage={error.mobile && error.mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          mobile: `Mobile Number Is Required`,
                        });
                      } else if (
                        e.target.value.length < 6 ||
                        e.target.value.length > 13
                      ) {
                        return setError({
                          ...error,
                          mobile: "Mobile number must be 6 to 13 digits",
                        });
                      } else {
                        return setError({
                          ...error,
                          mobile: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`email`}
                    name={`email`}
                    label={`Email`}
                    value={email}
                    placeholder={`Email`}
                    errorMessage={error.email && error.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          email: `email Id is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          email: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`number`}
                    id={`age`}
                    name={`age`}
                    value={age}
                    label={`Age`}
                    placeholder={`Age`}
                    minLength={2}
                    maxLength={2}
                    errorMessage={error.age && error.age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          age: `age is Required`,
                        });
                      } else if (
                        e.target.value.length < 2 ||
                        e.target.value.length > 3
                      ) {
                        return setError({
                          ...error,
                          age: "Invalid Age",
                        });
                      } else {
                        return setError({
                          ...error,
                          age: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`number`}
                    id={`commission`}
                    name={`commission`}
                    value={commission}
                    label={`Admin Commission (%)`}
                    placeholder={`Admin Commission`}
                    errorMessage={error.commission && error.commission}
                    onChange={(e) => {
                      setCommission(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          commission: `Commission is Required`,
                        });
                      } else if (e.target.value > 99) {
                        return setError({
                          ...error,
                          commission: `Invalid Commission `,
                        });
                      } else {
                        return setError({
                          ...error,
                          commission: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`string`}
                    id={`bankName`}
                    name={`bankName`}
                    value={bankName}
                    label={`Bank Name`}
                    placeholder={`Bank Name`}
                    errorMessage={error.bankName && error.bankName}
                    onChange={(e) => {
                      setBankName(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          bankName: `bankName is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          bankName: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`string`}
                    id={`accountNumber`}
                    name={`accountNumber`}
                    value={accountNumber}
                    label={`Account Number`}
                    placeholder={`Account Number`}
                    errorMessage={error.accountNumber && error.accountNumber}
                    onChange={(e) => {
                      setAccountNumber(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          accountNumber: `account Number is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          accountNumber: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`string`}
                    id={`branchName`}
                    name={`branchName`}
                    value={branchName}
                    label={`Branch Name)`}
                    placeholder={`Branch Name`}
                    errorMessage={error.branchName && error.branchName}
                    onChange={(e) => {
                      setBranchName(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          branchName: `branch Name is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          branchName: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`string`}
                    id={`IFSCCode`}
                    name={`IFSCCode`}
                    value={IFSCCode}
                    label={`IFSC Code`}
                    placeholder={`IFSC Code`}
                    errorMessage={error.IFSCCode && error.IFSCCode}
                    onChange={(e) => {
                      setIFSCCode(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          IFSCCode: `IFSC Code is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          IFSCCode: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`string`}
                    id={`upiId`}
                    name={`upiId`}
                    value={upiId}
                    label={`Upi Id`}
                    placeholder={`Upi Id`}
                    errorMessage={error.upiId && error.upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          upiId: `upiId is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          upiId: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`password`}
                    name={`password`}
                    value={password}
                    label={`Password`}
                    placeholder={`Password`}
                    errorMessage={error.password && error.password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          password: `password is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          password: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="d-flex justify-content-between col-12 col-md-6 mt-md-5 mt-sm-0">
                  <span className="fs-16 fw-600"> Gender: </span>
                  <div className="col-4 ms-2">
                    <ExInput
                      type={`radio`}
                      id={`male`}
                      label={`Male`}
                      name={`gender`}
                      value={`male`}
                      checked={(gender === "male" || gender === "Male") && true}
                      onChange={(e) => {
                        setGender(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...error,
                            gender: `Gender Is Required`,
                          });
                        } else {
                          return setError({
                            ...error,
                            gender: "",
                          });
                        }
                      }}
                    />
                  </div>

                  <div className="col-4">
                    <ExInput
                      type={`radio`}
                      id={`female`}
                      label={`Female`}
                      name={`gender`}
                      value={`female`}
                      checked={
                        (gender === "female" || gender === "Female") && true
                      }
                      onChange={(e) => {
                        setGender(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...error,
                            gender: `Gender Is Required`,
                          });
                        } else {
                          return setError({
                            ...error,
                            gender: "",
                          });
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="col-6">
                  <ExInput
                    label={`Image`}
                    id={`image`}
                    type={`file`}
                    onChange={(e) => handleImage(e)}
                    errorMessage={error.image && error.image}
                    accept={"image/*"}
                  />
                  <img
                    src={imagePath !== "" ? imagePath : null}
                    alt=""
                    draggable="false"
                    className={`${
                      (!imagePath || imagePath === "") && "d-none"
                    } `}
                    data-class={`showImage`}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              </div>

              <div className="row  formFooter">
                <div className="col-12 text-end m0">
                  <Button
                    className={`bg-gray text-light`}
                    text={`Cancel`}
                    type={`button`}
                    onClick={() => dispatch(closeDialog())}
                  />
                  <Button
                    type={`submit`}
                    className={`bg-theme text-light m10-left`}
                    text={`Submit`}
                    onClick={(e) => handleSubmit(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
