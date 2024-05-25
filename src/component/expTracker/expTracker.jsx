import React, { useContext, useEffect, useState } from "react";
import "./expTracker.style.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Pie from "./pieChart";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Context from "./../context";
import CustomModal from "../dialog";
import Grid from "@mui/material/Grid";
import Transac from "../transac/transac";

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
};

export default function Tracker() {
  // const [open, setOpen] = React.useState(false);
  const { open, setOpen } = useContext(Context);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const {
    expenses,
    setXpenses,
    bal,
    setBal,
    totalExp,
    setTotalExp,
    percentage,
    setPercentage,
  } = useContext(Context);

  const handleClick3 = () => {
    setOpen3(true);
  };

  const handleClose3 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen3(false);
  };

  useEffect(() => {
    if (localStorage.getItem("bal")) {
      setBal(JSON.parse(localStorage.getItem("bal")));
    } else {
      localStorage.setItem("bal", 0);
    }
  }, []);

  useEffect(() => {
    let totalCount = 0;
    let food = 0;
    let ent = 0;
    let travel = 0;
    expenses.forEach((ele) => {
      totalCount += parseInt(ele.price);

      let price = parseInt(ele.price);
      ele.category == "Entertainment"
        ? (ent += price)
        : ele.category == "Food"
        ? (food += price)
        : (travel += price);
    });
    setTotalExp(totalCount);

    console.log(food, ent, travel);
    console.log(calculatePercentage(food, ent, travel));
    setPercentage(calculatePercentage(food, ent, travel));
  }, [expenses]);

  function calculatePercentage(Food, Entertainment, Travel) {
    const total = Entertainment + Food + Travel;

    const percentageEntertainment = (Entertainment / total) * 100;
    const percentageFood = (Food / total) * 100;
    const percentageTravel = (Travel / total) * 100;

    // return {
    //   Entertainment: percentageEntertainment,
    //   Food: percentageFood,
    //   Travel: percentageTravel,
    // };

    return [
      { name: "Food", value: percentageFood },
      { name: "Entertainment", value: percentageEntertainment },
      { name: "Travel", value: percentageTravel },
    ];
  }

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose3}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose3}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const Card = ({ text, price, PrColor, btn, btnColor, click }) => {
    return (
      <div className="card">
        <Stack direction="row" justifyContent="center" alignItems="center">
          <h1 style={{ margin: 0, marginBottom: "1rem", fontWeight: 400 }}>
            {text}:{" "}
            <span style={{ color: PrColor, fontWeight: 600 }}>{price}₹</span>
          </h1>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            sx={{
              background: btnColor,
              width: "max-content",
              borderRadius: "1rem",
              paddingInline: "2rem",
            }}
            onClick={click}
          >
            <AddIcon />
            {btn}
          </Button>
        </Stack>
      </div>
    );
  };

  return (
    <>
      <div className="expMainBg">
        <h1 style={{ margin: 0, marginBottom: "1rem" }}>Expense Tracker</h1>
        <Stack
          className="subExpBg"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container>
            <Grid item xs={12} md={4} className="myGridItem">
              <Card
                text={"Wallet Balance"}
                price={bal}
                PrColor={"#9DFF5B"}
                btn={"Add Income"}
                btnColor={"linear-gradient(90deg, #B5DC52 0%, #89E148 100%)"}
                click={handleOpen2}
              />
            </Grid>
            <Grid item xs={12} md={4} className="myGridItem">
              <Card
                text={"Expenses"}
                price={totalExp}
                PrColor={"#F4BB4A"}
                btn={"Add Expense"}
                btnColor={
                  "linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)"
                }
                click={handleOpen}
              />
            </Grid>
            <Grid item xs={12} md={4} className="myGridItem">
              <Pie />
            </Grid>
          </Grid>
        </Stack>

        <Transac />
        <CustomModal
          head={"Add Expenses"}
          click={() => {
            if (
              document.getElementById("title").value == "" ||
              document.getElementById("price").value <= 0 ||
              document.getElementById("cate").value == "0" ||
              document.getElementById("date").value == ""
            ) {
              handleClick3();
            } else {
              let againtotal =
                totalExp + parseInt(document.getElementById("price").value);
              if (againtotal > bal) {
                console.log("not possible");
              } else {
                let NewEleNo =
                  expenses.length >= 1
                    ? expenses[expenses.length - 1].ele + 1
                    : 0;
                localStorage.setItem(
                  "trData",
                  JSON.stringify([
                    ...expenses,
                    {
                      title: document.getElementById("title").value,
                      price: document.getElementById("price").value,
                      category: document.getElementById("cate").value,
                      date: document.getElementById("date").value,
                      // ele: NewEleNo,
                    },
                  ])
                );
                setXpenses([
                  ...expenses,
                  {
                    title: document.getElementById("title").value,
                    price: document.getElementById("price").value,
                    category: document.getElementById("cate").value,
                    date: document.getElementById("date").value,
                    // ele: NewEleNo,
                  },
                ]);
                handleClose();
              }
            }
          }}
        />
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ width: "90%" }}>
              <h1>Add Balance</h1>
            </div>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              style={{ width: "90%", marginBlock: "1rem" }}
            >
              <input
                className="dialogInput"
                type="text"
                placeholder="Income Amount"
                id="newBal"
              />
              <button
                className="dialogInput dialogBtn"
                onClick={() => {
                  setBal(
                    bal + parseInt(document.getElementById("newBal").value)
                  );
                  localStorage.setItem(
                    "bal",
                    bal + parseInt(document.getElementById("newBal").value)
                  );
                  handleClose3();
                }}
              >
                Add Expenses
              </button>
              <button
                className="dialogInput dialogBtn dialogBtn2"
                onClick={handleClose2}
              >
                Cancle
              </button>
            </Stack>
          </Box>
        </Modal>
        <Snackbar
          open={open3}
          autoHideDuration={6000}
          onClose={handleClose3}
          message="Give Proper Inputes"
          action={action}
        />
      </div>
      {/* <Transac /> */}
    </>
  );
}
