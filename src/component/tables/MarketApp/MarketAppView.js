/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Title from "../../extras/Title";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../../redux/slice/userSlice";
import { useState } from "react";
import { ExInput } from "../../extras/Input";
import Button from "../../extras/Button";
import { closeDialog } from "../../../redux/slice/dialogueSlice";
import Male from "../../../assets/images/male.png";
import dayjs from "dayjs";

const MarketAppView = () => {
  const { user } = useSelector((state) => state.user);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser(state?.id));
  }, [state]);

  useEffect(() => {
    setData(user);
  }, [user]);

  const handelPreviousPage = () => {
    if (state) {
      navigate(-1);
    } else {
      localStorage.removeItem("dialogueData");
      dispatch({ type: closeDialog });
    }
  };
  return (
    <div className="userProfile focusNone">
      <Title name={`${data?.fname ? data?.fname + ` ` + data?.lname : 'User'}'s   Profile`} />
      <div className="col-7 my-auto ms-auto justify-content-end d-flex pe-3">
      <Button
            className={`bg-danger  text-center text-white mt-3`}
            onClick={handelPreviousPage}
            style={{
              borderRadius: "5px",
            }}
            bIcon={`fa-solid fa-angles-left text-white fs-20 m-auto`}
            text='Back'
          />
        </div>
      <div className="boxShadow p-4">
        {/* <div
          className="position-relative  rounded-4 px-4 w-100"
          style={{ height: "180px", backgroundColor: "#0F7085" }}
        >
          <div className="bg-theme w-100">
            <img
              src={data?.image ? data.image : Male}
              onError={(e) => {
                e.target.src = Male; 
              }}
              alt="User"
              className="mx-auto  position-absolute"
              style={{
                width: 160,
                height: 160,
                objectFit: "cover",
                borderRadius: "50%",
                top: "88px",
                left: "50px",
                backgroundColor: "#FFFFFF",
                padding: "5px",
              }}
            />
          </div>
        </div> */}
        <div className="row" >
        <div className="col-12">
            <ExInput
              type={`text`}
              value={data?.diamond ? data?.diamond : "-"}
              label={`Balance`}
              newClass={"text-danger text-bold"}
              readOnly={true}
            />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12">
            <ExInput
              type={`text`}
              value={data?.username ? data?.username : "-"}
              label={`User Name`}
              readOnly={true}
            />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12">
            <ExInput
              type={`text`}
              value={data?.uniqueId ? data?.uniqueId : "-"}
              label={`Unique(Player) Id`}
              readOnly={true}
            />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12">
            <ExInput
              type={`text`}
              value={data?.mobileNumber ? data?.mobileNumber : "-"}
              label={`Mobile Number`}
              readOnly={true}
            />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12">
            <ExInput
              type={`text`}
              value={data?.isBlock === false? "Active" : "Block"}
              label={`Status`}
              newClass={data?.isBlock === false ? "text-success" :"text-danger"}
              readOnly={true}
            />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12">
            <ExInput
              type={`text`}
              value={data?.email ? data?.email : "-"}
              label={`Email Id`}
              readOnly={true}
            />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12">
            <ExInput
              type={`text`}
              value={data?.createdAt ? dayjs(data?.createdAt).format("DD MMM YYYY, hh:mm A") : "-"}
              label={`Create Date`}
              readOnly={true}
              placeholder={`Create Date`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAppView;

