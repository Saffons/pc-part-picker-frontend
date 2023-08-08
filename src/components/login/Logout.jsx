import {deleteToken} from "../../fetch/fetch";
import {useAuth} from "../../contexts/AuthContext";

const Logout = () => {
    const {setIsLoggedIn, setIsAdmin} = useAuth();
    deleteToken().then(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
    })
}

export default Logout;