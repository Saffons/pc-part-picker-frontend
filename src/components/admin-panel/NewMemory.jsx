import {postJsonDataToEndpoint} from "../../fetch/fetch";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Divider, Stack} from "@mui/material";
import {Add} from "@mui/icons-material";
import React from "react";
import {memorySchema, MemoryValues, motherboardSchema} from "./utils";

function NewMemory() {
    const memoryArr = [];
    const handleSubmit = (values) => {
        postJsonDataToEndpoint("parts/memory", values)
            .then(() => {
                window.location.reload(false);
            });
    }

    for (const item of motherboardSchema.fields.memoryType._whitelist) {
        memoryArr.push(item);
    }

    return (
        <Formik
            initialValues={MemoryValues}
            validationSchema={memorySchema}
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

                                    <label htmlFor="capacity">Pojemność: </label>
                                    <Field
                                        type="number"
                                        name="capacity"
                                        id="capacity"
                                        className={errors.capacity && touched.capacity ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="capacity" component="span" className="error"/>

                                    <label htmlFor="speed">Taktowanie: </label>
                                    <Field
                                        type="number"
                                        name="speed"
                                        id="speed"
                                        className={errors.speed && touched.speed ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="speed" component="span" className="error"/>
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

export default NewMemory;