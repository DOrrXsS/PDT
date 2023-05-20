import React, { useState } from 'react';
import { Box, Slider, Stack, TextField } from '@mui/material';


export default function ColorPicker() {
    let [color, setColor] = useState({ r: '0', g: '0', b: '0' })

    return (
        <Box id='colorPicker'>
            <Stack id="colorsPad" sx={{ height: 300, padding: '10px' }} spacing={1} direction="row">
                <Slider max={255} valueLabelDisplay="auto" orientation='vertical' onChange={(e) => setColor({ r: e.target.value, g: color.g, b: color.b })} sx={{ color: `rgb(${color.r},0,0)` }} />
                <Slider max={255} valueLabelDisplay="auto" orientation='vertical' onChange={(e) => setColor({ r: color.r, g: e.target.value, b: color.b })} sx={{ color: `rgb(0, ${color.g},0)` }} />
                <Slider max={255} valueLabelDisplay="auto" orientation='vertical' onChange={(e) => setColor({ r: color.r, g: color.g, b: e.target.value })} sx={{ color: `rgb(0, 0, ${color.b})` }} />
                <Stack justifyContent={'space-around'}>
                    <Box id="chosedColor" sx={{
                        backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
                        width: '200px',
                        height: '50%',
                        alignSelf: "center"
                    }}
                    ></Box>
                    <TextField id="outlined-basic" label="RGB" variant="outlined" value={`${color.r},${color.g},${color.b}`} />
                </Stack>
            </Stack>

        </Box>
    )
}
