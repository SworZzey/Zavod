import React from 'react';
import ordersData from './application/bd.json';

const Orders = () => {
    return (
        <div className="orders-container">
            <h1 className="orders-title">Заказы</h1>
            {Object.entries(ordersData).length > 0 ? (
                <ul className="orders-list">
                    {Object.entries(ordersData).map(([id, order]) => (
                        <li
                            key={id}
                            className={`order-item ${
                                order.OrderStatus === "Согласован клиентом" ? 'approved' : 'draft'
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
