import { createTheme, ThemeProvider } from "@mui/material";

const themes=createTheme({
    palette: {
    }
});
export const ThemeProviderStyles = ({ children }) => {
    return (
        <ThemeProvider theme={themes}>
             {children}
        </ThemeProvider>
    )
}