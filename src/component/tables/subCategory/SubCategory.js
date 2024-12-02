/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import Button from "../../extras/Button";
import Table from "../../extras/Table";
import Pagination from "../../extras/Pagination";
import { openDialog } from "../../../redux/slice/dialogueSlice";
import Title from "../../extras/Title";
import { warning } from "../../../util/Alert";
import { getAllSubCategory , deleteSubCategory, subCategoryStatus} from "../../../redux/slice/subCategorySlice";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import SubCategoryDialogue from "./SubCategoryDialogue";

const SubCategory = () => {

    const { subCategory} = useSelector((state) => state.subCategory)
    const { dialogue, dialogueType } = useSelector((state) => state.dialogue)
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(getAllSubCategory())
    }, [])

    useEffect(() => {
        setData(subCategory);
    }, [subCategory]);

    const dispatch = useDispatch();

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event, 10));
        setPage(0);
    };

    const [search, setSearch] = useState("");
    const handleFilterData = (filteredData) => {
        if (typeof filteredData === "string") {
            setSearch(filteredData);
        } else {
            setData(filteredData);
        }
    };

    function openImage(imageUrl) {
        window.open(imageUrl, "_blank");
    }
    
    const subCategoryTable = [
        {
            Header: "No",
            Cell: ({ index }) => (
                <span>{page * rowsPerPage + parseInt(index) + 1}</span>
            )
        },
        {
            Header: "Image",
            Cell: ({ row }) => (
                <div className="userProfile  d-flex justify-content-center" >
                    <img src={row?.image} alt="image" className="cursor-pointer" style={{ height: "70px", width: "70px", overflow: "hidden" }} onClick={() => openImage(row?.image)} height={`100%`} />
                </div>
            ),
        },
        {
            Header: "Name",
            Cell: ({ row }) => (
                <span className="fw-bold">{row?.name}</span>
            ),
        },
        {
            Header: "Category",
            Cell: ({ row }) => (
                <span>{row?.categoryname}</span>
            ),
        },
       
        {
            Header: "Action",
            Cell: ({ row }) => (
                <span>
                    <button
                        className='bg-success text-light m5-right p10-x p4-y fs-12 br-5'
                        onClick={() => dispatch(openDialog({ type: "subCategory", data: row }))}
                    >Edit</button>
                    <button className='bg-danger text-light p10-x p4-y fs-12 br-5' onClick={() => handleDelete(row._id)}>DELETE</button>
                </span>
            ),
            
        }
    ];
    
    const handleStatus = (id) =>{
        
        dispatch(subCategoryStatus(id))
    }
    const handleDelete = (id) => {
        const data = warning("Delete");
        data
            .then((logouts) => {
                const yes = logouts.isConfirmed
                console.log("yes", yes);
                if (yes) {
                    dispatch(deleteSubCategory(id))
                }
            })
            .catch((err) => console.log(err));
    }

  return (
    <div className="mainCategory">
    <Title name="Subcategory" />
    <Button
        className={`bg-theme p-10 text-white m10-bottom`}
        text={`Add Category`}
        bIcon={`fa-solid fa-user-plus`}
        onClick={() => {
            dispatch(openDialog({ type: "subCategory" }));
        }}
    />
    <div>
        <Table
            data={data}
            mapData={subCategoryTable}
            PerPage={rowsPerPage}
            Page={page}
            type={"client"}
        />
        <Pagination
            type={"client"}
            serverPage={page}
            setServerPage={setPage}
            serverPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            totalData={subCategory?.length}
        />
        
    </div>
    {
      dialogue && dialogueType === "subCategory" && (
        <SubCategoryDialogue setData={setData} data={data} />
      )
    }
</div>
)
}

export default SubCategory
