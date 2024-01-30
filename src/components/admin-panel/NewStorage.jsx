import {postJsonDataToEndpoint} from "../../fetch/fetch";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Divider, Stack} from "@mui/material";
import {Add} from "@mui/icons-material";
import React from "react";
import {memorySchema, MemoryValues} from "./utils";
import {useNavigate} from "react-router-dom";

/**
 * Functional NewStorage component
 * @returns {JSX.Element}
 * @constructor
 */
function NewStorage() {
    const navigate = useNavigate();
    /**
     * Handler for sending form values
     * @param values
     */
    const handleSubmit = (values) => {
        postJsonDataToEndpoint("parts/storage", values)
            .then(() => {
                navigate("/admin");
            });
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

                                    <label htmlFor="m2">M2: </label>
                                    <Field
                                        type="checkbox"
                                        name="m2"
                                        id="m2"
                                        className={errors.m2 && touched.m2 ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="m2" component="span" className="error"/>

                                    <label htmlFor="capacity">Pojemność dysku (MB): </label>
                                    <Field
                                        type="number"
                                        name="capacity"
                                        id="capacity"
                                        className={errors.capacity && touched.capacity ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="capacity" component="span" className="error"/>

                                    <label htmlFor="speed">Prędkość odczytu (MB/s): </label>
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

export default NewStorage;