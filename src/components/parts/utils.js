export const commonColumns = [
    {field: 'name', headerName: 'Nazwa', width: 200, headerClassName: 'super-app-theme--header-first', headerAlign: 'center'},
    {field: 'manufacturer', headerName: 'Producent', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    {field: 'price', headerName: 'Cena', width: 100, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
];

export const CPUColumns = [
    {field: 'cores', headerName: 'Ilość rdzeni', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    {field: 'speed', headerName: 'Taktowanie CPU (MHz)', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    {field: 'socket', headerName: 'Gniazdo procesora', width: 200, headerClassName: 'super-app-theme--header-last', headerAlign: 'center'},
]

export const GPUColumns = [
    {field: 'memory', headerName: 'Ilość VRAM (MB)', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    {field: 'speed', headerName: 'Taktowanie GPU (MHz)', width: 200, headerClassName: 'super-app-theme--header-last', headerAlign: 'center'},
]

export const MemoryColumns = [
    {field: 'memoryType', headerName: 'Rodzaj pamięci', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    {field: 'capacity', headerName: 'Pojemność (MB)', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    {field: 'speed', headerName: 'Taktowanie RAM (MHz)', width: 200, headerClassName: 'super-app-theme--header-last', headerAlign: 'center'},
]

export const MotherboardColumns = [
    {field: 'memoryType', headerName: 'Rodzaj pamięci', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    {field: 'socket', headerName: 'Gniazdo procesora', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    {field: 'chipset', headerName: 'Chipset', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    {field: 'm2', headerName: 'Slot M2', width: 150, headerClassName: 'super-app-theme--header-last', headerAlign: 'center'},
]

export const StorageColumns = [
    {field: 'm2', headerName: 'Dysk M2', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    {field: 'capacity', headerName: 'Pojemność (GB)', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center'},
    {field: 'speed', headerName: 'Prędkość odczytu (MB/s)', width: 200, headerClassName: 'super-app-theme--header-last', headerAlign: 'center'},
]

export const PartsNames = ["CPU", "GPU", "Pamięć RAM", "Płyta główna", "Dysk"];
