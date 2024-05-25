import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Context from "./context";

const CustomModal = ({head, click}) => {
  const { open, setOpen } = useContext(Context);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <Context.Provider value={{ open, setOpen }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ width: "90%" }}>
            <h1>{head}</h1>
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
              id="title"
            />
            <input
              className="dialogInput"
              type="text"
              placeholder="Price"
              id="price"
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            style={{ width: "90%" }}
          >
            {/* <input
              className="dialogInput"
              type="text"
              placeholder="Select Category"
              id="cate"
            /> */}
            <select id="cate" className="dialogInput">
              <option value="0">Select Category</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
            </select>
            <input
              className="dialogInput"
              type="date"
              placeholder="dd/mm/yyyy"
              id="date"
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
              onClick={click}
            >
              Add Expenses
            </button>
            <button
              className="dialogInput dialogBtn dialogBtn2"
              onClick={() => {
                handleClose();
              }}
            >
              Cancle
            </button>
          </Stack>
        </Box>
      </Modal>
    </Context.Provider>
  );
};

export default CustomModal;
