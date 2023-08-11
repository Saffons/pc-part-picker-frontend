import {useAuth} from "../../contexts/AuthContext";
import {useEffect} from "react";

function Account(props) {
    const {isLoggedIn, login} = useAuth();

    console.log(isLoggedIn);


    return isLoggedIn ? <div className="panel">
        <p>Witaj, oto szczegóły Twojego konta</p>
        <p>Twój login: {login}</p>
    </div>
        :
        <div className="panel">
            <p>Proszę się zalogować</p>
        </div>
}

export default Account;