/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../../redux/slice/authSlice";
import Male from "../../../src/assets/images/male.png";
import { openDialog } from "../../redux/slice/dialogueSlice";
import NotificationDialog from "../tables/User/NotificationDialog";
import male from "../../assets/images/male.png";
import { getSetting } from "../../redux/slice/settingSlice";
import { baseURL } from "../../util/config";
const Navbar = () => {
  const { admin } = useSelector((state) => state.auth);
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdmin());
    dispatch(getSetting());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/admin/profile");
  };
  const enterFullscreen = () => {
    document.body.requestFullscreen();
  };

  return (
    <>
      <div className="mainNavbar">
        {dialogue && dialogueType === "notification" && (
          <div className="userTable">
            <NotificationDialog />
          </div>
        )}
        <div className="navBar">
          <div className="innerNavbar betBox">
            <div className="leftNav d-flex">
              <i
                className={`${`ri-bar-chart-horizontal-line`} cursor-pointer fs-20 navToggle`}
              ></i>
              <a onClick={enterFullscreen} className="ms-4 text-white cursor">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-maximize"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </a>
            </div>
            <div className="rightNav">
              <div className="adminProfile betBox  cursor-pointer ">
                <button
                  className="bg-theme text-white rounded-circle fs-25 m20-right"
                  onClick={() => dispatch(openDialog({ type: "notification" }))}
                >
                  <i class="fa-regular fa-bell "></i>
                </button>
                <div
                  className="adminPic m20-right "
                  onClick={() => handleNavigate()}
                >
                  <img
                    src={admin ? baseURL + admin?.image : Male}
                    alt="admin"
                    onError={(e) => {
                      e.target.src = male;
                    }}
                  />
                </div>
                <div
                  className="adminDetails me-2"
                  onClick={() => handleNavigate()}
                >
                  <h6 className="m0 text-capitalize">{admin?.name}</h6>
                  <p className="m0">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
