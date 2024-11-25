import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Les from "./Les";

const Technology = () => {
    const [isLesVis, setIsLesVis] = useState(false)

    const toggleVis = () => {
        setIsLesVis(!isLesVis)
    }
    return (
        <div>
            <h1 className="Commerce">Служба технолога</h1>
            <NavLink className="MainPage" to='/'>Главная</NavLink>
            <button className="vidLes" onClick={toggleVis}>Виды лесопродукции</button>
            {isLesVis && <Les/>}
        </div>
    );
};

export default Technology;