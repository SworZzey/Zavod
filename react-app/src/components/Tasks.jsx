import React, {useEffect, useState} from 'react';
const { electron } = window

const Tasks = () => {
    const [error, setError] = useState('')
    const [tasksData, setTasksData] = useState({})

    useEffect(() => {
        const loadTasksData = async () => {
            try {
                const response = await electron.loadZads()
                if (response.success) {
                    setTasksData(response.data)
                } else {
                    setError('Не удалось загрузить заказы.');
                }
            } catch (e) {
                setError('Произошла ошибка при загрузке данных.');
            }
        }
        loadTasksData()
    }, [])
    return (
        <div>
            <h1 className="orders-title">Заказы</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}

            {Object.keys(tasksData).length > 0 ? (
                <ul className="orders-list">
                    {Object.entries(tasksData).map(([id, task]) => (
                        <li
                            key={id}
                            className="order-item"
                        >
                            {`${id}. Дата регистрации: ${task.registrationDate}, Дата начала выполнения: ${task.startDate}, Номер заказа на лесопродукцию: ${task.order}, Вид лесопродукции: ${task.productType}, Количество: ${task.quantity}, Задействованные цеха: ${task.workshops}, Дополнительно: ${task.additionalInfo}`}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="orders-empty">Данные о заказах отсутствуют.</p>
            )}
        </div>
    );
};

export default Tasks;