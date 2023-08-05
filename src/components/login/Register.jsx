import React, {useState} from "react";
import {ImportContacts} from "@mui/icons-material";
import {Button, Divider, Stack} from "@mui/material";
import './style.scss';
import {postJsonDataToEndpoint} from "../../fetch/fetch";
import { Formik, Form, Field, ErrorMessage } from 'formik';

// function isValidEmail(email) {
//     return /\S+@\S+\.\S+/.test(email);
// }

// const Basic = () => (
//     <div>
//         <h1>Any place in your app!</h1>
//         <Formik
//             initialValues={{ firstName: '', lastName: '', email: '', login: '', password: '' }}
//             validate={values => {
//                 const errors = {};
//                 if (!values.email) {
//                     errors.email = 'Required';
//                 } else if (
//                     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//                 ) {
//                     errors.email = 'Invalid email address';
//                 }
//                 return errors;
//             }}
//             onSubmit={(values, { setSubmitting }) => {
//                 setTimeout(() => {
//                     alert(JSON.stringify(values, null, 2));
//                     setSubmitting(false);
//                 }, 400);
//             }}
//         >
//             {({ isSubmitting }) => (
//                 <Form>
//                     <Field type="email" name="email" />
//                     <ErrorMessage name="email" component="div" />
//                     <Field type="password" name="password" />
//                     <ErrorMessage name="password" component="div" />
//                     <button type="submit" disabled={isSubmitting}>
//                         Submit
//                     </button>
//                 </Form>
//             )}
//         </Formik>
//     </div>
// );

function Register() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(login, password, firstName, lastName, email);

        if (!isValidEmail(email)) {
            return;
        }

        let account = {
            login: login,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email
        };
        const response = await postJsonDataToEndpoint("auth/account", account);
        console.log(account);
        console.log(response);
        //TODO: HIT ENDPOINT
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-control'>
                    <Stack
                        direction={"column"}
                        divider={<Divider orientation="horizontal" flexItem/>}
                        spacing={2}
                    >
                        <label htmlFor='firstName'>First name: </label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label htmlFor='lastName'>Last name: </label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label htmlFor='email'>E-mail: </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor='login'>Login: </label>
                        <input
                            type='text'
                            id='login'
                            name='login'
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                        <label htmlFor='password'>Password: </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Stack>
                </div>
                <Button variant="contained" size="medium" startIcon={<ImportContacts/>} type={"submit"} sx={{margin: "1rem"}}>REGISTER</Button>
                <h3>Want to login?</h3><p>Click <a href={"/login"}>here</a> to login</p>
            </form>
        </div>
    );
}

export default Register;