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

export const cpuSchema = newPartsSchema.concat(newCpuSchema);

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

export const CpuValues = {...initialCommonValues, ...initialCpuValues};