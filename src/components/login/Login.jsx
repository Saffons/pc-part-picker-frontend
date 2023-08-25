import React, {useState} from "react";
import {ImportContacts} from "@mui/icons-material";
import {Button, Divider, Stack} from "@mui/material";
import './style.scss';
import {postToken} from "../../fetch/fetch";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useAuth} from "../../contexts/AuthContext";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

/**
 * Schema for validating login form
 */
const signInSchema = Yup.object().shape({
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
 * Functional Login component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Login = (props) => {
    const navigate = useNavigate();
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const {setIsLoggedIn, setIsAdmin, setLogin, setUserId} = useAuth();
    const initialValues = {
        login: "",
        password: "",
    };
    const handleSubmit = (values) => {
        let credentials = {
            login: values.login,
            password: values.password,
        }

        postToken(credentials)
            .then((res) => {
                if (res && localStorage.getItem("jwt")) {
                    setLoginSuccessful(true);
                    setIsLoggedIn(true);
                    let decoded = jwt_decode(localStorage.getItem("jwt"));
                    setIsAdmin(decoded["scope"] === "ROLE_ADMIN");
                    setLogin(decoded["sub"]);
                    setUserId(decoded["jti"]);
                }
            })
            .catch((err) => {
                setLoginFailed(true);
                setIsLoggedIn(false);
                setIsAdmin(false);
                setLogin("");
                setUserId(0);
            });
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {(formik) => {
                const {errors, touched} = formik;
                return ((!loginSuccessful && !loginFailed) ?
                        (<div>
                                <div className="form-control">
                                    <Form>
                                        <Stack
                                            direction="column"
                                            divider={<Divider orientation="horizontal" flexItem/>}
                                            spacing={2}
                                        >

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


                                        <Button variant="contained" size="medium" startIcon={<ImportContacts/>}
                                                type="submit"
                                                sx={{margin: "1rem"}}>LOGIN</Button>

                                    </Form>
                                </div>

                                <h3>Don't have an account yet?</h3>
                                <Button onClick={() => navigate("/register")}></Button>
                                <p>Click <a href="/register">here</a> to sign up</p>
                            </div>
                        ) :
                        (<div className="panel">
                            {loginSuccessful && <h2>Pomyślnie zalogowano</h2>}
                            {loginFailed && <h2>Nie udało się zalogować</h2>}
                        </div>)
                )
            }}
        </Formik>
    );
};

export default Login;
