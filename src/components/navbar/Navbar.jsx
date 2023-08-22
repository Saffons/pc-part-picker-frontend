import {Button, Stack} from "@mui/material";
import styled from "@mui/styled-engine";
import logo from "../../images/x.png";
import "./style.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {useEffect} from "react";
import jwt_decode from "jwt-decode";

function Navbar() {
    const navigate = useNavigate();
    const {isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, setLogin, setUserId} = useAuth();

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("jwt") !== null);
        try {
            let decoded = jwt_decode(localStorage.getItem("jwt"));
            setIsAdmin(decoded["scope"] === "ROLE_ADMIN")
            setLogin(decoded["sub"]);
            setUserId(decoded["jti"]);

        } catch(e) {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="navbar">
        <Stack direction="row" spacing={4}>
            <Logo src={logo} onClick={() => navigate("/")}></Logo>
            <NavButton variant="contained" onClick={() => navigate("/")}>Strona główna</NavButton>
            <NavButton variant="contained" onClick={() => navigate("/parts")}>Części komputerowe</NavButton>
            { isLoggedIn && <NavButton variant="contained" onClick={() => navigate("/account")}>Moje konto</NavButton> }
            { isLoggedIn && <NavButton variant="contained" onClick={() => navigate("/logout")}>Wyloguj się</NavButton> }
            { !isLoggedIn && <NavButton variant="contained" onClick={() => navigate("/login")}>Zaloguj się</NavButton> }
            { isAdmin && <NavButton variant="contained" onClick={() => navigate("/admin")}>Panel admina</NavButton> }
        </Stack>
    </div>
}

export const NavButton = styled(Button)({
    width: 200,
    height: 38,
    color: "white",
    backgroundColor: "rgb(195, 130, 250)",
    marginBottom: "1rem",
    marginTop: "1rem !important"
})

export const BigNavButton = styled(Button)({
    width: 300,
    height: 60,
    color: "white",
    backgroundColor: "rgb(195, 130, 250)",
    marginBottom: "1rem",
    marginTop: "1rem !important",
    padding: "0.5rem",
    fontSize: "1.2rem",
})

const Logo = styled('img')({
    width: 50,
    height: 50,
    marginTop: "0.5rem !important",
    marginBottom: "0.5rem !important",
    border: "2px solid black",
    cursor: "pointer",
})

export default Navbar;