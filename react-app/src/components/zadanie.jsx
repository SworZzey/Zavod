import React, { useState, useEffect } from 'react';

const Zadanie = () => {
    const [formData, setFormData] = useState({
        registrationDate: '',
        startDate: '',
        order: '',
        productType: '',
        quantity: '',
        workshops: [],
        additionalInfo: ''
    });

    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [orderOptions, setOrderOptions] = useState([]); // Для хранения номеров заказов из bd.json

    // Загрузка номеров заказов при монтировании компонента
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await window.electron.loadOrders();
                if (response.success) {
                    // Фильтруем заказы, убирая те, у которых статус "Черновик"
                    const filteredOrders = Object.entries(response.data)
                        .filter(([id, order]) => order.OrderStatus !== 'Черновик')
                        .map(([id]) => id); // Получаем только номера заказов

                    setOrderOptions(filteredOrders);
                } else {
                    setErrorMessages([response.error || 'Не удалось загрузить заказы.']);
                }
            } catch (error) {
                console.error('Error loading orders:', error);
                setErrorMessages(['Произошла ошибка при загрузке заказов.']);
            }
        };

        fetchOrders();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const workshops = ["Лесопильный цех", "Сушильный комплекс", "Цех строжки и обработки", "Пеллетный цех"];
    const handleWorkshopChange = (event) => {
        const { value, checked } = event.target;

        setFormData((prevFormData) => {
            if (checked) {
                // Добавляем цех
                return { ...prevFormData, workshops: [...prevFormData.workshops, value] };
            } else {
                // Убираем цех
                return {
                    ...prevFormData,
                    workshops: prevFormData.workshops.filter((workshop) => workshop !== value)
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];
        const { registrationDate, startDate, order } = formData;

        if (registrationDate && startDate && new Date(registrationDate) > new Date(startDate)) {
            errors.push('Дата начала работы не может быть меньше даты регистрации задания.');
        }
        if (formData.workshops.length === 0) {
            errors.push('Выберите хотя бы 1 цех');
        }
        if (formData.quantity === "0") {
            errors.push('Укажите количество продукции')
        }
        if (Number(formData.quantity) < 0) {
            errors.push('Укажите положительное число продукции')
        }
        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }
        setErrorMessages([]);

        try {
            // Сохраняем задание
            const saveResponse = await window.electron.saveZad(formData);

            if (saveResponse.success) {
                // Обновляем статус заказа
                const updateResponse = await window.electron.updateOrderStatus({
                    orderId: formData.order,
                    newStatus: 'Принят в производство',
                });

                if (updateResponse.success) {
                    setSuccessMessage('Данные успешно сохранены, статус заказа обновлён!');
                    setFormData({
                        registrationDate: '',
                        startDate: '',
                        order: '',
                        productType: '',
                        quantity: '',
                        workshops: [],
                        additionalInfo: ''
                    });
                } else {
                    setErrorMessages([updateResponse.error || 'Ошибка при обновлении статуса заказа.']);
                }
            } else {
                setErrorMessages([saveResponse.error || 'Ошибка при сохранении данных.']);
            }
        } catch (error) {
            console.error('Error during submission:', error);
            setErrorMessages(['Произошла ошибка при отправке данных.']);
        }
    };

    return (
        <div>
            <form className="production-task-form" onSubmit={handleSubmit}>
                <h2>Регистрация задания на производство</h2>

                <label>Дата регистрации задания</label>
                <input
                    type="date"
                    name="registrationDate"
                    value={formData.registrationDate}
                    onChange={handleChange}
                    required
                />

                <label>Дата начала выполнения</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />

                <label>Номер заказа:</label>
                <select
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите номер заказа</option>
                    {orderOptions.map((order) => (
                        <option key={order} value={order}>
                            {order}
                        </option>
                    ))}
                </select>

                <label>Вид лесопродукции</label>
                <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    required
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
                    required
                />

                <label>Цеха:</label>
                {workshops.map((workshop, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="checkbox"
                                name="workshops"
                                value={workshop}
                                checked={formData.workshops.includes(workshop)}
                                onChange={handleWorkshopChange}
                            />
                            {workshop}
                        </label>
                    </div>
                ))}

                <label>Дополнительная информация</label>
                <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Дополнительная информация"
                    rows="3"
                />

                <button type="submit">Зарегистрировать задание</button>
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
            </form>
        </div>
    );
};

export default Zadanie;
