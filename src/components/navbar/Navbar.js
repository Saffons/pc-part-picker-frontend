import {Button, Stack} from "@mui/material";
import "./style.css";
import styled from "@mui/styled-engine";

function Navbar() {
    return <div className="navbar">
        <Stack direction="row" spacing={2}>
            <NavButton variant="contained">Click me</NavButton>
            <NavButton variant="contained">Click me</NavButton>
            <NavButton variant="contained">Click me</NavButton>
            <Button className>Clickkk</Button>
        </Stack>
    </div>
}

const NavButton = styled(Button)({
    width: 200,
    color: "white",
    marginBottom: "1rem",
    marginTop: "1rem"
})

export default Navbar;