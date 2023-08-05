import {Button, Stack} from "@mui/material";
import styled from "@mui/styled-engine";
import logo from "../../images/x.png";
import "./style.css";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";


function Navbar() {
    const navigate = useNavigate();
    // const logged = useContext();
    const [logged, setLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    return <div className="navbar">
        <Stack direction="row" spacing={4}>
            <Logo src={logo} onClick={() => navigate("/")}></Logo>
            <NavButton variant="contained" onClick={() => navigate("/")}>Strona główna</NavButton>
            <NavButton variant="contained" onClick={() => navigate("/parts")}>Części komputerowe</NavButton>
            { logged && <NavButton variant="contained" onClick={() => navigate("/account")}>Moje konto</NavButton> }
            { !logged && <NavButton variant="contained" onClick={() => navigate("/login")}>Zaloguj się</NavButton> }
            { isAdmin && <NavButton variant="contained" onClick={() => navigate("/admin")}>Panel admina</NavButton> }
        </Stack>
    </div>
}

const NavButton = styled(Button)({
    width: 200,
    height: 38,
    color: "white",
    backgroundColor: "rgb(195, 130, 250)",
    marginBottom: "1rem",
    marginTop: "1rem !important"
})

const Logo = styled('img')({
    width: 50,
    height: 50,
    marginTop: "0.5rem !important",
    marginBottom: "0.5rem !important",
    border: "2px solid black",
    cursor: "pointer"
})

export default Navbar;