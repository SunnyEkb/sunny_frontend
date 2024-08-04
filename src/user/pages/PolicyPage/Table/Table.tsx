import React, { FC } from 'react';
import styles from './Table.module.scss';

const Table:FC = () => {
	const data = [
		{
			name: 'Цель обработки',
			description:
				'Информирование Пользователя посредством отправки электронных писем',
		},
		{
			name: 'Персональные данные',
			description:
				'Фамилия, имя, отчество,\n электронный адрес,\n номера телефонов,\n год, месяц, дата и место рождения',
		},
		{
			name: 'Правовые основания',
			description:
				'Федеральный закон «Об информации, информационных технологиях и о защите информации» от 27.07.2006 N 149-ФЗ',
		},
		{
			name: 'Виды обработки персональных данных',
			description: 'Отправка информационных писем на адрес электронной почты',
		},
	];

	return (
		<table className={styles.Table}>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className={styles.Table__item_1}>{item.name}</td>
            <td className={styles.Table__item_2}>
              {item.description.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
	);
};

export default Table;
