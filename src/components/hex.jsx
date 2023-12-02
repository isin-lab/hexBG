import React, { useState } from 'react';


const ColorConverter = () => {
  const [hexColor, setHexColor] = useState('');
  const [rgbColor, setRgbColor] = useState('');
  const [error, setError] = useState('');

  const handleHexChange = (event) => {
    const inputHex = event.target.value;
    setHexColor(inputHex);

    // Проверка на правильность формата HEX цвета после ввода всех символов
    if (inputHex.length === 7) {
      if (/^#[0-9A-F]{6}$/i.test(inputHex)) {
        const hex = inputHex.substring(1); // Удалить символ '#'
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        setRgbColor(`RGB(${r}, ${g}, ${b})`);
        setError('');
        document.body.style.backgroundColor = inputHex; // Установить цвет фона
      } else {
        setError('Ошибка: Неправильный формат HEX цвета');
        setRgbColor('');
        document.body.style.backgroundColor = 'red'; // Установить красный цвет фона в случае ошибки
      }
    }
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Введите HEX цвет"
        value={hexColor}
        onChange={handleHexChange}
      />
      <input type="text" value={rgbColor} readOnly />
      {error && <div>{error}</div>}
    </form>
  );
};

export default ColorConverter;
