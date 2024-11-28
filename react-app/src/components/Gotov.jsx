import React, {useEffect, useState} from 'react';

const Gotov = () => {

    const [formData, setFormData] = useState({
        registrationDate: '',
        preparationDate: '',
        productionTask: '',
        workArea: '',
        setupInfo: '',
        readyStatus: ''
    })

    const [errorMessages, setErrorMessages] = useState([])
    const [successMessage, setSuccessMessage] = useState('')
    const [redOptions, setReedOptions] = useState([]); // Для хранения номеров заказов из bd.json
    const [zadData, setZadData] = useState({}) // для хранения данных из zad.json

    useEffect(() => {
        const fetchReady = async () => {
            try {
                const response = await window.electron.loadZads();
                if (response.success) {
                    const filteredReds = Object.keys(response.data)
                    setZadData(response.data)
                    setReedOptions(filteredReds);
                } else {
                    setErrorMessages([response.error || 'Не удалось загрузить задания.']);
                }
            } catch (error) {
                console.error('Error loading orders:', error);
                setErrorMessages(['Произошла ошибка при загрузке заданий.']);
            }
        };

        fetchReady();
    }, []);


    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = []
        const { registrationDate, preparationDate } = formData

        if (registrationDate && preparationDate && new Date(preparationDate) <= new Date(registrationDate)) {
            errors.push('Дата регистрации задания не может быть больше даты выполнения')
        }

        if (formData.productionTask) {
            const startDate = zadData[formData.productionTask]?.startDate;
            if (startDate && new Date(preparationDate) > new Date(startDate)) {
                errors.push(`Дата подготовки (${preparationDate}) не может быть позже даты начала (${startDate}) задания.`);
            }
        }

        if (errors.length > 0) {
            setErrorMessages(errors)
            return
        }

        setErrorMessages([])

        const updatedFormData = {
            ...formData,
            readyStatus: 'Создан'
        }

        try {
            const response = await window.electron.saveRed(updatedFormData)

            if (response.success) {
                setSuccessMessage('Данные успешно сохранены')

                setFormData({
                    registrationDate: '',
                    preparationDate: '',
                    productionTask: '',
                    workArea: '',
                    setupInfo: '',
                    readyStatus: ''
                })
            } else {
                setErrorMessages([response.error || 'Ошибка при сохранении данных.']);
            }
        } catch (e) {
            console.error('Error sending order data:', e);
            setErrorMessages(['Произошла ошибка при отправке данных.']);
        }

    }

    return (
        <div>
            <form className="preparation-task-form" onSubmit={handleSubmit}>
                <h2>Регистрация задания на подготовку рабочего участка</h2>

                <label>Дата регистрации задания</label>
                <input
                    type="date"
                    name="registrationDate"
                    value={formData.registrationDate}
                    onChange={handleChange}
                    required
                />

                <label>Дата подготовки рабочего участка</label>
                <input
                    type="date"
                    name="preparationDate"
                    value={formData.preparationDate}
                    onChange={handleChange}
                    required
                />

                <label>Задание на производство</label>
                <select
                    name="productionTask"
                    value={formData.productionTask}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите номер задания</option>
                    {redOptions.map((red) => (
                        <option key={red} value={red}>
                            {red}
                        </option>
                    ))}
                </select>

                <label>Рабочий участок</label>
                <select
                    name="workArea"
                    value={formData.workArea}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите рабочий участок</option>
                    <option value="Лесопильная линия №1">Лесопильная линия №1</option>
                    <option value="Лесопильная линия №2">Лесопильная линия №2</option>
                    <option value="Сушильная камера №1,">Сушильная камера №1</option>
                    <option value="Сушильная камера №2,">Сушильная камера №2</option>
                    <option value="Сушильная камера №3,">Сушильная камера №3</option>
                    <option value="Сушильная камера №4,">Сушильная камера №4</option>
                    <option value="Линия строжки №1">Линия строжки №1</option>
                    <option value="Линия строжки №2">Линия строжки №2</option>
                    <option value="Линия строжки №3">Линия строжки №3</option>
                    <option value="Дробилка">Дробилка</option>
                    <option value="Сушилка">Сушилка</option>
                    <option value="Гранулятор №1">Гранулятор №1</option>
                    <option value="Гранулятор №2">Гранулятор №2</option>
                </select>

                <label>Что нужно настроить</label>
                <textarea
                    name="setupInfo"
                    value={formData.setupInfo}
                    onChange={handleChange}
                    placeholder="Опишите настройки рабочего участка"
                    rows="4"
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

export default Gotov;