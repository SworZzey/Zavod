import './App.css';
import {HashRouter, Routes, Route} from "react-router-dom";
import Commerce from "./components/Commerce";
import Production from "./components/Production";
import Technology from "./components/technology";
import Main from "./components/Main";
import Zakaz from "./components/zakaz";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Main />}></Route>
                    <Route path='/com' element={<Commerce />}></Route>
                    <Route path='/prod' element={<Production />}></Route>
                    <Route path='/tech' element={<Technology />}></Route>
                    <Route path='/zak' element={<Zakaz />}></Route>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
