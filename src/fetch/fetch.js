import {API_PARTS_URL} from "./utils";

export const partsTypes = ["cpu", "gpu", "memory", "motherboard", "storage"];


async function fetchDataFromEndpoint(endpoint) {
    try {
        const response = await fetch(API_PARTS_URL + endpoint);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}: ${error.message}`);
        throw error;
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