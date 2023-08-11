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
import Configuration from "./components/configuration/Configuration";
import NewGpu from "./components/admin-panel/NewGpu";
import NewMotherboard from "./components/admin-panel/NewMotherboard";
import NewMemory from "./components/admin-panel/NewMemory";
import NewStorage from "./components/admin-panel/NewStorage";

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
                        <Route path="/admin" element={<AdminPanel/>}/>
                        <Route path="/admin/newCpu" element={<NewCpu/>}></Route>
                        <Route path="/admin/newGpu" element={<NewGpu/>}></Route>
                        <Route path="/admin/newMemory" element={<NewMemory/>}></Route>
                        <Route path="/admin/newMotherboard" element={<NewMotherboard/>}></Route>
                        <Route path="/admin/newStorage" element={<NewStorage/>}></Route>
                        <Route path="/config" element={<Configuration/>}></Route>
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
