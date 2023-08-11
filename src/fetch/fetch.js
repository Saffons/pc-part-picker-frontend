import {API_PARTS_URL, API_URL, BASE_URL} from "./utils";

export const partsTypes = ["cpu", "gpu", "memory", "motherboard", "storage"];

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

export async function postJsonDataToEndpoint(endpoint, data) {
    let headers = {
        "Content-Type": "application/json",
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

export async function postToken(creds) {
    let auth = btoa(`${creds.login}:${creds.password}`);

    const response = await fetch(BASE_URL + "token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + auth,
        },
        body: JSON.stringify(creds)
    });

    if (response && response.ok) {
        const token = await response.text();
        localStorage.setItem("jwt", token);
        return true;
    } else {
        return false;
    }

}

export async function deleteToken() {
    let headers = {
        "Content-Type": "application/json",
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

export async function deletePart(partType, id) {
    let headers = {
        "Content-Type": "application/json",
    };
    let token = localStorage.getItem("jwt");
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
    await fetch(API_PARTS_URL + partType + "/" + id, {
        method: "DELETE",
        headers: headers,
    }).then((a) => {
        console.log(partType, id);
        console.log(a);
    }).catch((err) => console.error(err))
}

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