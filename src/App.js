import './App.css';
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";
import Parts from "./components/parts/Parts";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Logout from "./components/login/Logout";
import Footer from "./components/footer/Footer";
import Account from "./components/account/Account";
import AdminPanel from "./components/admin-panel/AdminPanel";
import {AuthProvider} from "./contexts/AuthContext";
import NewCpu from "./components/admin-panel/NewCpu";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <body>
                    <header>
                        <Navbar/>
                    </header>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/parts" element={<Parts/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/logout" element={<Logout/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/account" element={<Account/>}></Route>
                        <Route path="/admin" element={<AdminPanel/>}></Route>
                        <Route path="/admin/newCpu" element={<NewCpu/>}></Route>
                        <Route path="/admin/newGpu" element={<NewCpu/>}></Route>
                        <Route path="/admin/newMemory" element={<NewCpu/>}></Route>
                        <Route path="/admin/newMotherboard" element={<NewCpu/>}></Route>
                        <Route path="/admin/newStorage" element={<NewCpu/>}></Route>
                    </Routes>
                    <footer>
                        <Footer/>
                    </footer>
                    </body>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
