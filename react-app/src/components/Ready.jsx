import React, {useEffect, useState} from 'react';
const { electron } = window

const Ready = () => {
    const [error, setError] = useState('')
    const [redData, setRedData] = useState({})

    useEffect(() => {
        const loadRedData = async () => {
            try {
                const response = await electron.loadReds()
                if (response.success) {
                    setRedData(response.data)
                } else {
                    setError('Не удалось загрузить заказы.');
                }
            } catch (e) {
                setError('Произошла ошибка при загрузке данных.');
            }
        }
        loadRedData()
    }, [])
    return (
        <div>
            <h1 className="orders-title">Задания на оснастку</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}

            {Object.keys(redData).length > 0 ? (
                <ul className="orders-list">
                    {Object.entries(redData).map(([id, red]) => (
                        <li
                            key={id}
                            className="order-item"
                        >
                            {`${id}. Дата регистрации: ${red.registrationDate}, Дата выполнения подготовки: ${red.preparationDate}, Номер задания на производство: ${red.productionTask}, Рабочий участок: ${red.workArea}, Что нужно настроить: ${red.setupInfo}, Статус: ${red.readyStatus}`}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="orders-empty">Данные о заказах отсутствуют.</p>
            )}
        </div>
    );
};

export default Ready;