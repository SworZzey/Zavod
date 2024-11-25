import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Les from "./Les";
import Clients from "./Clients";
import Orders from "./Orders";

const Commerce = () => {
    const [isLesVis, setIsLesVis] = useState(false)
    const [isClientVis, setIsClientVis] = useState(false)
    const [isOrdersVis, setIsOrdersVis] = useState(false)

    const toggleLesVis = () => {
        setIsLesVis(!isLesVis);
        setIsClientVis(false)
        setIsOrdersVis(false)
    }
    const toggleClientVis = () => {
        setIsClientVis(!isClientVis);
        setIsLesVis(false)
        setIsOrdersVis(false)
    }
    const toggleOrdersVis = () => {
        setIsOrdersVis(!isOrdersVis);
        setIsLesVis(false)
        setIsClientVis(false)
    }

    return (
        <div>
            <h1 className="Commerce">Коммерция</h1>
            <NavLink className="MainPage" to='/'>Главная</NavLink>
            <button className="vidLes" onClick={toggleLesVis}>Виды лесопродукции</button>
            <button className="Clint1" onClick={toggleClientVis}>Клиенты</button>
            <button className="Order1" onClick={toggleOrdersVis}>Заказы</button>
            {isLesVis && <Les/>}
            {isClientVis && <Clients/>}
            {isOrdersVis && <Orders/>}
        </div>
    );
};

export default Commerce;