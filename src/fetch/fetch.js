import {API_PARTS_URL, API_URL} from "./utils";

export const partsTypes = ["parts/cpu", "parts/gpu", "parts/memory", "parts/motherboard", "parts/storage"];

async function fetchDataFromEndpoint(endpoint) {
    try {
        const response = await fetch(API_URL + endpoint);
        console.log(API_URL + endpoint);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}: ${error.message}`);
        throw error;
    }
}

export async function postJsonDataToEndpoint(endpoint, data) {
    try {
        const response = await fetch(API_URL + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const json = await response.json();
            console.log(json);
        }
    } catch (err) {
        console.error(err);
    }
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