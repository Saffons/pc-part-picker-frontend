import React, {useEffect, useRef, useState} from "react";
import {deleteConfiguration, fetchConfigurationData} from "../../fetch/fetch";
import {useAuth} from "../../contexts/AuthContext";
import "./style.scss";
import {PartsNames} from "../parts/utils";
import {DeleteButton, partsArray} from "../parts/Parts";
import {Delete} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";


/**
 * Helper function for rendering every configuration in a nicely readable manner
 * @param configs Fetched array of all user's configurations
 * @returns {*}
 */
function renderConfigurations(configs, nav) {
    return configs.map((config, index) => {
        return <div>
            <h3 className="h3-lista">Konfiguracja nr {index + 1}
                <br></br>
                {config.configurationPrice}zł
            </h3>
            <table className="configuration-table">
                <thead>
                <tr className="configuration-table-header">
                    <th></th>
                    <th>Nazwa</th>
                    <th>Dane</th>
                    <th>Cena</th>
                </tr>
                </thead>
                <tbody className="configuration-table-body">
                {partsArray.map((partName, index) => {
                    return <tr key={index}>
                        <th>{PartsNames[index]}</th>
                        <td>{config[partName.id + "Manufacturer"] + " " + config[partName.id + "Name"]}</td>
                        <td>
                            {partName.columns.map((attribute) => {
                                let value = config[partName.id + attribute.field.charAt(0).toUpperCase() + attribute.field.slice(1)];
                                return <table className="configuration-table-inner">
                                    <tbody>
                                    <tr>
                                        <td style={{width: "100%"}}><b>{attribute.headerName}</b>
                                            <br></br>
                                            {typeof value === "boolean" ? (value ? "TAK" : "NIE") : value}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            })}
                        </td>
                        <td>{config[partName.id + "Price"]}zł</td>
                    </tr>
                })}
                </tbody>
            </table>
            <DeleteButton variant="contained" startIcon={<Delete/>}
                          onClick={async () => await deleteConfiguration(config.configurationId)
                              .then(() => {
                                  nav("/configs");
                              }).catch((err) => {

                              })}>Usuń</DeleteButton>
        </div>
    })
}

/**
 * Functional ConfigurationList component
 * @returns {JSX.Element}
 * @constructor
 */
function ConfigurationList() {
    const configList = useRef([]);
    const [loading, setLoading] = useState(true);
    const {isLoggedIn, userId} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            fetchConfigurationData(userId)
                .then((json) => {
                    configList.current = json;
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    })

    return <div className="panel" id="div-config-list">
        <h2 className="h2-lista">Lista Twoich konfiguracji</h2>
        {loading && <h2>Ładowanie listy konfiguracji</h2>}
        {isLoggedIn ? (!loading && renderConfigurations(configList.current, navigate))
            :
            <div className="error"><p>Nie można załadować listy części - proszę się zalogować</p></div>
        }
    </div>
}

export default ConfigurationList;