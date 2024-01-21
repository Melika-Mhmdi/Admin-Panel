"use client"
import { forwardRef } from "react";
// @mui
import { Box } from "@mui/material";


const Page = forwardRef(({ children, title = "", meta, ...other }, ref) => (
    <div>
        <Box ref={ref} {...other}>
            {children}
        </Box>
    </div>
));

export default Page;
