import React, {useEffect, useState} from "react";
import "./transac.style.css";
import BarChartComponent from "./graph";
import { Stack } from "@mui/material";
import MyPagination from "./list";

export default function Transac() {
  return (
    <Stack
      className="transacMainBg"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <div className="firstSection">
        <h1 style={{ fontStyle: "italic" }}>Recent Transaction</h1>
        <div className="BgColor innerFirst">
          <MyPagination />
          {/* <BarChartComponent /> */}
        </div>
      </div>
      <div className="BarDiagramBg">
        <h1 style={{ fontStyle: "italic" }}>Top Expenses</h1>
        <div className="BarDiagram BgColor">
          <BarChartComponent />
        </div>
      </div>
    </Stack>
  );
}
