// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "../../extras/Button";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../extras/Title";
import {
  getSetting,
  handleSetting,
  maintenanceMode,
  updateSetting,
} from "../../../redux/slice/settingSlice";
import Input from "../../extras/Input";
import { editData, submitData } from "../../../util/fuction";
import ToggleSwitch from "../../extras/ToggleSwitch";
import { permissionError } from "../../../util/Alert";

const Setting = (props) => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const hasPermission = useSelector((state) => state.auth.admin.flag);

  const [privacyPolicyLink, setPrivacyPolicyLink] = useState();
  const [tnc, setTnc] = useState();
  const [tax, setTax] = useState();
  const [razorPayId, setRazorPayId] = useState("");
  const [razorSecretKey, setRazorSecretKey] = useState("");
  const [stripePublishableKey, setStripePublishableKey] = useState("");
  const [stripeSecretKey, setStripeSecretKey] = useState("");
  const [realUserWin, setRealUserWin] = useState([])
  const [fakeUserWin, setFakeUserWin] = useState([])
  const [loginBonus, setLoginBonus] = useState(0)
  const [minCoinForCashOut, setMinCoinForCashOut] = useState()
  const [maxCoinForCashOut, setMaxCoinForCashOut] = useState()

  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  useEffect(() => {
    if (setting) {
      setStripePublishableKey(setting?.stripePublishableKey);
      setTnc(setting?.termsAndCondition);
      setStripeSecretKey(setting?.stripeSecretKey);
      setRazorPayId(setting?.razorPayId);
      setTax(setting?.tax)
      setRazorSecretKey(setting?.razorPayKey);
      setPrivacyPolicyLink(setting?.privacyPolicyLink);
      if (setting) {
        const transformedData = setting?.percentageRealUserWin && Object.values(setting?.percentageRealUserWin[0]);
        setRealUserWin(transformedData)
        const transformedDataFake = setting?.percentageFakeUserWin && Object.values(setting?.percentageFakeUserWin[0]);
        setFakeUserWin(transformedDataFake)
      }

      setLoginBonus(setting?.loginBonus)
      setMinCoinForCashOut(setting?.minCoinForCashOut)
      setMaxCoinForCashOut(setting?.maxCoinForCashOut)
    }
  }, [setting]);

  const onsubmit = async (e) => {
    e.preventDefault();
    const data = {
      loginBonus: loginBonus,
      minCoinForCashOut: minCoinForCashOut,
      maxCoinForCashOut: maxCoinForCashOut,
      privacyPolicyLink: privacyPolicyLink,
      termsAndCondition: tnc,
      tax: tax,
      stripePublishableKey: stripePublishableKey,
      stripeSecretKey: stripeSecretKey,
      razorPayId: razorPayId,
      razorPayKey: razorSecretKey,
      percentageRealUserWin: [realUserWin],
      percentageFakeUserWin: [fakeUserWin]
    }
    const payload = { data: data, id: setting?._id };
    await dispatch(updateSetting(payload)).unwrap();
};

const handleSettingSwitch = (id, type) => {
  if (!hasPermission) return permissionError();
  const payload = {
    id,
    type,
  };
  dispatch(handleSetting(payload));
};

const handleRealWinInputChange = (index, field, value) => {
  const updatedData = [...realUserWin];
  updatedData[index] = { ...updatedData[index], [field]: value };
  setRealUserWin(updatedData);
};

const handleFakeWinInputChange = (index, field, value) => {
  const updatedData = [...fakeUserWin];
  updatedData[index] = { ...updatedData[index], [field]: value };
  setFakeUserWin(updatedData);
};

const handleAppActive = (id) => {
  if (!hasPermission) return permissionError();
  dispatch(maintenanceMode(id));
};

