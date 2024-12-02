import Button from "../../extras/Button";
import Table from "../../extras/Table";
import ToggleSwitch from "../../extras/ToggleSwitch";
import { openDialog } from "../../../redux/slice/dialogueSlice";
import Title from "../../extras/Title";
import { warning } from "../../../util/Alert";
import { getTax, taxDelete, taxStatus } from "../../../redux/slice/taxSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaxDialogue from "./TaxDialogue";

const Tax = () => {
  const dispatch = useDispatch();
  const { tax, total } = useSelector((state) => state.tax);
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const { setting } = useSelector((state) => state.setting);

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getTax());
  }, []);

  useEffect(() => {
    setData(tax);
  }, [tax]);

  const taxTable = [
    {
      Header: "No",
      Cell: ({ index }) => <span>{index + 1}</span>,
    },
    {
      Header: "Title",
      Cell: ({ row }) => <span className="text-capitalize">{row?.title}</span>,
    },
    {
      Header: "Value",
      Cell: ({ row }) => (
        <span>
          {row?.type === "percent"
            ? row?.value + " %"
            : row?.value + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: "Type",
      Cell: ({ row }) => <span className="text-capitalize">{row?.type}</span>,
    },
    {
      Header: "Status",
      Cell: ({ row }) => (
        <ToggleSwitch
          value={row?.status}
          onClick={() => handleStatus(row?._id)}
        />
      ),
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <span>
          <button
            className="bg-success text-light m5-right p10-x p4-y fs-12 br-5"
            onClick={() => dispatch(openDialog({ type: "tax", data: row }))}
          >
            Edit
          </button>
          <button
            className="bg-danger text-light p10-x p4-y fs-12 br-5"
            onClick={() => handleDelete(row?._id)}
          >
            DELETE
          </button>
        </span>
      ),
    },
  ];

  const handleStatus = (id) => {
    dispatch(taxStatus(id));
  };
  const handleDelete = (id) => {
    const data = warning("Delete");
    data
      .then((logouts) => {
        const yes = logouts.isConfirmed;
        console.log("yes", yes);
        if (yes) {
          dispatch(taxDelete(id));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="mainCategory">
      <Title name="Tax" />
      <Button
        className={`bg-theme p-10 text-white m10-bottom`}
        text={`Add`}
        bIcon={`fa-solid fa-user-plus`}
        onClick={() => {
          dispatch(openDialog({ type: "tax" }));
        }}
      />
      <div>
        <Table
          data={data}
          mapData={taxTable}
          // serverPerPage={rowsPerPage}
          // PerPage={rowsPerPage}
          // Page={page}
          // serverSearching={handleFilterData}
          // type={"server"}
        />
      </div>
      {dialogue && dialogueType === "tax" && (
        <TaxDialogue setData={setData} data={data} />
      )}
    </div>
  );
};

export default Tax;
