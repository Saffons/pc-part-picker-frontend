import React, {useState} from "react";
import {ImportContacts} from "@mui/icons-material";
import {Button, Divider, Stack} from "@mui/material";
import './style.scss';
import {postJsonDataToEndpoint} from "../../fetch/fetch";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

/**
 * Schema for validating registration form
 */
const signUpSchema = Yup.object().shape({
    email: Yup.string().email()
        .required("Email wymagany"),

    firstName: Yup.string()
        .required("Imię wymagane")
        .min(3, "Imię musi mieć przynajmniej 3 znaki")
        .max(20, "Imię musi mieć maksymalnie 20 znaków"),

    lastName: Yup.string()
        .required("Nazwisko wymagane")
        .min(3, "Nazwisko musi mieć przynajmniej 3 znaki")
        .max(20, "Nazwisko może mieć maksymalnie 20 znaków"),

    login: Yup.string()
        .required("Login wymagany")
        .min(3, "Login musi mieć przynajmniej 3 znaki")
        .max(20, "Login może mieć maksymalnie 20 znaków"),

    password: Yup.string()
        .required("Hasło wymagane")
        .min(3, "Hasło musi mieć przynajmniej 3 znaki")
        .max(20, "Hasło może mieć maksymalnie 20 znaków")
})

/**
 * Functional Register component
 * @returns {JSX.Element}
 * @constructor
 */
const Register = () => {
    const [registerSuccessful, setRegisterSuccessful] = useState(false);
    const [registerFailed, setRegisterFailed] = useState(false);
    const initialValues = {
        login: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }

    const handleSubmit = (values) => {
        let account = {
            login: values.login,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email
        };
        postJsonDataToEndpoint("auth/account", account)
            .then(() => {
                setRegisterSuccessful(true);
            })
            .catch(() => {
                setRegisterFailed(true);
            });
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {(formik) => {
                const {errors, touched} = formik;
                return ((!registerSuccessful && !registerFailed) ?
                    (<div>
                        <div className="form-control">
                            <Form>
                                <Stack
                                    direction="column"
                                    divider={<Divider orientation="horizontal" flexItem/>}
                                    spacing={2}
                                >
                                    <label htmlFor="firstName">First name: </label>
                                    <Field
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        className={errors.firstName && touched.firstName ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="firstName" component="span" className="error"/>

                                    <label htmlFor="lastName">Last name: </label>
                                    <Field
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        className={errors.lastName && touched.lastName ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="lastName" component="span" className="error"/>

                                    <label htmlFor="email">E-mail: </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        className={errors.email && touched.email ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="email" component="span" className="error"/>

                                    <label htmlFor="login">Login: </label>
                                    <Field
                                        type="login"
                                        name="login"
                                        id="login"
                                        className={errors.login && touched.login ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="login" component="span" className="error"/>

                                    <label htmlFor="password">Password: </label>
                                    <Field
                                        type="password"
                                        name="password"
                                        id="password"
                                        className={errors.password && touched.password ?
                                            "input-error" : null}
                                    />
                                    <ErrorMessage name="password" component="span" className="error"/>

                                </Stack>


                                <Button variant="contained" size="medium" startIcon={<ImportContacts/>} type="submit"
                                        sx={{margin: "1rem"}}>REGISTER</Button>

                            </Form>
                        </div>

                        <h3>Want to login?</h3>
                        <p>Click <a href="/login">here</a> to login</p>
                    </div>
                    ) :
                (<div>
                    { registerSuccessful && <h2>Pomyślnie stworzono konto</h2> }
                    { registerFailed && <h2>Nie udało się stworzyć konta</h2> }>
                </div>)
                )

            }}
        </Formik>
    );
};

export default Register;