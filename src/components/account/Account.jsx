import {useAuth} from "../../contexts/AuthContext";

function Account(props) {
    const {isLoggedIn} = useAuth();
    return <div>
        <p>Witaj, oto szczegóły Twojego konta</p>
        {isLoggedIn && <p>duudassdadas</p>}
    </div>
}

export default Account;