return (
  <div className="mainSetting">
    <Title name="Setting" />
    <div className="settingBox">
      <div className=" d-flex justify-content-end">
        <div className="  formFooter">
          <Button
            type={`submit`}
            className={`text-light m10-left fw-bold`}
            text={`Submit`}
            style={{ backgroundColor: "#1ebc1e" }}
            onClick={onsubmit}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 mt-3">
          <div className="settingBoxOuter">
            <div className="settingBoxHeader d-flex justify-content-between">
              <h4>App Setting</h4>
              <div className="inputData">
                <label className="me-2">Maintenance Mode</label>
                <ToggleSwitch
                  onClick={() => handleAppActive(setting?._id)}
                  value={setting?.maintenanceMode}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="inputData text  flex-row justify-content-start text-start">
                <label htmlFor="privacyPolicyLink" className="ms-2 order-1">
                  Privacy Policy Link
                </label>
                <input
                  type="text"
                  className="rounded-2"
                  id="privacyPolicyLink"
                  value={privacyPolicyLink}
                  placeholder="Enter privacyPolicyLink"
                  onChange={(e) => {
                    setPrivacyPolicyLink(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="inputData text  flex-row justify-content-start text-start">
                <label htmlFor="tnc" className="ms-2 order-1">
                  Terms And Condition
                </label>
                <input
                  type="text"
                  className="rounded-2"
                  id="tnc"
                  value={tnc}
                  placeholder="Enter tnc"
                  onChange={(e) => {
                    setTnc(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-12 ">
              <div className="inputData text  flex-row justify-content-start text-start">
                <label htmlFor="tax" className="ms-2 order-1">
                  Tax (%)
                </label>
                <input
                  type="number"
                  className="rounded-2"
                  id="tax"
                  value={tax}
                  placeholder="Enter tax"
                  onChange={(e) => {
                    setTax(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-3">
          <div className="settingBoxOuter">
            <div className="settingBoxHeader d-flex justify-content-between">
              <h4>Money Setting</h4>
              <div className="inputData">
                <label className="me-2">Maintenance Mode</label>
                <ToggleSwitch
                  onClick={() => handleAppActive(setting?._id)}
                  value={setting?.maintenanceMode}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="inputData text  flex-row justify-content-start text-start">
                <label htmlFor="privacyPolicyLink" className="ms-2 order-1">
                  Login Bonus
                </label>
                <input
                  type="text"
                  className="rounded-2"
                  id="loginBonus"
                  value={loginBonus}
                  placeholder="Login Bonus"
                  onChange={(e) => {
                    setLoginBonus(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="inputData text  flex-row justify-content-start text-start">
                <label htmlFor="minCoinForCashOut" className="ms-2 order-1">
                  Min Coin For CashOut
                </label>
                <input
                  type="text"
                  className="rounded-2"
                  id="minCoinForCashOut"
                  value={minCoinForCashOut}
                  placeholder="Min Coin For CashOut"
                  onChange={(e) => {
                    setMinCoinForCashOut(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="inputData text  flex-row justify-content-start text-start">
                <label htmlFor="maxCoinForCashOut" className="ms-2 order-1">
                  Max Coin For CashOut
                </label>
                <input
                  type="text"
                  className="rounded-2"
                  id="maxCoinForCashOut"
                  value={maxCoinForCashOut}
                  placeholder="Max Coin For CashOut"
                  onChange={(e) => {
                    setMaxCoinForCashOut(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-3 ">
          <div className="settingBoxOuter">
            <div className="settingBoxHeader d-flex justify-content-between">
              <h4>Razor Pay Setting</h4>
              <div className="inputData">
                <label className="me-2">Razor Pay Active</label>
                <ToggleSwitch
                  onClick={() => handleSettingSwitch(setting?._id, 1)}
                  value={setting?.isRazorPay}
                />
              </div>
            </div>
            <div className="col-12 ">
              <div className="inputData text  flex-row justify-content-start text-start">
                <label htmlFor="razorSecretKey" className="ms-2 order-1">
                  Razorpay Secret Key
                </label>
                <input
                  type="text"
                  className="rounded-2"
                  id="razorSecretKey"
                  value={razorSecretKey}
                  placeholder="Enter Razorpay Secret Key"
                  onChange={(e) => {
                    setRazorSecretKey(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="inputData text  flex-row justify-content-start text-start">
                <label htmlFor="razorPayId" className="ms-2 order-1">
                  RazorPay Id
                </label>
                <input
                  type="text"
                  className="rounded-2"
                  id="razorPayId"
                  value={razorPayId}
                  placeholder="Enter razorPay Id"
                  onChange={(e) => {
                    setRazorPayId(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-3 ">
          <div className="settingBoxOuter">
            <div className="settingBoxHeader d-flex justify-content-between">
              <h4>Stripe Pay Setting</h4>
              <div className="inputData">
                <label className="me-2">Stripe Pay Active</label>
                <ToggleSwitch
                  onClick={() => handleSettingSwitch(setting?._id, 2)}
                  value={setting?.isStripePay}
                />
              </div>
            </div>
            <div className="col-12 ">
              <div className="inputData text  flex-row justify-content-start text-start">
                <label
                  htmlFor="stripePublishableKey"
                  className="ms-2 order-1"
                >
                  Stripe Publishable Key
                </label>
                <input
                  type="text"
                  className="rounded-2"
                  id="stripePublishableKey"
                  value={stripePublishableKey}
                  placeholder="Enter Stripe Publishable Key"
                  onChange={(e) => {
                    setStripePublishableKey(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="inputData text  flex-row justify-content-start text-start">
                <label htmlFor="stripeSecretKey" className="ms-2 order-1">
                  Stripe Secret Key
                </label>
                <input
                  type="text"
                  className="rounded-2"
                  id="stripeSecretKey"
                  value={stripeSecretKey}
                  placeholder="Enter Stripe Secret Key"
                  onChange={(e) => {
                    setStripeSecretKey(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-12 col-md-6 mt-3 ">
            <div className="settingBoxOuter">
              <div className="settingBoxHeader">
                <h4>Firebase Notification Setting</h4>
              </div>

              <div className="inputData text  flex-row justify-content-start text-start">
                <label className="float-left" htmlFor="firebaseKey">
                  Private Key JSON
                </label>
                <textarea
                  name="firebaseKey"
                  className=" mt-2"
                  id="firebaseKey"
                  rows={10}
                  value={firebaseKey}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    try {
                      const newData = JSON.parse(newValue);
                      setfirebaseKey(newValue);
                      setError("");
                    } catch (error) {
                      // Handle invalid JSON input
                      console.error("Invalid JSON input:", error);
                      setfirebaseKey(newValue);
                      return setError({
                        ...error,
                        firebaseKey: "Invalid JSON input",
                      });
                    }
                  }}
                ></textarea>

                {error.firebaseKey && (
                  <div className="pl-1 text-left">
                    <p className="errorMessage">{error.firebaseKey}</p>
                  </div>
                )}
              </div>
            </div>
          </div> */}
        <div className="col-12  mt-3 ">
          <div className="settingBoxOuter">
            <div className="settingBoxHeader">
              <h4>RealUser Win Percentage</h4>
            </div>
            <table width={'100%'}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>percentage</th>
                  <th>yDataStart</th>
                  <th>yDataLimit</th>
                </tr>
              </thead>
              <tbody>
                {realUserWin?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item?.percentage}
                        onChange={(e) => handleRealWinInputChange(index, 'percentage', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item?.yDataStart}
                        onChange={(e) => handleRealWinInputChange(index, 'yDataStart', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item?.yDataLimit}
                        onChange={(e) => handleRealWinInputChange(index, 'yDataLimit', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-12 mt-3 ">
          <div className="settingBoxOuter">
            <div className="settingBoxHeader">
              <h4>Fake Win Percentage</h4>
            </div>
            <table width={'100%'}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>percentage</th>
                  <th>yDataStart</th>
                  <th>yDataLimit</th>
                </tr>
              </thead>
              <tbody>
                {fakeUserWin?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item?.percentage}
                        onChange={(e) => handleFakeWinInputChange(index, 'percentage', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item?.yDataStart}
                        onChange={(e) => handleFakeWinInputChange(index, 'yDataStart', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item?.yDataLimit}
                        onChange={(e) => handleFakeWinInputChange(index, 'yDataLimit', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
export default Setting;
