import React, { useEffect, useState } from 'react'
import Title from '../extras/Title'
import Button from '../extras/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminCoin, updateAdminCoin } from '../../redux/slice/settingSlice'
import dayjs from 'dayjs'

export default function AdminCoin() {
    const [coin, setCoin] = useState("")
    const [totalCoin, setTotalCoin] = useState("")
    const [updateDate, setUpdateDate] = useState("")
    const dispatch = useDispatch()
    const { adminCoin } = useSelector((state) => state.setting);
    const [error, setError] = useState({
        coin: "",
        totalCoin: ""
    })

    useEffect(() => {
        setCoin(adminCoin?.coin)
        setTotalCoin(adminCoin?.totalCoin)
        const dateUpdate = adminCoin?.updatedAt ? dayjs(adminCoin?.updatedAt).format("DD MMM YYYY, hh:mm A") : "-"
        setUpdateDate(dateUpdate)
    }, [adminCoin])


    const onsubmit = (e) => {
        e.preventDefault()
        let error = {};

        if (coin === null || coin === undefined) {
            error.coin = "Coin is required";
        }

        if (totalCoin === null || totalCoin === undefined) {
            error.totalCoin = "Total Coin is required";
        }

        if (Object.keys(error).length > 0) {
            return setError({ ...error });
        } else {
            const data = {
                coin: parseInt(coin),
                totalCoin: parseInt(totalCoin)
            }
            const payload = {
                data: data,
                id: adminCoin?._id
            }
            dispatch(updateAdminCoin(payload))
        }

    }

    useEffect(() => {
        dispatch(getAdminCoin())
    }, [])

    return (
        <div>
            <div className="mainSetting">
                <Title name="Admin Fund" />
                <div className="settingBox">
                    <div className=" d-flex justify-content-end">
                        {/* <Button
                                type={`submit`}
                                className={`text-light m10-left fw-bold`}
                                text={`Submit`}
                                style={{ backgroundColor: "#1ebc1e" }}
                                onClick={onsubmit}
                            /> */}

                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 mt-3">
                            <div className="settingBoxOuter">
                                <div className="settingBoxHeader d-flex justify-content-between">
                                    <h4>Admin Fund</h4>
                                </div>
                                <form>
                                    <div className="col-12">
                                        <div className="inputData text  flex-row justify-content-start text-start">
                                            <label htmlFor="privacyPolicyLink" className="ms-2 order-1">
                                                Coin
                                            </label>
                                            <input
                                                type="text"
                                                className="rounded-2"
                                                id="coin"
                                                value={coin}
                                                placeholder="Admin Coin"
                                                onChange={(e) => {
                                                    setCoin(e.target.value);
                                                    if (!e.target.value) {
                                                        return setError({
                                                            ...error,
                                                            coin: `Coin is Required`,
                                                        });
                                                    } else {
                                                        return setError({
                                                            ...error,
                                                            coin: "",
                                                        });
                                                    }
                                                }}
                                            />
                                            {error.coin && (
                                                <p className="errorMessage text-capitalize">
                                                    {error.coin && error.coin}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="inputData text  flex-row justify-content-start text-start">
                                            <label htmlFor="tnc" className="ms-2 order-1">
                                                Total Coin
                                            </label>
                                            <input
                                                type="text"
                                                className="rounded-2"
                                                id="totalCoin"
                                                value={totalCoin}
                                                placeholder="Total Coin"
                                                onChange={(e) => {
                                                    setTotalCoin(e.target.value);
                                                    if (!e.target.value) {
                                                        return setError({
                                                            ...error,
                                                            totalCoin: `Total Coin is Required`,
                                                        });
                                                    } else {
                                                        return setError({
                                                            ...error,
                                                            totalCoin: "",
                                                        });
                                                    }
                                                }}
                                            />
                                            {error.totalCoin && (
                                                <p className="errorMessage text-capitalize">
                                                    {error.totalCoin && error.totalCoin}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="inputData text  flex-row justify-content-start text-start">
                                            <label htmlFor="tnc" className="ms-2 order-1">
                                                Last Update Coin
                                            </label>
                                            <input
                                                type="text"
                                                className="rounded-2"
                                                id="updateDate"
                                                value={updateDate}
                                                placeholder="Last Update Coin"
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            type={`submit`}
                                            className={`text-light m10-left fw-bold`}
                                            text={`Submit`}
                                            style={{ backgroundColor: "#1ebc1e" }}
                                            onClick={onsubmit}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
