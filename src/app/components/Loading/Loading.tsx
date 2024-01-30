
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
    // @ts-ignore
    return (
        <div style={{width:"100%",height:"100%"}} >
            <Box sx={{ display: 'flex',alignItems:"center",justifyContent:"center",gap:"20px" }}>
                ... لطفا صبر کنید
            <CircularProgress color="secondary" size={50} />
        </Box></div>
    );
}