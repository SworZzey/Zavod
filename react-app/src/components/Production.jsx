import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Les from "./Les";
import Orders from "./Orders";
import Cekh from "./cekh";
import Tasks from "./Tasks";
import Zadanie from "./zadanie";


const Production = () => {
    const [isLesVis, setIsLesVis] = useState(false)
    const [isOrdersVis, setIsOrdersVis] = useState(false)
    const [isCekhVis, setIsCekhVis] = useState(false)
    const [isTaskVis, setIsTaskVis] = useState(false)
    const [isZadVis, setIsZadVis] = useState(false)



    const toggleVis = () => {
        setIsLesVis(!isLesVis)
        setIsOrdersVis(false)
        setIsCekhVis(false)
        setIsTaskVis(false)
        setIsZadVis(false)
    }
    const toggleOrderVis = () => {
        setIsOrdersVis(!isOrdersVis)
        setIsLesVis(false)
        setIsCekhVis(false)
        setIsTaskVis(false)
        setIsZadVis(false)
    }
    const toggleCekhVis = () => {
        setIsCekhVis(!isCekhVis)
        setIsOrdersVis(false)
        setIsLesVis(false)
        setIsTaskVis(false)
        setIsZadVis(false)
    }
    const toggleTaskVis = () => {
        setIsTaskVis(!isTaskVis)
        setIsOrdersVis(false)
        setIsLesVis(false)
        setIsCekhVis(false)
        setIsZadVis(false)
    }
    const toggleZadVis = () => {
        setIsZadVis(!isZadVis)
        setIsOrdersVis(false)
        setIsLesVis(false)
        setIsCekhVis(false)
        setIsTaskVis(false)
    }

    return (
        <div>
            <header>
                <h1 className="Commerce">Служба производства</h1>
                <NavLink className="MainPage" to='/'>Главная</NavLink>
                <button className="vidLes" onClick={toggleVis}>Виды лесопродукции</button>
                <button className="Order1" onClick={toggleOrderVis}>Заказы</button>
                <button className="Order1" onClick={toggleCekhVis}>Цехи завода</button>
                <button className="Order1" onClick={toggleTaskVis}>Задания на производство</button>
                <button className="Order2" onClick={toggleZadVis}>Создать задание на производство</button>
                {isLesVis && <Les/>}
                {isOrdersVis && <Orders/>}
                {isCekhVis && <Cekh/>}
                {isTaskVis && <Tasks/>}
                {isZadVis && <Zadanie/>}
            </header>
        </div>
    );
};

export default Production;