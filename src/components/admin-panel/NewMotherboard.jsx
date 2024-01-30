import {postJsonDataToEndpoint} from "../../fetch/fetch";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Divider, Stack} from "@mui/material";
import {Add} from "@mui/icons-material";
import React from "react";
import {chipsetSocketArray, motherboardSchema, MotherboardValues} from "./utils";
import {useNavigate} from "react-router-dom";

/**
 * Functional NewMotherboard component
 * @returns {JSX.Element}
 * @constructor
 */
function NewMotherboard() {
    let socketArr = []
    let memoryArr = []
    const navigate = useNavigate();
    /**
     * Handler for sending form values
     * @param values
     */
    const handleSubmit = (values) => {
        postJsonDataToEndpoint("parts/motherboard", values)
            .then(() => {
                navigate("/admin");
            });
    }

    for (const item of motherboardSchema.fields.socket._whitelist) {
        socketArr.push(item);
    }

    for (const item of motherboardSchema.fields.memoryType._whitelist) {
        memoryArr.push(item);
    }

    return (
        <Formik
            initialValues={MotherboardValues}
            validationSchema={motherboardSchema}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {(formik) => {
                const {errors, touched} = formik;
                return (
                    <div className="panel">
                        <div className="form-control">
                            <Form>
                                <Stack
                                    direction="column"
                                    divider={<Divider orientation="horizontal" flexItem/>}
                                    spacing={2}
                                >

                                    <label htmlFor="name">Nazwa: </label>
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={errors.name && touched.name ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="name" component="span" className="error"/>

                                    <label htmlFor="manufacturer">Producent: </label>
                                    <Field
                                        type="text"
                                        name="manufacturer"
                                        id="manufacturer"
                                        className={errors.manufacturer && touched.manufacturer ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="manufacturer" component="span" className="error"/>

                                    <label htmlFor="price">Cena: </label>
                                    <Field
                                        type="number"
                                        name="price"
                                        id="price"
                                        className={errors.price && touched.price ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="price" component="span" className="error"/>

                                    <label htmlFor="memoryType">Typ pamięci: </label>
                                    <Field
                                        as="select"
                                        name="memoryType"
                                        id="memoryType"
                                        className={errors.memoryType && touched.memoryType ?
                                            "input-error" : null}
                                    >
                                        {memoryArr.map((type) => {
                                            return <option key={type} value={type}>{type}</option>
                                        })}
                                    </Field>
                                    <ErrorMessage name="memoryType" component="span" className="error"/>

                                    <label htmlFor="socket">Gniazdo: </label>
                                    <Field
                                        as="select"
                                        name="socket"
                                        id="socket"
                                        className={errors.socket && touched.socket ?
                                            "input-error" : null}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            formik.setFieldValue('selectField2', '');
                                        }}
                                    >
                                        {socketArr.map((socket) => {
                                            return <option key={socket} value={socket}>{socket}</option>
                                        })}
                                    </Field>
                                    <ErrorMessage name="socket" component="span" className="error"/>

                                    <label htmlFor="chipset">Chipset: </label>
                                    <Field
                                        as="select"
                                        name="chipset"
                                        id="chipset"
                                        className={errors.chipset && touched.chipset ?
                                            "input-error" : null}
                                    >
                                        {chipsetSocketArray[formik.values.socket].map((chipset) => {
                                            return <option key={chipset} value={chipset}>{chipset}</option>
                                        })}
                                    </Field>
                                    <ErrorMessage name="chipset" component="span" className="error"/>

                                    <label htmlFor="m2">Dysk M2: </label>
                                    <Field
                                        type="checkbox"
                                        name="m2"
                                        id="m2"
                                        className={errors.m2 && touched.m2 ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="m2" component="span" className="error"/>

                                </Stack>


                                <Button variant="contained" size="medium" startIcon={<Add/>}
                                        type="submit"
                                        sx={{margin: "1rem"}}>Dodaj część</Button>

                            </Form>
                        </div>
                    </div>
                )
            }}
        </Formik>
    );
}

export default NewMotherboard;