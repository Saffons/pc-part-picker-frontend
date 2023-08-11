import {deleteToken} from "../../fetch/fetch";
import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Logout = () => {
    const {setIsLoggedIn, setIsAdmin, setLogin} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        deleteToken().then(() => {
            setIsLoggedIn(false);
            setIsAdmin(false);
            setLogin("");
            navigate("/");
        });
    })

}

export default Logout;