import React, { useEffect, useState } from "react";
import "./transac.style.css";
import BarChartComponent from "./graph";
import { Stack } from "@mui/material";
import MyPagination from "./list";
import Grid from "@mui/material/Grid";

export default function Transac() {
  return (
    <Stack
      className="transacMainBg"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid container>
        <Grid item xs={12} md={8} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div className="firstSection">
            <h1 style={{ fontStyle: "italic" }}>Recent Transaction</h1>
            <div className="BgColor innerFirst">
              <MyPagination />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div className="BarDiagramBg">
            <h1 style={{ fontStyle: "italic" }}>Top Expenses</h1>
            <div className="BarDiagram BgColor">
              <BarChartComponent />
            </div>
          </div>
        </Grid>
      </Grid>
    </Stack>
  );
}
