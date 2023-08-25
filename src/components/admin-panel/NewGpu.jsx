import {postJsonDataToEndpoint} from "../../fetch/fetch";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Divider, Stack} from "@mui/material";
import {Add} from "@mui/icons-material";
import React from "react";
import {gpuSchema, GpuValues} from "./utils";

/**
 * Functional NewGpu component
 * @returns {JSX.Element}
 * @constructor
 */
function NewGpu() {
    /**
     * Handler for sending form values
     * @param values
     */
    const handleSubmit = (values) => {
        postJsonDataToEndpoint("parts/gpu", values)
            .then(() => {
                window.location.reload(false);
            });
    }

    return (
        <Formik
            initialValues={GpuValues}
            validationSchema={gpuSchema}
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

                                    <label htmlFor="memory">Pojemność pamięci (MB): </label>
                                    <Field
                                        type="number"
                                        name="memory"
                                        id="memory"
                                        className={errors.memory && touched.memory ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="memory" component="span" className="error"/>

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

export default NewGpu;