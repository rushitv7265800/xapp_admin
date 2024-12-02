/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import Button from "../../extras/Button";
import { imageDb } from '../../api/firebaseConfig'
import { ExInput } from "../../extras/Input";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../../redux/slice/dialogueSlice";
import { createdepositPayment, updatedepositPayment } from "../../../redux/slice/depositmethodSlice";
import { permissionError } from "../../../util/Alert";

const DepositmethodDialog = () => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  const hasPermission = useSelector((state) => state.auth.admin.flag);
  const [image, setImage] = useState("");
  const [upiID, setUpiID] = useState("");
  const [imgUrl, setImgUrl] = useState([])
  const [description, setDescription] = useState("")
  const [error, setError] = useState({
    upiID: "",
    description: "",
    imgUrl: "",
  });

  useEffect(() => {
    setUpiID(dialogueData?.upiID)
    setDescription(dialogueData?.description)
    setImgUrl(dialogueData?.imgURL)
    setImage(dialogueData?.imgURL)
  }, [dialogueData])

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setError("");
    const getImg = e.target.files[0]
    const imgRef = ref(imageDb, `depositMethod/${getRandomNumber(1, 1000)}`)
    uploadBytes(imgRef, getImg).then(value => {
      getDownloadURL(value.ref).then(url => {
        setImgUrl(url)
      })
    })
  };

  const handleSubmit = () => {
    if (!hasPermission) return permissionError();
    if (
      !imgUrl ||
      !upiID ||
      !description
    ) {
      let error = {};
      if (!imgUrl) error.imgUrl = "Image is required";
      if (!upiID) error.upiID = "upiID is required";
      if (!description) error.description = "Description is Required";
      return setError({ ...error });
    } else {
      if (dialogueData) {
        const data = {
          imgURL: imgUrl,
          upiID: upiID,
          description: description
        }
        const payload = { data: data, id: dialogueData?._id };
        dispatch(updatedepositPayment(payload)).unwrap();
      } else {
        const data = {
          imgURL: imgUrl,
          upiID: upiID,
          description: description
        }
        dispatch(createdepositPayment(data)).unwrap();
      }
    }
    dispatch(closeDialog());
  };

  return (
    <div className="dialog">
      <div class="w-100">
        <div class="row justify-content-center">
          <div class="col-xl-4 col-md-6 col-11">
            <div class="mainDiaogBox">
              <div class="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-theme m0">Payment Method Dialog</h2>
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
                    type={`text`}
                    id={`upiID`}
                    name={`upiID`}
                    value={upiID}
                    label={`UPI ID`}
                    placeholder={`UPI ID`}
                    errorMessage={error.upiID && error.upiID}
                    onChange={(e) => {
                      setUpiID(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          upiID: `upiId is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          upiID: "",
                        });
                      }
                    }}
                  />
                </div>
                <div className="col-12">
                  <ExInput
                    type={`text`}
                    id={`description`}
                    name={`description`}
                    value={description}
                    label={`Description`}
                    placeholder={`Description`}
                    errorMessage={error.description && error.description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          description: `Description is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          description: "",
                        });
                      }
                    }}
                  />
                </div>
                <div className="col-12">
                  <ExInput
                    label={`Image`}
                    id={`image`}
                    type={`file`}
                    onChange={(e) => handleImage(e)}
                    errorMessage={error && error?.image}
                    accept={"image/*"}
                  />
                  {
                    image && (
                      <img
                        src={image ? image : null}
                        alt=""
                        draggable="false"
                        className={`${(!image || image === "") && "d-none"
                          } `}
                        data-class={`showImage`}
                        style={{ width: "100px", height: "100px" }}
                      />
                    )
                  }
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
                    disabled={imgUrl?.length > 0 ? false : true}
                    style={{ opacity: `${imgUrl?.length > 0 ? "1" : "0.8"}` }}
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

export default DepositmethodDialog;
