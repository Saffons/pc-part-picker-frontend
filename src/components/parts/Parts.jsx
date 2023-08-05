import styled from "@mui/styled-engine";
import {
    ButtonColumns,
    commonColumns,
    CPUColumns,
    GPUColumns,
    MemoryColumns,
    MotherboardColumns,
    StorageColumns
} from "./utils";
import './style.scss';
import {DataGrid} from "@mui/x-data-grid";
import {fetchAndStoreDataInMap, partsTypes} from "../../fetch/fetch";
import {useEffect, useRef, useState} from "react";


function createColumns() {
    const array = [
        {id: "cpu", name: "Procesory", columns: CPUColumns},
        {id: "gpu", name: "Karty graficzne", columns: GPUColumns},
        {id: "memory", name: "Pamięci RAM", columns: MemoryColumns},
        {id: "motherboard", name: "Płyty główne", columns: MotherboardColumns},
        {id: "storage", name: "Dyski", columns: StorageColumns},
    ];
    const arr = [];
    array.forEach(obj => {
        arr.push({id: obj.id, name: obj.name, columns: commonColumns.concat(obj.columns.concat(ButtonColumns))});
    })
    return arr;
}

function renderTables(array, data) {
    return array.map((col, index) => {
        return <div>
            <h3 className={'h3-lista'}>{col.name}</h3>
            <PartsDataGrid rows={data.get(col.id)} columns={col.columns} sx={{
                boxShadow: 2,
                border: 2,
                borderColor: 'primary.light'
            }}/>
        </div>
    })
}

function Parts() {
    let partsData = useRef(new Map());
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchAndStoreDataInMap(partsTypes)
            .then((resultMap) => {
                partsData.current = resultMap;
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });

    const tables = createColumns();
    return <div className={'lista'}>
        <h2 className={'h2-lista'}>Lista części dostępnych w sklepie X</h2>
        {!loading && renderTables(tables, partsData.current)}
    </div>
}

const PartsDataGrid = styled(DataGrid)({
    background: 'rgba(255, 255, 255, 0.80)',
    borderRadius: '15px',
})

export default Parts;