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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { depositAmount } from "../../../redux/slice/depositSlice";

export const DepositDialogue = ({ data, setData }) => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  const hasPermission = useSelector((state) => state.auth.admin.flag);
  const [diamond, setDiamond] = useState()

  useEffect(() => {
    if (dialogueData) {
      setDiamond(dialogueData?.diamond)
    }
  }, [dialogueData]);

  const [error, setError] = useState({
    diamond: "",
  });

  const handleSubmit = async (e) => {
    if (
      !diamond
    ) {
      let error = {};
      if (!diamond) error.diamond = "Amount is required";
      return setError({ ...error });
    } else {
      const data = {
      }
      const payload = {
        id: dialogueData?._id,
        diamond: diamond,
      }
      dispatch(depositAmount(payload))
      dispatch(closeDialog());
    }
  };

  return (
    <div className="dialog">
      <div class="w-100">
        <div class="row justify-content-center">
          <div class="col-xl-5 col-md-8 col-11">
            <div class="mainDiaogBox">
              <div class="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-theme m0">Deposit Dialogue</h2>
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
                <div className="col-12">
                  <ExInput
                    type={`number`}
                    id={`diamond`}
                    name={`diamond`}
                    value={diamond}
                    label={`Deposit Amount`}
                    placeholder={`Deposit Amount`}
                    errorMessage={error.diamond && error.diamond}
                    onChange={(e) => {
                      setDiamond(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          diamond: `Amount Is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          diamond: "",
                        });
                      }
                    }}
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
