"use client";
import { useState } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import {  Container, Typography } from "@mui/material";
import Page from "../Page/page";
export default function DashboardApp() {
    const theme = useTheme();
    const [value, setValue] = useState("2022-04-07");
    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome back
                </Typography>

            </Container>
        </Page>

    );
}
