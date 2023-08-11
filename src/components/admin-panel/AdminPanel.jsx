import {NavButton} from "../navbar/Navbar";
import {useNavigate} from "react-router-dom";
import {Stack} from "@mui/material";

function AdminPanel() {
    const navigate = useNavigate();
    return <div className="panel">
        <p>Witaj adminie, tutaj jest Twój panel</p>
        <Stack direction="column" sx={{alignItems: "center"}}>
            <h2>Dodawanie nowych części</h2>
            <NavButton variant="contained" onClick={() => navigate("/admin/newCpu")}>Procesor</NavButton>
            <NavButton variant="contained" onClick={() => navigate("/admin/newGpu")}>Karta graficzna</NavButton>
            <NavButton variant="contained" onClick={() => navigate("/admin/newMemory")}>Pamięć</NavButton>
            <NavButton variant="contained" onClick={() => navigate("/admin/newMotherboard")}>Płyta główna</NavButton>
            <NavButton variant="contained" onClick={() => navigate("/admin/newStorage")}>Dysk</NavButton>
        </Stack>
    </div>
}

export default AdminPanel;