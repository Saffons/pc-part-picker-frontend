import {Button, Stack} from "@mui/material";
import React from "react";
import {ImportContacts} from "@mui/icons-material";

export const commonColumns = [
    {field: 'name', headerName: 'Nazwa', width: 150},
    {field: 'manufacturer', headerName: 'Producent', width: 150},
    {field: 'price', headerName: 'Cena', width: 150},
];

export const CPUColumns = [
    {field: 'cores', headerName: 'Ilość rdzeni', width: 150},
    {field: 'speed', headerName: 'Taktowanie CPU', width: 150},
    {field: 'socket', headerName: 'Gniazdo procesora', width: 150},
]

export const GPUColumns = [
    {field: 'memory', headerName: 'Ilość VRAM', width: 150},
    {field: 'speed', headerName: 'Taktowanie GPU', width: 150},
]

export const MemoryColumns = [
    {field: 'memoryType', headerName: 'Rodzaj pamięci', width: 150},
    {field: 'capacity', headerName: 'Pojemność', width: 150},
    {field: 'speed', headerName: 'Taktowanie RAM', width: 150},
]

export const MotherboardColumns = [
    {field: 'memoryType', headerName: 'Rodzaj pamięci', width: 150},
    {field: 'socket', headerName: 'Gniazdo procesora', width: 150},
    {field: 'chipset', headerName: 'Chipset', width: 150},
    {field: 'm2', headerName: 'Slot M2', width: 150},
]

export const StorageColumns = [
    {field: 'm2', headerName: 'Dysk M2', width: 150},
    {field: 'capacity', headerName: 'Pojemność', width: 150},
    {field: 'speed', headerName: 'Prędkość odczytu', width: 150},
]

export const ButtonColumns = [
    {
        field: 'select', headerName: '', width: 125, renderCell: () => (
            <Stack spacing={1} sx={{width: 1, py: 1}}>
                <React.Fragment>
                    <Button variant="outlined" size="small" startIcon={<ImportContacts/>}>
                        Edit
                    </Button>
                </React.Fragment>
            </Stack>
        ),
    }
]
