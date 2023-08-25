import React, {useEffect, useRef, useState} from "react";
import {fetchAndStoreDataInMap, partsTypes, postJsonDataToEndpoint} from "../../fetch/fetch";
import {useAuth} from "../../contexts/AuthContext";
import {Button} from "@mui/material";

function renderGpuForm(data, setGpu) {
    return <form>
        <h2>Karta graficzna:</h2>
        <select onChange={(e) => setGpu(parseInt(e.target.value))}>
            {[{id: 0}].concat(data.get('gpu')).map((el) => {
                if (el.id !== 0) {
                    return <option key={el.id} value={el.id}>{el.name} - {el.speed} MHz - {el.memory} GB VRAM
                        - {el.price} zł</option>
                } else {
                    return <option key={0} value={0}>---</option>
                }
            })}
        </select>

    </form>;
}

function renderMotherboardForm(data, setMotherboard, cpu) {
    let socket = data.get('cpu').filter((el) => el.id === cpu)[0].socket;
    return <form>
        <h2>Płyta główna:</h2>
        <select onChange={(e) => setMotherboard(parseInt(e.target.value))}>
            {[{id: 0}].concat(data.get('motherboard').filter((motherboard) => motherboard.socket === socket)).map((el) => {
                if (el.id !== 0) {
                    return <option key={el.id} value={el.id}>{el.name} - {el.memoryType} RAM - socket {el.socket} -
                        chipset {el.chipset} - {el.m2 && "M2"} - {el.price} zł</option>
                } else {
                    return <option key={0} value={0}>---</option>
                }
            })}
        </select>
    </form>;
}

function renderMemoryForm(data, setMemory, motherboard) {
    let memoryType = data.get('motherboard').filter((el) => el.id === motherboard)[0].memoryType;
    return <form>
        <h2>Pamięć RAM:</h2>
        <select onChange={(e) => setMemory(parseInt(e.target.value))}>
            {[{id: 0}].concat(data.get('memory').filter((memory) => memory.memoryType === memoryType)).map((el) => {
                if (el.id !== 0) {
                    return <option key={el.id} value={el.id}>{el.name} - {el.memoryType} RAM
                        - {el.capacity} MB, {el.speed} MHz - {el.price} zł</option>
                } else {
                    return <option key={0} value={0}>---</option>
                }
            })}
        </select>
    </form>;
}

function renderStorageForm(data, setStorage, motherboard) {
    let m2 = data.get('motherboard').filter((el) => el.id === motherboard)[0].m2;
    return <form>
        <h2>Dysk:</h2>
        <select onChange={(e) => setStorage(parseInt(e.target.value))}>
            {[{id: 0}].concat(data.get('storage').filter((storage) => storage.m2 === m2)).map((el) => {
                if (el.id !== 0) {
                    return <option key={el.id}
                                   value={el.id}>{el.name} - {el.m2 && "M2"}- {el.capacity} MB, {el.speed} MHz
                        - {el.price} zł</option>
                } else {
                    return <option key={0} value={0}>---</option>
                }
            })}
        </select>
    </form>;
}

function Configuration() {
    let partsData = useRef(new Map());
    const [loading, setLoading] = useState(true);
    const [cpu, setCpu] = useState(0);
    const [gpu, setGpu] = useState(0);
    const [motherboard, setMotherboard] = useState(0);
    const [memory, setMemory] = useState(0);
    const [storage, setStorage] = useState(0);
    const {isLoggedIn, userId} = useAuth();

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

    return !loading ? <div className="panel">
            <p>Wybierz nową konfigurację</p>
            <div id={"0"}>
                <h2>Procesor:</h2>
                <form>
                    <select onChange={(e) => setCpu(parseInt(e.target.value))}>
                        {[{id: 0}].concat(partsData.current.get('cpu')).map((el) => {
                            if (el.id !== 0) {
                                return <option key={el.id} value={el.id}>{el.name} - socket {el.socket} - {el.cores}-rdzeniowy
                                    - {el.speed} MHz - {el.price} zł</option>
                            } else {
                                return <option key={0} value={0}>---</option>
                            }
                        })}
                    </select>
                </form>
            </div>

            <div id={"1"}>
                {cpu !== 0 && renderGpuForm(partsData.current, setGpu)}
            </div>

            <div id={"2"}>
                {gpu !== 0 && renderMotherboardForm(partsData.current, setMotherboard, cpu)}
            </div>

            <div id={"3"}>
                {motherboard !== 0 && renderMemoryForm(partsData.current, setMemory, motherboard)}
            </div>

            <div id={"4"}>
                {memory !== 0 && renderStorageForm(partsData.current, setStorage, motherboard)}
            </div>

            <div id={"5"}>
                {cpu !== 0 && gpu !== 0 && motherboard !== 0 && memory !== 0 && storage !== 0 && <Button onClick={() => {
                    postJsonDataToEndpoint("configuration", {
                        cpu: cpu,
                        gpu: gpu,
                        motherboard: motherboard,
                        memory: memory,
                        storage: storage,
                        account: userId
                    })
                    alert("Dodano pomyślnie");
                }}>Zapisz</Button>}
            </div>
        </div> :
        <div><p>Ładowanie listy części</p></div>
}

export default Configuration;