/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Title from "../../extras/Title";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  expertUpdate,
  getExpert,
} from "../../../redux/slice/expertSlice";
import { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { getAllServices } from "../../../redux/slice/serviceSlice";
import Button from "../../extras/Button";
import { ReactComponent as Star } from "../../../assets/images/star.svg";
import { ReactComponent as Mail } from "../../../assets/images/mail.svg";
import { ReactComponent as Call } from "../../../assets/images/call.svg";
import { ReactComponent as Age } from "../../../assets/images/age.svg";
import Male from "../../../assets/images/male.png";
import { ExInput } from "../../extras/Input";
import { permissionError } from "../../../util/Alert";

const DepositProfile = () => {
  const { oneExpert } = useSelector((state) => state.expert);
  const { setting } = useSelector((state) => state.setting);

  const { state } = useLocation();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [allService, setAllService] = useState([]);
  const { service } = useSelector((state) => state.service);
  const hasPermission = useSelector((state) => state.auth.admin.flag) 
  useEffect(() => {
    dispatch(getAllServices({ start: 0, limit: 100, search: "ALL" }));
  }, [dispatch]);



  useEffect(() => {
    dispatch(getExpert(state?.id));
  }, [dispatch,state]);

  useEffect(() => {
    setData(oneExpert);
  }, [oneExpert]);

  useEffect(() => {
    const addData = oneExpert?.serviceData
      ?.map((item) => {
        const { _id, ...rest } = item;
        return { id: _id, ...rest };
      });
    setAllService(addData);
  }, [oneExpert]);

  const serviceList = service
    ?.map((list) => ({
      name: list.name,
      id: list._id,
    }));

  function onSelect(selectedList, selectedItem) {
    allService?.length > 0 && allService.push(selectedItem);
  }

  function onRemove(selectedList, removedItem) {
    const updatedServices = selectedList?.filter(
      (item) => item?.id !== removedItem?.id
    );
    setAllService(updatedServices);
  }

  const handleSubmit = async (e) => {
    if(!hasPermission) return permissionError()
    const serviceIds = allService?.map((services) => services?.id).join(",");
    const payload = {
      formData: { serviceId: serviceIds },
      expertId: data?._id,
    };
    dispatch(expertUpdate(payload));
  };


  return (
    <div className="expertProfileMain focusNone">
      <Title name={`${data?.fname ? data?.fname + ` ` + data?.lname : "Salon Expert"}'s   Profile`} />
      <div className="d-lg-flex d-md-block">
        <div className="col-12 col-sm-12 col-md-12 col-lg-3 mt-4 me-4">
          <div className="card">
            <div className="card-body">
              <div className="position-relative">
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="d-none"
                />
                <img
                  src={data?.image ? data?.image : Male}
                  alt="admin"
                  className="mx-auto p-1 border "
                  
                  style={{
                    width: 180,
                    height: 180,
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "50%",
                  }}
                />
                <div
                  className="position-absolute"
                  style={{ bottom: "-2%", right: "45%" }}
                >
                  <div
                    className="bg-theme"
                    style={{
                      borderRadius: 50,
                      height: 29,
                    }}
                  ></div>
                </div>
              </div>
              <div className="text-center my-4 pb-4 border-bottom ">
                <h2 className="text-capitalize">
                  {data?.fname ? data?.fname + " " : "Salon"}
                  {data?.lname ? data?.lname : "User"}
                </h2>
                <div className="mt-4"></div>
              </div>
              <div>
                <ul
                  style={{ listStyle: "none", fontSize: 15, paddingLeft: 10 }}
                >
                  <li
                    className="mt-2 user  userEdit"
                  >
                    <span className="ps-2">
                      <Mail />
                    </span>
                    <span className="ps-2">{data?.email}</span>
                  </li>
                  <li className="mt-2 user ">
                    <span
                      className="ps-2 "
                      style={{ height: "26px", width: "26px" }}
                    >
                      <Call />
                    </span>
                    <span className="ps-2">{data?.mobile}</span>
                  </li>
                  <li className="mt-2 user ">
                    <span
                      className="ps-2 "
                      style={{ height: "26px", width: "26px" }}
                    >
                      <Age />
                    </span>
                    <span className="ps-2">{data?.age}</span>
                  </li>{" "}
                  <li className="mt-2 user -pointer">
                    <span
                      className="ps-2 "
                      style={{ height: "26px", width: "26px" }}
                    >
                      <Star />
                    </span>
                    <span className="ps-2">{data?.averageRating}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xxl-9 mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card ">
                <div className="card-body">
                  <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7 mx-auto">
                    <div className="form-group mt-4 ">
                      <div className="mb-2 mt-2 inputData">
                        <label className=" text-gray ml-3 font-weight-bold">
                          Earnings
                        </label>
                        <input
                          type="text"
                          className=" p-2 inputNoFocus"
                          placeholder="Earnings"
                          value={
                            data?.earnings
                              ? data?.earnings + setting?.currencySymbol
                              : "-"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-group inputData">
                      <div className=" mt-2">
                        <label className=" text-gray ml-3 font-weight-bold">
                          Services
                        </label>
                        <input
                          type="text"
                          className=" p-2 inputNoFocus"
                          placeholder="New Password"
                          value={data?.totalBookingCount ? data?.totalBookingCount : '0'}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-group inputData">
                      <div className=" mt-2">
                        <label className=" text-gray ml-3 font-weight-bold">
                          Joining Date
                        </label>
                        <input
                          type="text"
                          className=" p-2 inputNoFocus"
                          placeholder="New Password"
                          value={data?.createdAt?.split("T")[0]}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-group inputData">
                      <div className="mb-2 mt-2">
                        <label className="mb-2 text-gray ml-3 font-weight-bold">
                          Services Providing
                        </label>
                        <div className="interested-topics">
                          <Multiselect
                            options={serviceList}
                            selectedValues={data?.serviceData?.map((item) => ({
                              id: item._id,
                              name: item.name,
                            }))}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            displayValue="name"
                          />
                          <div className="d-flex">
                            <Button
                              text={`Submit`}
                              className={`bg-theme text-white mt-5 ms-auto`}
                              onClick={(e) => handleSubmit(e)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row flex-wrap rounded border mt-3">
        <div className="col-12 col-md-6  ">
          <ExInput
            type={`text`}
            value={data?.bankDetails?.bankName}
            label={`Bank Name`}
            readOnly={true}
            placeholder={`Bank Name`}
          />
        </div>
        <div className="col-12 col-md-6">
          <ExInput
            type={`text`}
            value={data?.bankDetails?.branchName}
            label={`Branch Name`}
            placeholder={`Branch Name`}
            readOnly={true}
          />
        </div>
        <div className="col-12 col-md-6">
          <ExInput
            type={`text`}
            value={data?.bankDetails?.accountNumber}
            label={`Account Number`}
            placeholder={`Bank Account Name`}
            readOnly={true}
          />
        </div>
        <div className="col-12 col-md-6">
          <ExInput
            type={`text`}
            value={data?.bankDetails?.IFSCCode}
            label={`IFSC Code`}
            placeholder={`IFSC Code`}
            readOnly={true}
          />
        </div>
        <div className="col-12 col-md-6">
          <ExInput
            type={`text`}
            value={data?.upiId}
            label={`UPI Id`}
            placeholder={`UPI Id`}
            readOnly={true}
          />
        </div>
        <div className="col-12 col-md-6">
          <ExInput
            type={`text`}
            value={data?.paymentType === 0 ? "Upi" : "Bank"}
            label={`Preferred Payment type`}
            placeholder={`Payment Type`}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DepositProfile;
