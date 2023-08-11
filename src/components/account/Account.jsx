import {useAuth} from "../../contexts/AuthContext";
import {NavButton} from "../navbar/Navbar";
import {useNavigate} from "react-router-dom";

function Account() {
    const {isLoggedIn, login} = useAuth();
    const navigate = useNavigate();

    return isLoggedIn ? <div className="panel">
        <p>Witaj, oto szczegóły Twojego konta</p>
        <p>Twój login: {login}</p>
        <NavButton variant="contained" onClick={() => navigate("/config")}>Dodaj nową konfigurację</NavButton>
    </div>
        :
        <div className="panel">
            <p>Proszę się zalogować</p>
        </div>
}

export default Account;