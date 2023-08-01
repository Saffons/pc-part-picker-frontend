import {Button, Stack} from "@mui/material";
import styled from "@mui/styled-engine";
import logo from "../../images/x.png";
import "./style.css";
import {useNavigate} from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();
    return <div className="navbar">
        <Stack direction="row" spacing={4}>
            <Logo src={logo} onClick={() => navigate("/")}></Logo>
            <NavButton variant="contained" onClick={() => navigate("/")}>Home</NavButton>
            <NavButton variant="contained" onClick={() => navigate("/parts")}>Części komputerowe</NavButton>
            <NavButton variant="contained" onClick={() => navigate("/account")}>Moje konto</NavButton>
        </Stack>
    </div>
}

const NavButton = styled(Button)({
    width: 200,
    height: 53,
    color: "white",
    marginBottom: "1rem",
    marginTop: "1rem !important"
})

const Logo = styled('img')({
    width: 50,
    height: 50,
    marginBottom: "1rem",
    marginTop: "1rem",
    border: "3px solid black",
    cursor: "pointer"
})

export default Navbar;