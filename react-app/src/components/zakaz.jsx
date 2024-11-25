import React, { useState } from 'react';
import {NavLink} from "react-router-dom";
const { ipcRenderer } = window.electron

const Zakaz = () => {
    const [formData, setFormData] = useState({
        orderDate: '',
        deliveryDate: '',
        customerInfo: '',
        productType: '',
        quantity: '',
        additionalInfo: '',
        OrderStatus: ''
    });
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = [];
        const { orderDate, deliveryDate } = formData;

        if (!orderDate || !deliveryDate) {
            errors.push('Все обязательные поля должны быть заполнены.');
        }

        if (deliveryDate && orderDate && new Date(deliveryDate) <= new Date(orderDate)) {
            errors.push('Дата поставки не может быть меньше или равна дате регистрации заказа.');
        }

        if (formData.customerInfo !== "" && formData.productType !== "" && formData.quantity !== 0) {
            formData.OrderStatus = "Согласован клиентом"
        } else {
            formData.OrderStatus = "Черновик"
        }

        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }

        setErrorMessages([]);

        // Отправляем данные в главный процесс для сохранения
        ipcRenderer.send('save-order', formData);

        // Слушаем подтверждение от главного процесса
        ipcRenderer.once('order-saved', (event, success) => {
            if (success) {
                setSuccessMessage('Данные успешно сохранены!');
                setFormData({
                    orderDate: '',
                    deliveryDate: '',
                    customerInfo: '',
                    productType: '',
                    quantity: '',
                    additionalInfo: '',
                    OrderStatus: ''
                });
            } else {
                setErrorMessages(['Ошибка при сохранении данных.']);
            }
        });
    };

    return (
        <div>
            <h1 className="Commerce">Форма заказа лесопродукции</h1>
            <NavLink className="MainPage" to='/'>Главная</NavLink>
            <form onSubmit={handleSubmit}>
                <label>Дата регистрации заказа</label>
                <input
                    type="date"
                    name="orderDate"
                    value={formData.orderDate}
                    onChange={handleChange}
                    required
                />

                <label>Дата поставки</label>
                <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    required
                />

                <label>Информация о клиенте</label>
                <input
                    type="text"
                    name="customerInfo"
                    value={formData.customerInfo}
                    onChange={handleChange}
                />

                <label>Вид лесопродукции</label>
                <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                >
                    <option value="">Выберите вид лесопродукции</option>
                    <option value="Сырые пиломатериалы">Сырые пиломатериалы</option>
                    <option value="Сухие пиломатериалы">Сухие пиломатериалы</option>
                    <option value="Строганные доски">Строганные доски</option>
                    <option value="Рейки">Рейки</option>
                    <option value="Брус">Брус</option>
                    <option value="Пеллеты">Пеллеты</option>
                </select>

                <label>Количество лесопродукции (шт.)</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                />

                <label>Дополнительная информация</label>
                <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                />

                <button type="submit">Отправить</button>
            </form>

            {errorMessages.length > 0 && (
                <div>
                    {errorMessages.map((msg, i) => (
                        <p key={i} style={{ color: 'red' }}>{msg}</p>
                    ))}
                </div>
            )}

            {successMessage && (
                <p style={{ color: 'green' }}>{successMessage}</p>
            )}
        </div>
    );
};

export default Zakaz;
