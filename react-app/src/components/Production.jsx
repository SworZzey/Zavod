import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Les from "./Les";
import Orders from "./Orders";


const Production = () => {
    const [isLesVis, setIsLesVis] = useState(false)
    const [isOrdersVis, setIsOrdersVis] = useState(false)

    const toggleVis = () => {
        setIsLesVis(!isLesVis)
        setIsOrdersVis(false)
    }
    const toggleOrderVis = () => {
        setIsOrdersVis(!isOrdersVis)
        setIsLesVis(false)
    }
    return (
        <div>
            <header>
                <h1 className="Commerce">Служба производства</h1>
                <NavLink className="MainPage" to='/'>Главная</NavLink>
                <button className="vidLes" onClick={toggleVis}>Виды лесопродукции</button>
                <button className="Order1" onClick={toggleOrderVis}>Заказы</button>
                {isLesVis && <Les/>}
                {isOrdersVis && <Orders/>}
            </header>
        </div>
    );
};

export default Production;