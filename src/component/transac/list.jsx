import React, { useState, useEffect, useContext, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/material";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import RedeemIcon from "@mui/icons-material/Redeem";
import LuggageIcon from "@mui/icons-material/Luggage";
import Context from "./../context";

function MyPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [currentObj, setCurrentObj] = useState([]);
  const { expenses, setXpenses } = useContext(Context);
  const totalPages = 10;
  const objToEdit = useRef();

  const [open4, setOpen4] = useState(false);
  // const handleOpen4 = () => setOpen4(true);
  // const handleClose4 = () => setOpen4(false);

  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);

  const handleEdit = ({ array, index }) => {
    console.log(array[index]);
    handleOpen4();
    setTimeout(() => {
      document.getElementById("title2").value = array[index].title;
      document.getElementById("price2").value = array[index].price;
      document.getElementById("date2").value = array[index].date;
      document.getElementById("cate2").value = array[index].category;
      objToEdit.current = index;
      console.log(objToEdit.current);
    }, 500);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    // width: "max-content"
    height: "max-content",
    bgcolor: "rgba(239,239,239,0.85)",
    borderRadius: "1rem",
    boxShadow: 24,
    p: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "0px",
  };

  function getOut(data, page) {
    let PrePageNo = page > 1 ? 3 * (page - 1) : 0;
    let PageNo = 3 * page;
    let NewArray = [];
    data.forEach((ele, i) => {
      if (NewArray.length <= 3) {
        if (i >= PrePageNo && i < PageNo) {
          NewArray.push({ ...ele, ele2: i });
        }
      }
    });
    setCurrentObj(NewArray);
  }

  function DelElement(array, index) {
    let newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
  }

  // useEffect(() => {
  //   console.log("currentObj");
  //   console.log(currentObj);
  // }, [currentObj]);

  useEffect(() => {
    if (localStorage.getItem("trData")) {
      console.log(JSON.parse(localStorage.getItem("trData")));
      setXpenses(JSON.parse(localStorage.getItem("trData")));
    } else {
      localStorage.setItem("trData", JSON.stringify([]));
    }

  }, []);

  useEffect(() => {
    // console.log(expenses);
    setPages(Math.ceil(expenses.length / 3));
    getOut(expenses, currentPage);
  }, [expenses]);

  useEffect(() => {
    getOut(expenses, currentPage);
  }, [currentPage]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const Item = ({ name, date, cate, price, click, clickedit }) => {
    return (
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              {/* <ImageIcon /> */}
              {cate == "Food" ? (
                <LocalPizzaIcon />
              ) : cate == "Entertainment" ? (
                <RedeemIcon />
              ) : (
                <LuggageIcon />
              )}
            </Avatar>
          </ListItemAvatar>
          <div
            style={{
              color: "black",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              <p style={{ margin: "0" }}>{name}</p>
              <p style={{ margin: "0", color: "#9B9B9B" }}>{date}</p>
            </div>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              // sx={{width : "15%"}}
            >
              <h3 style={{ color: "#F4BB4A", marginInline: "1rem" }}>
                {price}₹
              </h3>
              <HighlightOffIcon
                style={{
                  borderRadius: "1rem",
                  backgroundColor: "#FF3E3E",
                  padding: "0.5rem",
                  color: "white",
                  marginInline: "0.5rem",
                  boxShadow: "0px 4px 4px 0px #00000040",
                  cursor: "pointer",
                }}
                onClick={click}
              />
              <EditIcon
                style={{
                  borderRadius: "1rem",
                  backgroundColor: "#F4BB4A",
                  padding: "0.5rem",
                  color: "white",
                  boxShadow: "0px 4px 4px 0px #00000040",
                  cursor: "pointer",
                }}
                onClick={clickedit}
              />
            </Stack>
          </div>
        </ListItem>
        <Divider />
      </List>
    );
  };

  return (
    <Context.Provider value={{ expenses, setXpenses }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          {currentObj.map((ele, i) => (
            <Item
              name={ele.title}
              date={ele.date}
              cate={ele.category}
              price={parseInt(ele.price)}
              click={() => {
                // console.log(ele.ele2)
                setXpenses(DelElement(expenses, ele.ele2));
                localStorage.setItem(
                  "trData",
                  JSON.stringify(DelElement(expenses, ele.ele2))
                );
              }}
              // clickedit={() => {
              //   objToDel = ele.ele;
              //   console.log(objToDel);
              //   // handleOpen4;
              //   setOpen4(true);
              // }}
              clickedit={() => {
                handleEdit({ array: expenses, index: ele.ele2 });
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "1rem",
          }}
        >
          <IconButton
            className="arrow"
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </IconButton>
          <span className="count">{currentPage}</span>
          <IconButton
            className="arrow"
            onClick={handleNextClick}
            disabled={currentPage === pages}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
      <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ width: "90%" }}>
            <h1>Edit Expenses</h1>
          </div>
          <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            style={{ width: "90%" }}
          >
            <input
              className="dialogInput"
              type="text"
              placeholder="Title"
              id="title2"
            />
            <input
              className="dialogInput"
              type="text"
              placeholder="Price"
              id="price2"
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            style={{ width: "90%" }}
          >
            <select id="cate2" className="dialogInput">
              <option value="0">Select Category</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
            </select>
            <input
              className="dialogInput"
              type="date"
              placeholder="dd/mm/yyyy"
              id="date2"
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            style={{ width: "90%", marginBlock: "1rem" }}
          >
            <button
              className="dialogInput dialogBtn"
              onClick={() => {
                let NewArray = [...expenses];
                NewArray[objToEdit.current].title = document.getElementById("title2").value;
                NewArray[objToEdit.current].price = document.getElementById("price2").value;
                NewArray[objToEdit.current].date = document.getElementById("date2").value;
                NewArray[objToEdit.current].category = document.getElementById("cate2").value;
                setXpenses(NewArray);
                handleClose4();
              }}
            >
              Edit Expenses
            </button>
            <button
              className="dialogInput dialogBtn dialogBtn2"
              onClick={() => {
                handleClose4();
              }}
            >
              Cancle
            </button>
          </Stack>
        </Box>
      </Modal>
    </Context.Provider>
  );
}

export default MyPagination;
