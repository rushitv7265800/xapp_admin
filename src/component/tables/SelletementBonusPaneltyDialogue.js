import React, {  useState } from "react";
import Button from "../extras/Button";
import { ExInput } from "../extras/Input";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../redux/slice/dialogueSlice";


import { permissionError } from "../../util/Alert";
import { bonusPenaltySettlement } from "../../redux/slice/payoutSlice";

const SelletementBonusPaneltyDialogue = () => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  const hasPermission = useSelector((state) => state.auth.admin.flag);
  const { setting } = useSelector((state) => state.setting);

  const [bonus, setBonus] = useState(null);

  const [note, setNote] = useState("");
  const [error, setError] = useState();
  const handleSubmit = () => {
    if (!hasPermission) return permissionError();
    if (!bonus) {
      setError("Bonus or Penalty is required");
    } else {
      const payload = {
        data: {
          bonus,

          note,
        },
        settlementId: dialogueData,
      };

      dispatch(bonusPenaltySettlement(payload)).unwrap();

      dispatch(closeDialog());
    }
  };

  return (
    <div className="dialog">
      <div class="w-100">
        <div class="row justify-content-center">
          <div class="col-xl-4 col-md-6 col-11">
            <div class="mainDiaogBox">
              <div class="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-theme m0">Bonus & Panelty Dialog</h2>
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
                <div className={`col-12`}>
                  <ExInput
                    type={`number`}
                    id={`bonus`}
                    name={`bonus`}
                    value={bonus}
                    label={`Bonus/Panelty  (${setting?.currencySymbol})`}
                    placeholder={`Bonus`}
                    errorMessage={error && error}
                    onChange={(e) => {
                      setBonus(e.target.value);
                    }}
                  />
                </div>

                <div className="col-12">
                  <ExInput
                    type={`text`}
                    id={`note`}
                    name={`note`}
                    value={note}
                    label={`Note`}
                    placeholder={`Note`}
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="text-danger text-capitalize">
                Note : you Can either give bonus or penalty.
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

export default SelletementBonusPaneltyDialogue;