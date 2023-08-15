import * as Yup from "yup";

export const newPartsSchema = Yup.object().shape({
    name: Yup.string()
        .required("Nazwa wymagana")
        .min(3, "Nazwa musi mieć przynajmniej 3 znaki")
        .max(50, "Nazwa może mieć maksymalnie 20 znaków"),

    manufacturer: Yup.string()
        .required("Producent wymagany")
        .min(3, "Producent musi mieć przynajmniej 3 znaki")
        .max(30, "Producent może mieć maksymalnie 30 znaków"),

    price: Yup.number()
        .required("Cena wymagana")
        .min(0, "Cena nie może być ujemna")
})

export const newCpuSchema = Yup.object().shape({
    cores: Yup.number()
        .required()
        .min(2, "Procesor musi mieć przynajmniej 2 rdzenie")
        .max(32, "Procesor może mieć maksymalnie 32 rdzenie"),

    speed: Yup.number()
        .required()
        .min(0, "Częstotliwość nie może być ujemna"),

    socket: Yup.string()
        .oneOf(["AM4", "AM5", "LGA1200", "LGA1700"])
})

export const newGpuSchema = Yup.object().shape({
    memory: Yup.number()
        .required()
        .min(0, "Pamięć nie może być ujemna"),

    speed: Yup.number()
        .required()
        .min(0, "Częstotliwość nie może być ujemna"),
})

export const newMemorySchema = Yup.object().shape({
    memoryType: Yup.string()
        .oneOf(["DDR4", "DDR5"]),

    capacity: Yup.number()
        .required()
        .min(0, "Pojemność nie może być ujemna"),

    speed: Yup.number()
        .required()
        .min(0, "Częstotliwość nie może być ujemna"),
})

export const newMotherboardSchema = Yup.object().shape({
    memoryType: Yup.string()
        .oneOf(["DDR4", "DDR5"]),

    socket: Yup.string()
        .oneOf(["AM4", "AM5", "LGA1200", "LGA1700"]),

    chipset: Yup.string()
        .when('socket', (socket, schema) => {
            if (["AM4", "AM5"].indexOf(socket) > -1) {
                return schema.oneOf(["B550", "B650", "X570", "X670"], "Podaj pasujący chipset");
            } else if (["LGA1200", "LGA1700"].indexOf(socket) > -1) {
                return schema.oneOf(["B660", "Z690", "B760", "Z790"], "Podaj pasujący chipset");
            }
        })
        .oneOf(["B550", "B650", "X570", "X670", "B560", "Z590", "B760", "Z790"]),

    m2: Yup.bool()
        .required()
})

export const chipsetSocketArray = {
    "AM4": ["B550", "X570"],
    "AM5": ["B650", "X670"],
    "LGA1200": ["B560", "Z590"],
    "LGA1700": ["B760", "Z790"]
}

export const newStorageSchema = Yup.object().shape({
    m2: Yup.bool()
        .required(),

    capacity: Yup.number()
        .required()
        .min(0, "Pojemność nie może być ujemna"),

    speed: Yup.number()
        .required()
        .min(0, "Częstotliwość nie może być ujemna"),
})

export const cpuSchema = newPartsSchema.concat(newCpuSchema);
export const gpuSchema = newPartsSchema.concat(newGpuSchema);
export const memorySchema = newPartsSchema.concat(newMemorySchema);
export const motherboardSchema = newPartsSchema.concat(newMotherboardSchema);
export const storageSchema = newPartsSchema.concat(newStorageSchema);

export const initialCommonValues = {
    name: "",
    manufacturer: "",
    price: "",
};

export const initialCpuValues = {
    cores: "",
    speed: "",
    socket: "AM4",
}

export const initialGpuValues = {
    memory: "",
    speed: "",
}

export const initialMemoryValues = {
    memoryType: "DDR4",
    capacity: "",
    speed: "",
}

export const initialMotherboardValues = {
    memoryType: "DDR4",
    socket: "AM4",
    chipset: "B550",
    m2: false
}

export const initialStorageValues = {
    m2: false,
    capacity: "",
    speed: "",
}

export const CpuValues = {...initialCommonValues, ...initialCpuValues};
export const GpuValues = {...initialCommonValues, ...initialGpuValues};
export const MemoryValues = {...initialCommonValues, ...initialMemoryValues};
export const MotherboardValues = {...initialCommonValues, ...initialMotherboardValues};
export const StorageValues = {...initialCommonValues, ...initialStorageValues};