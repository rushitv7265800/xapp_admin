import React, { useEffect, useState } from 'react'
import Button from "../../extras/Button";
import Input, { Textarea } from "../../extras/Input";
import { useDispatch, useSelector } from "react-redux";
import { editData, objectToFormData, submitData } from "../../../util/fuction";
import { closeDialog } from "../../../redux/slice/dialogueSlice";
import { DangerRight } from '../../api/toastServices';

import {
  contentAdd,
  contentUpdate,
} from "../../../redux/slice/categorySlice";
import { permissionError } from '../../../util/Alert';

const CategoryDialogue = () => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  const [imagePath, setImagePath] = useState("");
  const hasPermission = useSelector((state) => state.auth.admin.flag)
  const [content, setContent] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (dialogueData) {
      setContent(dialogueData?.content);
    }
  }, [dialogueData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasPermission) return permissionError()
    if (!content) {
      setError("Content is Required !!")
    } else {
      setError("")
      const data = {
        content: content
      }
      if (dialogueData) {
        const payload = { data: data, contentId: dialogueData._id };
        dispatch(contentUpdate(payload)).unwrap();
      } else {

        dispatch(contentAdd(data)).unwrap();
      }
      dispatch(closeDialog())
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
                  <h2 className="text-theme m0">Content Dialogue</h2>
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
                  {/* <div className="col-12 col-md-6">
                  <Input
                    type={`text`}
                    id={`name`}
                    name={`name`}
                    label={`Name`}
                    placeholder={`Name`}
                    errorMessage={`Enter Name`}
                  />
                </div> */}
                  <div className="col-12">
                    <Textarea
                      label={`Content`}
                      placeholder={`Content`}
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                        if (!e.target.value) {
                          return setError("Content Is Required");
                        } else {
                          return setError();
                        }
                      }}
                    // readOnly={true}
                    />
                    {error &&
                      <p className="errorMessage text-start">{error && error}</p>
                    }
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
  );
};

export default CategoryDialogue;
