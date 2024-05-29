import { Box, Toolbar } from "@mui/material";
import Navbar from "./Navbar";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

interface Props {
    children: React.ReactNode;
}
export default function Layout(props: Props) {
    return (
        <>
       
            <Navbar />
            <Box component="main" sx={{ p: 3 }}>
                <main>{props.children}</main>
            </Box>
        </>
    )
}