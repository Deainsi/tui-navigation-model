import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./Home";
import Transfer from "./Transfer";
import Email from "./Email";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/Transfer' element={<Transfer/>}/>
                <Route path='/Email' element={<Email/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;