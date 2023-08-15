import {useAuth} from "../../contexts/AuthContext";
import {BigNavButton} from "../navbar/Navbar";
import {useNavigate} from "react-router-dom";
import {Stack} from "@mui/material";

function Account() {
    const {isLoggedIn, login} = useAuth();
    const navigate = useNavigate();

    return isLoggedIn ? <div className="panel">
        <p>Witaj, oto szczegóły Twojego konta</p>
        <p>Twój login: {login}</p>
        <Stack direction="column" spacing={2} alignItems="center">
            <BigNavButton variant="contained" onClick={() => navigate("/config")}>Dodaj nową konfigurację</BigNavButton>
            <BigNavButton variant="contained" onClick={() => navigate("/configs")}>Twoje konfiguracje</BigNavButton>
        </Stack>

    </div>
        :
        <div className="panel">
            <p>Proszę się zalogować</p>
        </div>
}

export default Account;