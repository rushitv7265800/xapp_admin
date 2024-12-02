import React, { useEffect, useState } from "react";
import Button from "../../extras/Button";
import { ExInput } from "../../extras/Input";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../../redux/slice/dialogueSlice";
import { cancelBooking } from "../../../redux/slice/bookingSlice";

const CancelBookingDialog = () => {
    const { dialogueData } = useSelector((state) => state.dialogue)
    const dispatch = useDispatch();
    const [reason, setReason] = useState('');
    const [mongoId, setMongoId] = useState('');
    const [error, setError] = useState("")

    console.log('dialogueData', dialogueData)

    useEffect(() => {
        if (dialogueData) {
            setMongoId(dialogueData);
        }
    }, [dialogueData]
    )


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reason ) {
            setError("Reason is Required")
        }
        else {
            if (dialogueData) {
                console.log('dialogueData', dialogueData)
                const payload = {
                    reason: reason,
                    person: 'admin',
                    bookingId: mongoId,
                    status:'cancel'
                };
                dispatch(cancelBooking(payload))
                dispatch(closeDialog());
            } 
        }
    }

    return (
        <div className="dialog">
            <div class="w-100">
                <div class="row justify-content-center">
                    <div class="col-xl-3 col-md-4 col-11">
                        <div class="mainDiaogBox">
                            <div class="row justify-content-between align-items-center formHead">
                                <div className="col-8">
                                    <h2 className="text-theme m0">Cancel Booking</h2>
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
                                    <div className="col-12">
                                        <ExInput
                                            type={`text`}
                                            id={`reason`}
                                            name={`reason`}
                                            label={`Reason`}
                                            placeholder={`Reason`}
                                            value={reason}
                                            onChange={(e) => {
                                                setReason(e.target.value)
                                                if (!e.target.value) {
                                                    return setError(
                                                         "Reason is Required !",
                                                    );
                                                } else {
                                                    setError("");
                                                }
                                            }}
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
    )
}
export default CancelBookingDialog


