import React, {useState} from "react";
import {ImportContacts} from "@mui/icons-material";
import {Button, Divider, Stack} from "@mui/material";
import './style.scss';

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("login");
        console.log(login, password);
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
                <Button variant="contained" size="medium" startIcon={<ImportContacts/>} type={"submit"} sx={{margin: "1rem"}}>LOGIN</Button>
                <h3>Don't have an account yet?</h3><p>Click <a href={"/register"}>here</a> to sign up</p>
            </form>
        </div>
    );
}

export default Login;