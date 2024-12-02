/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "../../extras/Button";
import Input, { Image, ExInput } from "../../extras/Input";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../../redux/slice/dialogueSlice";
import { expertAdd, expertUpdate, getExpert, getWithdrawInfo } from "../../../redux/slice/expertSlice";
import { addExpert, updateExpert } from "../../../redux/api";
import Multiselect from "multiselect-react-dropdown";
import { getAllServices } from "../../../redux/slice/serviceSlice";
import { permissionError } from "../../../util/Alert";

export const WithdrawInfo = ({ }) => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  const hasPermission = useSelector((state) => state.auth.admin.flag);
  const { withdrawInfo } = useSelector((state) => state.expert);
  const [data, setData] = useState()

  useEffect(() => {
    dispatch(getWithdrawInfo(dialogueData?._id))
  }, [dialogueData])

  useEffect(() => {
    setData(withdrawInfo)
  }, [withdrawInfo])

  return (
    <div className="dialog">
      <div class="w-100">
        <div class="row justify-content-center">
          <div class="col-xl-5 col-md-8 col-11">
            <div class="mainDiaogBox">
              <div class="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-theme m0">Withdraw Dialogue</h2>
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

              <div className="row align-items-start mt-2 formBody">
                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`status`}
                    newClass={data?.status === 0 ? "text-warning" : data?.status === 1 ? "text-success" : data?.status === 2 ? "text-danger" : ""}
                    name={`status`}
                    value={data?.status === 0 ? "Pending" : data?.status === 1 ? "Paid" : data?.status === 2 ? "Failed" : "-"}
                    label={`Status`}

                    placeholder={`Status`}
                    readOnly={true}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`diamond`}
                    name={`diamond`}
                    value={data?.diamond}
                    label={`Withdraw Amount`}
                    placeholder={`Withdraw Amount`}
                    readOnly={true}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`accountHolderName`}
                    name={`accountHolderName`}
                    value={data?.accountHolderName}
                    label={`Account Holder Name`}
                    placeholder={`Account Holder Name`}
                    readOnly={true}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`accountNumber`}
                    name={`accountNumber`}
                    value={data?.accountNumber}
                    label={`Account Number`}
                    placeholder={`Account Number`}
                    readOnly={true}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`bankName`}
                    name={`bankName`}
                    value={data?.bankName}
                    label={`Bank Name`}
                    placeholder={`Bank Name`}
                    readOnly={true}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`ifscCode`}
                    name={`ifscCode`}
                    value={data?.ifscCode}
                    label={`IFSC Code`}
                    placeholder={`IFSC Code`}
                    readOnly={true}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`upiId`}
                    name={`upiId`}
                    value={data?.upiId}
                    label={`UPI Id`}
                    placeholder={`UPI Id`}
                    readOnly={true}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`date`}
                    name={`date`}
                    value={data?.date}
                    label={`Date`}
                    placeholder={`Date`}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="row  formFooter">
                <div className="col-12 text-end m0">
                  <Button
                    className={`bg-gray text-light`}
                    text={`Close`}
                    type={`button`}
                    onClick={() => dispatch(closeDialog())}
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
