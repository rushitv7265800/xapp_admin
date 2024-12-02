import React, { useEffect } from "react";
import Button from "../../extras/Button";
import Input, { Image, Select } from "../../extras/Input";
import { useDispatch, useSelector } from "react-redux";
import { editData,objectToFormData,objectToBody, submitData } from "../../../util/fuction";
import { closeDialog } from "../../../redux/slice/dialogueSlice";
import {taxAdd,taxUpdate } from "../../../redux/slice/taxSlice";
import { DangerRight } from "../../api/toastServices";

const TaxDialogue = () => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);

  useEffect(() => {
    if (dialogueData) {
      editData(dialogueData);
    }
  }, [dialogueData]);

  const handleSubmit = async (e) => {
    const addTax = submitData(e);

    if (addTax) {
      try {
        let response;
        if (dialogueData) {
          const payload = { addTax, _id: dialogueData._id };
          response = await dispatch(taxUpdate(payload)).unwrap();
        } else {
          response = await dispatch(taxAdd(addTax)).unwrap();
        }
        response.status ? dispatch(closeDialog()) : DangerRight(response.message);
      } catch (err) {
        console.log("err", err);
      }
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
                <h2 className="text-theme m0">Tax Dialogue</h2>
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
            <form onSubmit={handleSubmit} id="expertForm">
              <div className="row align-items-start formBody">
                <div className="col-12 col-md-6">
                  <Input
                    type={`text`}
                    id={`title`}
                    name={`title`}
                    label={`Title`}
                    placeholder={`Title`}
                    errorMessage={`Enter Title`}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    type={`number`}
                    id={`value`}
                    name={`value`}
                    label={`Value`}
                    placeholder={`Value`}
                    errorMessage={`Enter Value`}
                  />
                </div>
               <div className="d-flex justify-content-between col-12 col-md-6"><span className="fs-16 fw-600"> Type: </span>
               <div className="col-6 ms-2">
                  <Input
                    type={`radio`}
                    id={`fix`}
                    label={`Fixed  ($)`} 
                    name={`type`}
                    value={`fixed`}
                  />
                </div>
                <div className="col-6">
                  <Input
                    type={`radio`}
                    id={`percent`}
                    label={`Percent (%)`}
                    name={`type`}
                    value={`percent`}
                    
                  />
                </div>
               </div>
               
              </div>
              <div className="row  formFooter">
                <div className="col-12 text-end m0">
                  <Button className={`bg-gray text-light`} text={`Cancel`} type={`button`} onClick={() => dispatch(closeDialog())} />
                  <Button
                    type={`submit`}
                    className={`bg-theme text-light m10-left`}
                    text={`Submit`}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TaxDialogue
