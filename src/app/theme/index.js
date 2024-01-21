
"use client";
import { useMemo } from "react";
// material
import { CssBaseline } from "@mui/material";
import {
    ThemeProvider as MUIThemeProvider,
    createTheme,
    StyledEngineProvider,
} from "@mui/material/styles";

import palette2 from "./palette";
import typography from "./typography";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import { useDispatch, useSelector } from "react-redux";

// ----------------------------------------------------------------------

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function ThemeProvider({ children }) {
    const { colors } = useSelector((state) => state.MutiColors);
    const MainColor = colors.find((e) => e.status === true);
    const themeOptions = useMemo(
        () => ({
            palette: {
                primary: { main: MainColor.background },
                secondary: {
                    main: "#5041BC",
                },
                yes_btn:{
                    main:"#FF2020"
                },
                no_btn:{
                    main:"#EFF3F3"
                }
            },

            shape: { borderRadius: 8 },
            typography,
            shadows,
            customShadows,
        }),
        [MainColor.background]
    );

    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);

    return (
        <StyledEngineProvider injectFirst>
            <CacheProvider value={cacheRtl}>
                <MUIThemeProvider theme={theme}>
                    <CssBaseline />
                    {/* <CssModulesSlider /> */}
                    {children}
                </MUIThemeProvider>
            </CacheProvider>
        </StyledEngineProvider>
    );
}
