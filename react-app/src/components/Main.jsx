import React from 'react';
import {NavLink} from "react-router-dom";


const Main = () => {
    return (
        <div>
            <h1 className="HeadSrvices">Выберите службу предприятия</h1>
            <NavLink className="Commer" to='/com'>Коммерческая служба</NavLink>
            <NavLink className="Prod" to='/prod'>Служба производства</NavLink>
            <NavLink className="techno" to='/tech'>Служба технолога</NavLink>
            <h1 className="HeadClient">Сделать заказ (Для Клиентов)</h1>
            <NavLink className="zak" to='/zak'>Перейти</NavLink>
        </div>
    );
};

export default Main;