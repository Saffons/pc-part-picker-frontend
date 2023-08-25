import {API_PARTS_URL, API_URL, BASE_URL} from "./utils";

export const partsTypes = ["cpu", "gpu", "memory", "motherboard", "storage"];

/**
 * Function that invokes a GET method on provided computer parts endpoint
 * @param endpoint URL of endpoint that will be called
 * @returns {Promise<any>} Promise with response's body being transformed to JSON.
 */
async function fetchDataFromEndpoint(endpoint) {
    let headers = {
        "Content-Type": "application/json",
    };
    let token = localStorage.getItem("jwt");
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
    try {
        const response = await fetch(API_PARTS_URL + endpoint, {
            headers: headers,
        });
        if (!response.ok) {
            console.error(`Network response was not ok: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}: ${error.message}`);
        throw error;
    }
}

/**
 * Function that invokes a POST method on provided endpoint, with its body filled with data parameter
 * @param endpoint URL of endpoint to be called
 * @param data Object to be sent as body
 * @returns {Promise<Response>} Promise that resolves to response from backend
 */
export async function postJsonDataToEndpoint(endpoint, data) {
    let headers = {
        "Content-Type": "application/json",
        "Accept": "*/*"
    };
    let token = localStorage.getItem("jwt");
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }

    try {
        return await fetch(API_URL + endpoint, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });
    } catch (err) {
        console.error(err);
    }
}

/**
 * Function that calls backend's authorization service to get JWT and saves it in localStorage
 * @param creds Object with fields `login` and `password` that are sent as Basic Auth
 * @returns {Promise<boolean>} Promise that resolves to a boolean indicating if login was successful
 */
export async function postToken(creds) {
    let auth = btoa(`${creds.login}:${creds.password}`);

    const response = await fetch(BASE_URL + "token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + auth,
            "Accept": "*/*"
        },
    });

    if (response && response.ok) {
        const token = await response.text();
        localStorage.setItem("jwt", token);
        return true;
    } else {
        return false;
    }

}

/**
 * Function that calls backend's logout endpoint and deletes JWT from browser's localStorage
 * @returns {Promise<void>}
 */
export async function deleteToken() {
    let headers = {
        "Content-Type": "application/json",
        "Accept": "*/*"
    };
    let token = localStorage.getItem("jwt");
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
    await fetch(BASE_URL + "logout", {
        method: "POST",
        headers: headers,
        mode: "no-cors",
    }).then(() => {
        localStorage.removeItem("jwt");
    }).catch((err) => console.error(err))
}

/**
 * Function that invokes DELETE method on backend's computer part API with partType of ID equal to id
 * @param partType type of part to be deleted, e.g. cpu
 * @param id ID of part to be deleted
 * @returns {Promise<void>}
 */
export async function deletePart(partType, id) {
    let headers = {
        "Content-Type": "application/json",
        "Accept": "*/*"
    };
    let token = localStorage.getItem("jwt");
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
    await fetch(API_PARTS_URL + partType + "/" + id, {
        method: "DELETE",
        headers: headers,
    }).then((resp) => {
        if (resp.status === 400) {
            return Promise.reject("Nie mozna usunąć, usuń konfiguracje, które zawierają ten procesor");
        }
        return Promise.resolve();
    }).catch((err) => {
        return Promise.reject(err)
    })
}

/**
 * Function that calls every endpoint from listOfEndpoints and then stores every response in a map
 * @param listOfEndpoints array of endpoints to be called
 * @returns {Promise<Map<any, any>>} Promise that resolves to a Map with results of all backend calls
 */
export async function fetchAndStoreDataInMap(listOfEndpoints) {
    const resultMap = new Map();

    try {
        const fetchPromises = listOfEndpoints.map(async (endpoint) => {
            const data = await fetchDataFromEndpoint(endpoint);
            resultMap.set(endpoint, data);
        });

        await Promise.all(fetchPromises);

        return resultMap;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

/**
 * Function that invokes GET method to get data about all configurations created by user with ID equal to userId
 * @param userId userId
 * @returns {Promise<any>} Promise that resolves to a list of all user's configurations
 */
export async function fetchConfigurationData(userId) {
    let headers = {
        "Content-Type": "application/json",
        "Accept": "*/*"
    };
    let token = localStorage.getItem("jwt");
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
    try {
        const response = await fetch(API_URL + `configuration/user/${userId}`, {
            headers: headers,
        });
        if (!response.ok) {
            console.error(`Network response was not ok: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from: ${error.message}`);
        throw error;
    }
}

/**
 * Function that invokes DELETE method to delete a configuration with ID equal to id
 * @param id ID of configuration that is to be deleted
 * @returns {Promise<void>}
 */
export async function deleteConfiguration(id) {
    let headers = {
        "Content-Type": "application/json",
        "Accept": "*/*"
    };
    let token = localStorage.getItem("jwt");
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
    await fetch(API_URL + "configuration/" + id, {
        method: "DELETE",
        headers: headers,
    }).then((resp) => {

    }).catch((err) => {
        console.log(err);
    })
}