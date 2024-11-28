import React, {useState} from 'react';
import RabLes from "./RabLes";
import Sush from "./Sush";
import Strozh from "./Strozh";
import Pell from "./Pell";

const Cekh = () => {
    const [isRabLes, setIsRabLes] = useState(false)
    const [isSushVis, setIsSushVis] = useState(false)
    const [isStrozhVis, setIsStrozhVis] = useState(false)
    const [isPellVis, setIsPellVis] = useState(false)

    const toggleRabLes = () => {
        setIsRabLes(!isRabLes)
        setIsSushVis(false)
        setIsStrozhVis(false)
        setIsPellVis(false)
    }
    const toggleSushVis = () => {
        setIsSushVis(!isSushVis)
        setIsRabLes(false)
        setIsStrozhVis(false)
        setIsPellVis(false)
    }
    const toggleStrozhVis = () => {
        setIsStrozhVis(!isStrozhVis)
        setIsSushVis(false)
        setIsRabLes(false)
        setIsPellVis(false)
    }
    const togglePellVis = () => {
        setIsPellVis(!isPellVis)
        setIsSushVis(false)
        setIsRabLes(false)
        setIsStrozhVis(false)
    }

    return (
        <div className="les-container">
            <h2 className="les-title">Цехи производства</h2>
            <ul className="les-list">
                <li><button className="les-rab-button" onClick={toggleRabLes}>Лесопильный цех (Открыть рабочие участки)</button></li>
                {isRabLes && <RabLes/>}
                <li><button className="les-rab-button" onClick={toggleSushVis}>Сушильный комплекс (Открыть рабочие участки)</button></li>
                {isSushVis && <Sush/>}
                <li><button className="les-rab-button" onClick={toggleStrozhVis}>Цех строжки и обработки (Открыть рабочие участки)</button></li>
                {isStrozhVis && <Strozh/>}
                <li><button className="les-rab-button" onClick={togglePellVis}>Пеллетный цех (Открыть рабочие участки)</button></li>
                {isPellVis && <Pell/>}
            </ul>
        </div>
    );
};

export default Cekh;