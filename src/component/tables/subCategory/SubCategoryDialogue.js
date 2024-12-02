import React, { useEffect } from "react";
import Button from "../../extras/Button";
import Input, { Select } from "../../extras/Input";
import { useDispatch, useSelector } from "react-redux";
import { editData, objectToFormData, submitData } from "../../../util/fuction";
import { closeDialog } from "../../../redux/slice/dialogueSlice";
import { addSubCategory, updateSubCategory } from "../../../redux/slice/subCategorySlice";
import { getAllCategory } from "../../../redux/slice/categorySlice";
import { DangerRight } from "../../api/toastServices";

const SubCategoryDialogue = ({ data, setData }) => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);

  const { category } = useSelector(
    (state) => state.category
  );
  useEffect(() => {
    // dispatch(getAllCategory())
  }, []);

  const option = category.map((res) => {
    return { name: res.name, value: res._id }
  })

  useEffect(() => {
    if (dialogueData) {
      editData(dialogueData);
    }
  }, [dialogueData]);

  const handleSubmit = async (e) => {
    const addSubCat = submitData(e);
    if (addSubCat) {
      const formData = objectToFormData(addSubCat);

      try {
        let response;
        if (dialogueData) {
          
          const payload = { formData, id: dialogueData._id };
          response = await dispatch(updateSubCategory(payload)).unwrap();
        } else {
          response = await dispatch(addSubCategory(formData)).unwrap();
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
                  <h2 className="text-theme m0">Sub Category Dialogue</h2>
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
                      id={`name`}
                      name={`name`}
                      label={`Name`}
                      placeholder={`Name`}
                      errorMessage={`Enter Name`}
                    />
                  </div>
                  <div className="col-lg-6 col-12">
                    <Select
                      option={option}
                      className={`inputSelect`}
                      id={`categoryId`}
                      name={`categoryId`}
                      label={`Category`}
                      placeholder={`Select Category`}
                      errorMessage={`Select Category`}
                    />
                  </div>

                  <div className="col-12">
                    <Input
                      type={`file`}
                      id={`image`}
                      name={`image`}
                      label={`Image`}
                      errorMessage={`Image is required`}
                      accept={'image/ '}
                    />
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
export default SubCategoryDialogue;