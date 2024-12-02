/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import Table from "../../extras/Table";
import Button from "../../extras/Button";
import Pagination from "../../extras/Pagination";
import Title from "../../extras/Title";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  expertDelete,
  getAllExpert,
  blockExpert,
} from "../../../redux/slice/expertSlice";
import { openDialog } from "../../../redux/slice/dialogueSlice";
import { DepositDialogue } from "./DepositDialogue";
import { acceptReq, permissionError, warning } from "../../../util/Alert";
import ToggleSwitch from "../../extras/ToggleSwitch";
import { useNavigate } from "react-router-dom";
import Searching from "../../extras/Searching";
import Male from "../../../assets/images/male.png";
import NotificationDialog from "../User/NotificationDialog";
import { depositAction, getAllDeposit } from "../../../redux/slice/depositSlice";
import { LeftNotifier, Success } from "../../api/toastServices";


export const Deposit = () => {
  const [data, setData] = useState([]);

  const { depositData, totalDeposit } = useSelector((state) => state.deposit);
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const hasPermission = useSelector((state) => state.auth.admin.flag);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };


  const handleFilterData = (filteredData) => {
    if (typeof filteredData === "string") {
      setSearch(filteredData);
    } else {
      setData(filteredData);
    }
  };

  useEffect(() => {
    const payload = {
      start: page,
      limit: rowsPerPage,
      search,
    };
    dispatch(getAllDeposit(payload));
  }, [page, rowsPerPage, search]);

  useEffect(() => {
    setData(depositData);
  }, [depositData]);


  function openImage(imageUrl) {
    // Open the image in a new tab or window
    window.open(imageUrl, "_blank");
  }

  const handleInfo = (id) => {
    if (id === "65d78e527523d4dbb9a508ed") return permissionError();
    navigate("/admin/expert/getExpertProfile", {
      state: {
        id,
      },
    });
  };

  const expertTable = [
    {
      Header: "No",
      Cell: ({ index }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      ),
    },
    {
      Header: "Unique Id",
      Cell: ({ row }) => (
        <span>{row?.uniqueId}</span>
      ),
    },  
    {
      Header: "Image",
      Cell: ({ row }) => (
        <div
          className="userProfile  d-flex justify-content-center"

        >
          <img
            src={row && row.imageUrl ? row.imageUrl : Male}
            alt="imageUrl"
            style={{ height: "70px", width: "70px", overflow: "hidden" }}
            className="cursor-pointer"
            onClick={() => openImage(row && row.imageUrl)}
            height={`100%`}
            onError={(e) => {
              e.target.src = Male;
            }}
          />
        </div>
      ),
    },
    {
      Header: "Name",
      Cell: ({ row }) => (
        <span
          className="text-capitalize fw-bold cursor"
          onClick={() => handleInfo(row._id)}
        >
          {row?.username ? row?.username : "-"}
        </span>
      ),
    },
    {
      Header: "Mobile No",
      Cell: ({ row }) => <span>{row?.mobileNumber ? row?.mobileNumber : "-"}</span>,
    },
    {
      Header: "Deposit Amount ",
      Cell: ({ row }) => <span className="text-capitalize">{row?.diamond}</span>,
      sorting: { type: "client" },
    },
    {
      Header: "Date",
      Cell: ({ row }) => <span className="text-capitalize text-nowrap">{row?.date}</span>,
    },
    {
      Header: "Status ",
      Cell: ({ row }) =>
        <div>
          {
            row?.status === 0 ?
              <span style={{ color: "#efbb00", width: "70px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center",backgroundColor: "rgb(254, 240, 191)", borderRadius: "6px", padding: "10px" }}>Pending</span>
              : row?.status === 1 ?
                <span style={{ color: "#11c00d", width: "70px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center",backgroundColor: "rgb(222, 255, 223)", borderRadius: "6px", padding: "10px" }}>Receive</span>
                : row?.status === 2 ?
                  <span style={{ color: "#ed1717", width: "70px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center",backgroundColor: "rgb(255, 241, 241)", borderRadius: "6px", padding: "10px" }}>Reject</span>
                  : "-"}
        </div>,
      sorting: { type: "client" },
    },
    {
      Header: "Accept Req",
      Cell: ({ row }) => (
        <span className="d-flex justify-content-center">
          {
            row?.status === 0 ? (
              <button
                className="py-1 ms-2"
                data-toggle="tooltip" data-placement="top" title="Accept Request"
                style={{ backgroundColor: "#DEFFDF", borderRadius: "8px" }}
                onClick={() => handleEarning(row)}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5421 5.96034C14.0507 3.45314 18.1527 3.45314 20.6599 5.96034C22.3088 7.60919 22.8739 9.94985 22.3534 12.0708C22.3116 12.0912 22.2698 12.1112 22.2295 12.1339L20.3828 13.1384C20.871 12.338 21.1145 11.4288 21.1145 10.5183C21.1145 9.23242 20.6262 7.94656 19.6511 6.97006H19.6497C18.6746 5.99356 17.3888 5.50673 16.1015 5.50673V5.50531C14.8142 5.50531 13.5283 5.99356 12.5518 6.97006C11.5753 7.94656 11.0871 9.23242 11.0871 10.5183C11.0871 10.8063 11.1113 11.0938 11.1597 11.3776C10.6766 11.3225 10.1965 11.332 9.72196 11.4032C9.45862 9.47109 10.065 7.43885 11.5421 5.96034ZM17.4642 12.5349C17.3917 12.6092 17.3113 12.6756 17.2246 12.7327C17.1383 12.789 17.047 12.8372 16.9518 12.8765C16.8255 12.9292 16.6908 12.9681 16.5494 12.9923L17.4006 13.2651C17.8419 13.4075 18.2172 13.6793 18.4886 14.0333C18.7064 13.8853 18.9124 13.7159 19.1045 13.5237C19.9301 12.6981 20.3434 11.6082 20.3434 10.5188C20.3434 9.43076 19.9306 8.34133 19.1045 7.51524C18.2775 6.68821 17.189 6.27493 16.101 6.27493V6.27635C15.0116 6.27635 13.9221 6.68916 13.0961 7.51524C12.2704 8.34086 11.8572 9.43076 11.8572 10.5188C11.8572 10.859 11.8975 11.1992 11.9782 11.5313C12.0963 11.5607 12.2149 11.5959 12.3331 11.6333L14.8417 12.4419C14.7446 12.3433 14.6576 12.2352 14.5822 12.1192C14.5053 12.0034 14.4384 11.8744 14.3777 11.732C14.297 11.5356 14.39 11.3112 14.586 11.2291C14.7824 11.147 15.0068 11.2414 15.0889 11.4364C15.1278 11.5318 15.1748 11.6191 15.226 11.6974C15.4092 11.9773 15.6564 12.1401 15.9136 12.2084C16.1717 12.2782 16.4369 12.2568 16.6547 12.1652C16.706 12.1439 16.7558 12.1183 16.8013 12.0874C16.8431 12.0604 16.8806 12.031 16.9114 11.9987C17.003 11.9047 17.0609 11.789 17.077 11.668C17.0932 11.5536 17.0704 11.4341 16.9992 11.3249C16.9736 11.2874 16.9456 11.2523 16.9119 11.2201C16.7857 11.0962 16.5043 11.0303 16.2082 10.9605C15.7508 10.8514 15.264 10.737 14.8915 10.3551C14.7572 10.2165 14.659 10.0509 14.5997 9.87346C14.5191 9.63811 14.5043 9.38141 14.558 9.13515C14.613 8.88652 14.7383 8.64833 14.9361 8.45473C15.0785 8.31618 15.2588 8.20183 15.477 8.12781C15.5283 8.11025 15.5819 8.09555 15.6384 8.08084C15.664 8.07562 15.6896 8.06897 15.7152 8.06328V7.48772C15.7152 7.27515 15.8875 7.10149 16.1015 7.10149C16.314 7.10149 16.4863 7.27515 16.4863 7.48772V8.04715C16.6059 8.06755 16.7231 8.09697 16.836 8.13872C17.2436 8.28914 17.5866 8.58237 17.7427 9.0412C17.7551 9.07869 17.7669 9.12044 17.7779 9.16362C17.8291 9.36955 17.7024 9.57785 17.497 9.6291C17.2896 9.68034 17.0813 9.55365 17.0315 9.3482C17.0263 9.32827 17.0206 9.30929 17.0125 9.28746C16.9413 9.07489 16.7729 8.93634 16.5712 8.86232C16.3373 8.77644 16.064 8.76837 15.822 8.82863C15.7897 8.8367 15.7575 8.84619 15.7238 8.8571C15.6203 8.89364 15.5368 8.94441 15.4723 9.00657C15.3888 9.08865 15.3366 9.19067 15.3124 9.29838C15.2882 9.40988 15.2948 9.52423 15.33 9.62672C15.3542 9.69932 15.3931 9.7667 15.4443 9.81889C15.6583 10.0395 16.0336 10.1268 16.3843 10.2103C16.7876 10.3057 17.1686 10.3944 17.4495 10.6692C17.5264 10.7446 17.5919 10.8239 17.6445 10.9031C17.822 11.1759 17.8799 11.4801 17.841 11.7705C17.8016 12.0533 17.6687 12.3237 17.4642 12.5349ZM22.5982 12.8105L18.882 14.8333C18.9883 15.2342 18.984 15.667 18.8483 16.0897C18.4701 17.2651 17.2009 17.9161 16.0251 17.5369C14.6989 17.1104 13.3727 16.6829 12.0465 16.2563C11.8705 16.1984 11.7722 16.0077 11.8287 15.8312L11.8581 15.7396C11.9146 15.5621 12.1058 15.4653 12.2833 15.5218C13.6095 15.9493 14.9357 16.3759 16.2619 16.8034C17.0324 17.0511 17.8666 16.6231 18.1138 15.8525C18.1826 15.6414 18.1997 15.4259 18.1731 15.2191C18.1033 14.6691 17.7238 14.1795 17.1643 13.9991C15.4752 13.4559 13.7869 12.9111 12.0977 12.3679C10.7459 11.9323 9.42114 12.0556 8.17418 12.7351L4.90162 14.5159L8.02234 19.935C8.89113 19.498 9.80832 19.4292 10.7445 19.7305L12.5964 20.3265C13.5758 20.6425 14.5347 20.5523 15.4386 20.0617L24.0051 15.3984C24.7168 15.0112 24.983 14.1125 24.5953 13.4013C24.2081 12.6896 23.3095 12.4248 22.5982 12.8105ZM3.62951 13.8544C3.52465 13.6703 3.28788 13.6067 3.10473 13.713L1.19206 14.8148C1.00891 14.9197 0.945801 15.1564 1.05066 15.3396L5.35191 22.8071C5.4582 22.9912 5.69355 23.0548 5.8767 22.9485L7.78937 21.8467C7.97252 21.7419 8.03705 21.5051 7.93076 21.3219L3.62951 13.8544ZM9.28354 6.74325C9.49611 6.74325 9.66835 6.56959 9.66835 6.35701V3.38481C9.66835 3.17224 9.49611 3 9.28354 3C9.06954 3 8.8973 3.17224 8.8973 3.38481V6.35749C8.89777 6.56959 9.07001 6.74325 9.28354 6.74325ZM7.29447 9.23574C7.50705 9.23574 7.67929 9.06208 7.67929 8.84951V5.87683C7.67929 5.66426 7.50705 5.49202 7.29447 5.49202C7.08048 5.49202 6.90824 5.66426 6.90824 5.87683V8.84951C6.90824 9.06208 7.08048 9.23574 7.29447 9.23574ZM22.9194 6.74325C23.132 6.74325 23.3042 6.56959 23.3042 6.35701V3.38481C23.3042 3.17224 23.132 3 22.9194 3C22.7054 3 22.5332 3.17224 22.5332 3.38481V6.35749C22.5337 6.56959 22.7054 6.74325 22.9194 6.74325ZM24.909 5.49249C24.695 5.49249 24.5227 5.66473 24.5227 5.87731V8.84998C24.5227 9.06256 24.695 9.23622 24.909 9.23622C25.1215 9.23622 25.2938 9.06256 25.2938 8.84998V5.87731C25.2933 5.66473 25.1211 5.49249 24.909 5.49249Z"
                    fill="#11C00D"
                  />
                </svg>
              </button>
            ) : row?.status === 1 && (
              <span style={{ color: "#11C00D", outline: "1px solid #11C00D", display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "40px", paddingTop: '1px', width: "24px", height: "24px" }}><i class="fa-solid fa-circle-check" style={{ fontSize: '20px' }}></i></span>
            )
          }

        </span>
      ),
    },
    // {
    //   Header: "Decline Req",
    //   Cell: ({ row }) => (
    //     <span style={{display:'flex',justifyContent:"center"}}>
    //       {
    //         row?.status === 0 ? (
    //           <button
    //             className="py-1"
    //             data-toggle="tooltip" data-placement="top" title="Decline Request"
    //             style={{ backgroundColor: "#FFF1F1", borderRadius: "8px" }}
    //             onClick={() => handleDelete(row?._id)}
    //           >
    //             <svg
    //               width="26"
    //               height="26"
    //               viewBox="0 0 26 26"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <path
    //                 d="M19.9062 5.6875H16.25V5.28125C16.25 4.16122 15.3388 3.25 14.2188 3.25H11.7812C10.6612 3.25 9.75 4.16122 9.75 5.28125V5.6875H6.09375C5.87826 5.6875 5.6716 5.7731 5.51923 5.92548C5.36685 6.07785 5.28125 6.28451 5.28125 6.5V7.71875C5.28125 7.93424 5.36685 8.1409 5.51923 8.29327C5.6716 8.44565 5.87826 8.53125 6.09375 8.53125H19.9062C20.1217 8.53125 20.3284 8.44565 20.4808 8.29327C20.6331 8.1409 20.7188 7.93424 20.7188 7.71875V6.5C20.7188 6.28451 20.6331 6.07785 20.4808 5.92548C20.3284 5.7731 20.1217 5.6875 19.9062 5.6875ZM11.375 5.28125C11.375 5.05741 11.5574 4.875 11.7812 4.875H14.2188C14.4426 4.875 14.625 5.05741 14.625 5.28125V5.6875H11.375V5.28125ZM19.6137 9.60984C19.5376 9.52606 19.4448 9.45912 19.3412 9.4133C19.2377 9.36747 19.1257 9.34379 19.0125 9.34375H6.9875C6.87427 9.3438 6.7623 9.36751 6.65877 9.41335C6.55524 9.4592 6.46242 9.52616 6.38628 9.60996C6.31013 9.69376 6.25233 9.79254 6.21657 9.89997C6.18082 10.0074 6.1679 10.1211 6.17866 10.2338L7.17722 20.6696C7.29056 21.8558 8.33422 22.7504 9.60497 22.7504H16.395C17.6654 22.7504 18.7094 21.8558 18.8228 20.6696L19.8213 10.2338C19.8321 10.1211 19.8193 10.0074 19.7835 9.8999C19.7477 9.79244 19.6899 9.69364 19.6137 9.60984ZM11.1012 20.7171C11.0837 20.7179 11.0667 20.7187 11.0492 20.7187C10.8427 20.7185 10.644 20.6397 10.4936 20.4983C10.3431 20.3569 10.2521 20.1635 10.2391 19.9574L9.75163 12.2387C9.73816 12.0237 9.81061 11.8121 9.95306 11.6504C10.0955 11.4888 10.2963 11.3903 10.5113 11.3766C10.7262 11.3636 10.9376 11.4362 11.0991 11.5786C11.2607 11.7209 11.3593 11.9215 11.3734 12.1363L11.8609 19.8551C11.8743 20.0701 11.8019 20.2817 11.6594 20.4433C11.517 20.605 11.3162 20.7034 11.1012 20.7171ZM15.7609 19.9574C15.7547 20.0643 15.7274 20.1689 15.6807 20.2652C15.634 20.3615 15.5686 20.4477 15.4885 20.5186C15.4084 20.5896 15.315 20.6441 15.2138 20.6789C15.1125 20.7137 15.0054 20.7281 14.8985 20.7213C14.7917 20.7146 14.6872 20.6868 14.5912 20.6396C14.4951 20.5923 14.4093 20.5266 14.3388 20.4461C14.2682 20.3656 14.2142 20.2719 14.18 20.1705C14.1457 20.0691 14.1318 19.9619 14.1391 19.8551L14.6266 12.1363C14.6413 11.9221 14.7401 11.7223 14.9016 11.5807C15.0631 11.4392 15.2741 11.3673 15.4884 11.3808C15.7028 11.3944 15.903 11.4922 16.0454 11.6529C16.1878 11.8137 16.2608 12.0243 16.2484 12.2387L15.7609 19.9574Z"
    //                 fill="#ED1717"
    //               />
    //             </svg>
    //           </button>
    //         ) : row?.status === 2 && (
    //           <span style={{ color: "#ED1717", outline: "1px solid #ED1717", display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "40px", paddingTop: '1px', width: "24px", height: "24px" }}><i class="fa-solid fa-circle-xmark" style={{ fontSize: '20px' }}></i></span>
    //         )
    //       }
    //     </span>
    //   ),
    // },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <span className="d-flex justify-content-center">
          <button
            className="py-1 me-2"
            style={{ backgroundColor: "#CFF3FF", borderRadius: "8px" }}
            onClick={() => handleOpenDialog(row)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0377 7.22744L5.50073 16.7652C5.4527 16.8133 5.41848 16.8735 5.40162 16.9394L4.34449 21.1823C4.32895 21.2453 4.3299 21.3112 4.34726 21.3737C4.36462 21.4362 4.3978 21.4931 4.4436 21.5391C4.51395 21.6092 4.6092 21.6486 4.70852 21.6487C4.73916 21.6487 4.76968 21.6449 4.79939 21.6374L9.04235 20.5801C9.10832 20.5636 9.16854 20.5294 9.21656 20.4812L18.7545 10.9441L15.0377 7.22744ZM21.1172 5.92698L20.0556 4.86538C19.346 4.15585 18.1094 4.15655 17.4006 4.86538L16.1002 6.16585L19.8168 9.88235L21.1172 8.58193C21.4716 8.22765 21.6668 7.75607 21.6668 7.25454C21.6668 6.75301 21.4716 6.28143 21.1172 5.92698Z"
                fill="#059CF1"
              />
            </svg>
          </button>
        </span>
      ),
    },
  ];

  const handleOpenDialog = (row) => {
    if (row?._id === "65d78e527523d4dbb9a508ed") {
      return permissionError();
    } else {
      dispatch(openDialog({ type: "expert", data: row }));
    }
  };

  const handleBlock = (id) => {
    if (!hasPermission) return permissionError();
    if (id === "65d78e527523d4dbb9a508ed") {
      return permissionError();
    } else {
      dispatch(blockExpert(id));
    }
  };

  const handleEarning = async (row) => {
    if(row?.diamond !== 0){
      try {
        const data = await acceptReq("Delete");
        const yes = data.isConfirmed;
        console.log("yes", yes);
        if (yes) {
          const payload = {
            id: row?._id,
            type: 'accept'
          }
          dispatch(depositAction(payload))
        }
      } catch (err) {
        console.log(err);
      }
    }else{
      LeftNotifier("First Amount Update !!")
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await warning("Delete");
      const yes = data.isConfirmed;
      console.log("yes", yes);
      if (yes) {
        const payload = {
          id: id,
          type: 'decline'
        }
        dispatch(depositAction(payload))
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mainExpert">
      <Title name="Deposit" />
      {dialogue && dialogueType === "notification" && (
        <div className="userTable">
          <NotificationDialog />
        </div>
      )}
      <div className="betBox">
        <div className="col-md-8 col-lg-5  ms-auto">
          <Searching
            type={`server`}
            data={data}
            setData={setData}
            column={expertTable}
            serverSearching={handleFilterData}
          />
        </div>
      </div>
      <div>
        <Table
          data={data}
          mapData={expertTable}
          serverPerPage={rowsPerPage}
          Page={page}
        />
        <Pagination
          type={"server"}
          serverPage={page}
          setServerPage={setPage}
          serverPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          totalData={totalDeposit}
        />
      </div>
      {dialogue && dialogueType === "expert" && (
        <DepositDialogue setData={setData} data={data} />
      )}
    </div>
  );
};
