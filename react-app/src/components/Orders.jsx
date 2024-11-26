import React, { useState, useEffect } from 'react';

const { electron } = window;

const Orders = () => {
    const [ordersData, setOrdersData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        // Загружаем данные при монтировании компонента
        const loadOrdersData = async () => {
            try {
                const response = await electron.loadOrders();
                if (response.success) {
                    setOrdersData(response.data); // Сохраняем данные в состоянии
                } else {
                    setError('Не удалось загрузить заказы.');
                }
            } catch (err) {
                setError('Произошла ошибка при загрузке данных.');
            }
        };

        loadOrdersData(); // Вызов функции загрузки данных
    }, []);

    return (
        <div className="orders-container">
            <h1 className="orders-title">Заказы</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {Object.keys(ordersData).length > 0 ? (
                <ul className="orders-list">
                    {Object.entries(ordersData).map(([id, order]) => (
                        <li
                            key={id}
                            className={`order-item ${
                                order.OrderStatus === 'Согласован клиентом' ? 'approved' : 'draft'
                            }`}
                        >
                            {`${id}. Дата заказа: ${order.orderDate}, Дата выполнения: ${order.deliveryDate}, Имя заказчика: ${order.customerInfo}, Вид продукции: ${order.productType}, Количество: ${order.quantity}, Дополнительно: ${order.additionalInfo}, Статус заказа: ${order.OrderStatus}`}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="orders-empty">Данные о заказах отсутствуют.</p>
            )}
        </div>
    );
};

export default Orders;
