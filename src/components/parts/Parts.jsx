import PartsTable from "./PartsTable";

import {commonColumns, CPUColumns, GPUColumns, MemoryColumns, MotherboardColumns, StorageColumns} from "./utils";

function createColumns() {
    const array = [{name: "Procesory", columns: CPUColumns},
        {name: "Karty graficzne", columns: GPUColumns},
        {name: "Pamięci RAM", columns: MemoryColumns},
        {name: "Płyty główne", columns: MotherboardColumns},
        {name: "Dyski", columns: StorageColumns},
    ]
    const arr = [];
    array.forEach(obj =>  {
        arr.push({name: obj.name, columns: commonColumns.concat(obj.columns)});
    })
    return arr;
}

function renderTables(array) {
    const rows = [
        { id: 1, col1: 'Hello', col2: 'World', col3: 'e', col4: 'a', col5: 'f'  },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
    ];
    return array.map((col, index) => {
        console.log(col);
        return <div>
            <h3>{col.name}</h3>
            <PartsTable rows={rows} columns={col.columns} />
        </div>
    })
}

function Parts() {
    // useEffect(() => {
    //
    // }}

    const tables = createColumns();
    return <div>
        <h2>Lista części dostępnych w sklepie X</h2>
        { renderTables(tables) }
    </div>
}

export default Parts;