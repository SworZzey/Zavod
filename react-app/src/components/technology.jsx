import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Les from "./Les";
import Cekh from "./cekh";
import Tasks from "./Tasks";
import Zadanie from "./zadanie";
import Gotov from "./Gotov";
import Ready from "./Ready";

const Technology = () => {
    const [isLesVis, setIsLesVis] = useState(false)
    const [isCekhVis, setIsCekhVis] = useState(false)
    const [isTaskVis, setIsTaskVis] = useState(false)
    const [isZadVis, setIsZadVis] = useState(false)
    const [isReadyVis, setIsReadyVis] = useState(false)
    const [isRedVis, setIsRedVis] = useState(false)

    const toggleVis = () => {
        setIsLesVis(!isLesVis)
        setIsCekhVis(false)
        setIsZadVis(false)
        setIsTaskVis(false)
        setIsReadyVis(false)
        setIsRedVis(false)
    }
    const toggleCekhVis = () => {
        setIsCekhVis(!isCekhVis)
        setIsLesVis(false)
        setIsZadVis(false)
        setIsTaskVis(false)
        setIsReadyVis(false)
        setIsRedVis(false)
    }
    const toggleTasksVis = () => {
        setIsTaskVis(!isTaskVis)
        setIsLesVis(false)
        setIsCekhVis(false)
        setIsZadVis(false)
        setIsReadyVis(false)
        setIsRedVis(false)
    }
    const toggleZadVis = () => {
        setIsZadVis(!isZadVis)
        setIsLesVis(false)
        setIsCekhVis(false)
        setIsTaskVis(false)
        setIsReadyVis(false)
        setIsRedVis(false)
    }
    const toggleReadyVis = () => {
        setIsReadyVis(!isReadyVis)
        setIsLesVis(false)
        setIsCekhVis(false)
        setIsTaskVis(false)
        setIsZadVis(false)
        setIsRedVis(false)
    }
    const toggleRedVis = () => {
        setIsRedVis(!isRedVis)
        setIsLesVis(false)
        setIsCekhVis(false)
        setIsTaskVis(false)
        setIsZadVis(false)
        setIsReadyVis(false)
    }


    return (
        <div>
            <h1 className="Commerce">Служба технолога</h1>
            <NavLink className="MainPage" to='/'>Главная</NavLink>
            <button className="vidLes" onClick={toggleVis}>Виды лесопродукции</button>
            <button className="vidLes" onClick={toggleCekhVis}>Цехи завода</button>
            <button className="vidLes" onClick={toggleTasksVis}>Задания на производство</button>
            <button className="Order2" onClick={toggleZadVis}>Создать задание на производство</button>
            <button className="Order3" onClick={toggleReadyVis}>Создать задание на подготовку рабочего участка</button>
            <button className="Order2" onClick={toggleRedVis}>Задания на подготовку рабочего участка</button>
            {isLesVis && <Les/>}
            {isCekhVis && <Cekh/>}
            {isTaskVis && <Tasks/>}
            {isZadVis && <Zadanie/>}
            {isReadyVis && <Gotov/>}
            {isRedVis && <Ready/>}
        </div>
    );
};

export default Technology;