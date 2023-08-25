import styled from "@mui/styled-engine";
import {
    commonColumns,
    CPUColumns,
    GPUColumns,
    MemoryColumns,
    MotherboardColumns,
    StorageColumns
} from "./utils";
import './style.scss';
import {DataGrid} from "@mui/x-data-grid";
import {deletePart, fetchAndStoreDataInMap, partsTypes} from "../../fetch/fetch";
import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {Button, Stack} from "@mui/material";
import {Delete} from "@mui/icons-material";

export const partsArray = [
    {id: "cpu", name: "Procesory", columns: CPUColumns},
    {id: "gpu", name: "Karty graficzne", columns: GPUColumns},
    {id: "memory", name: "Pamięci RAM", columns: MemoryColumns},
    {id: "motherboard", name: "Płyty główne", columns: MotherboardColumns},
    {id: "storage", name: "Dyski", columns: StorageColumns},
];

/**
 * Function that creates table columns that are needed for the DataGrid component
 * @returns {*[]} object with columns and their properties
 */
export const createColumns = () => {
    const arr = [];

    partsArray.forEach(obj => {
        arr.push({id: obj.id, name: obj.name, columns: commonColumns.concat(obj.columns)});
    })

    return arr;
}

/**
 * Function that renders DataGrid table filled with all parts' data together with control buttons
 * @param array Array of columns' information
 * @param data Map of all parts' data fetched from backend
 * @param isAdmin Boolean
 * @returns {*} JSX element with the table
 */
function renderTables(array, data, isAdmin) {
    return array.map((col, index) => {
        let arr = data.get(array[index].id).map((el) => {
            return <DeleteButton variant="contained" startIcon={<Delete/>} onClick={async () => {
                await deletePart(array[index].id, el.id).then(() => {
                    window.location.reload(false);
                }).catch((err) => {
                    alert(err);
                });
            }}>DELETE</DeleteButton>
        })
        return <div key={array[index].id}>
            <h3 className={'h3-lista'}>{col.name}</h3>
            <Stack direction="row">
                <PartsDataGrid rows={data.get(col.id)} columns={col.columns} sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                }}/>
                <Stack direction="column" spacing={2.5} sx={{marginTop: "4.31rem"}}>
                    {isAdmin && arr}
                </Stack>
            </Stack>

        </div>
    })
}

/**
 * Functional component for Parts table
 * @returns {JSX.Element}
 * @constructor
 */

function Parts() {
    let partsData = useRef(new Map());
    const [loading, setLoading] = useState(true);
    const {isLoggedIn, isAdmin} = useAuth();
    useEffect(() => {
        if (isLoggedIn) {
            fetchAndStoreDataInMap(partsTypes)
                .then((resultMap) => {
                    partsData.current = resultMap;
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    });

    const tables = createColumns();
    return <div className="panel">
        <h2 className={'h2-lista'}>Lista części dostępnych w sklepie X</h2>
        {isLoggedIn ? (!loading && renderTables(tables, partsData.current, isAdmin))
            :
            <div className="error"><p>Nie można załadować listy części - proszę się zalogować</p></div>
        }
    </div>
}

const PartsDataGrid = styled(DataGrid)({
    background: 'rgba(255, 255, 255, 0.80)',
    borderRadius: '15px',
})

export const DeleteButton = styled(Button)({
    width: 100,
    height: "1.93rem",
    color: "white",
    backgroundColor: "rgb(255, 66, 44)",
})


export default Parts;