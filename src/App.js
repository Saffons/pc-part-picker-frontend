import './App.css';
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";
import Parts from "./components/parts/Parts";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Footer from "./components/footer/Footer";
import Account from "./components/account/Account";
import AdminPanel from "./components/admin-panel/AdminPanel";

function App() {
  return (

    <div className="App">
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/parts" element={<Parts />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/account" element={<Account />}></Route>
                <Route path="/admin" element={<AdminPanel />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
