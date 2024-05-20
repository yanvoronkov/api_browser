/**
 * Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе.
 * Каждое занятие имеет название, время проведения, максимальное количество участников 
 * и текущее количество записанных участников.

1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно 
отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.

3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное
количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

4. После успешной записи пользователя на занятие, обновите количество записанных участников
и состояние кнопки "Записаться".

5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись".
После отмены записи, обновите количество записанных участников и состояние кнопки.

6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

7. При разработке используйте Bootstrap для стилизации элементов.
 */

fetch('data.json')
	.then(response => response.json())
	.then(data => {
		const lessonsContainer = document.getElementById('lessons-container');

		data.lessons.forEach(lesson => {
			const lessonElement = document.createElement('div');
			lessonElement.classList.add('card', 'mb-3');

			const lessonHeader = document.createElement('div');
			lessonHeader.classList.add('card-header');
			lessonHeader.textContent = lesson.name;

			const lessonBody = document.createElement('div');
			lessonBody.classList.add('card-body');

			const lessonTime = document.createElement('p');
			lessonTime.classList.add('card-text');
			lessonTime.textContent = lesson.time;

			const lessonMaxParticipants = document.createElement('p');
			lessonMaxParticipants.classList.add('card-text');
			lessonMaxParticipants.textContent = `Максимальное количество участников: ${lesson.maxParticipants}`;

			const lessonParticipants = document.createElement('p');
			lessonParticipants.classList.add('card-text');
			lessonParticipants.textContent = `Текущее количество записанных участников: ${lesson.participants}`;

			const enrollButton = document.createElement('button');
			enrollButton.classList.add('btn', 'btn-primary');
			enrollButton.textContent = 'Записаться';

			if (lesson.participants >= lesson.maxParticipants) {
				enrollButton.disabled = true;
			}

			enrollButton.addEventListener('click', () => {
				lesson.participants++;
				lessonParticipants.textContent = `Текущее количество записанных участников: ${lesson.participants}`;

				if (lesson.participants >= lesson.maxParticipants) {
					enrollButton.disabled = true;
				}
				if (lesson.participants > 0) {
					cancelEnrollButton.disabled = false;
				}
			});

			const cancelEnrollButton = document.createElement('button');
			cancelEnrollButton.classList.add('btn', 'btn-danger');
			cancelEnrollButton.textContent = 'Отменить запись';
			if (lesson.participants <= 0) {
				cancelEnrollButton.disabled = true;
			} else {
				cancelEnrollButton.disabled = false;
			}

			cancelEnrollButton.addEventListener('click', () => {

				lesson.participants--;
				lessonParticipants.textContent = `Текущее количество записанных участников: ${lesson.participants}`;

				if (lesson.participants < lesson.maxParticipants) {
					enrollButton.disabled = false;
				}
				if (lesson.participants <= 0) {
					cancelEnrollButton.disabled = true;
				}
			});

			lessonBody.appendChild(lessonTime);
			lessonBody.appendChild(lessonMaxParticipants);
			lessonBody.appendChild(lessonParticipants);
			lessonBody.appendChild(enrollButton);
			lessonBody.appendChild(cancelEnrollButton);

			lessonElement.appendChild(lessonHeader);
			lessonElement.appendChild
			lessonElement.appendChild(lessonBody);
			lessonsContainer.appendChild(lessonElement);
		});

	})

	.catch(error => console.error(error));