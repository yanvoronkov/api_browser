// Aplication ID:625787
// Access Key:GmaLVGdPH0SVxp-GV4igFjgYLjkFiV3TLpIhNJ0fENo
// Secret key:USrEZkvdv1iXPR_OeTcK9NndtYjF1HUahhUSHMRlZgA

// Разработка веб - приложения:

// • Создайте HTML - страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API - ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка".Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу.

// * Дополнительные задачи(по желанию):

// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался.
// • Реализуйте возможность просмотра предыдущих "фото дня" с сохранением их в истории просмотров.


const unsplashAccessKey = 'GmaLVGdPH0SVxp-GV4igFjgYLjkFiV3TLpIhNJ0fENo';
let currentPhotoId = '';

async function loadRandomPhoto() {
	try {
		const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}`);
		const data = await response.json();

		currentPhotoId = data.id;
		document.getElementById('photo').src = data.urls.regular;
		document.getElementById('author').textContent = `Автор: ${data.user.name}`;

		let likes = 0;
		const storedData = JSON.parse(localStorage.getItem(currentPhotoId));
		if (storedData) {
			likes = storedData.likes;
		} else {
			localStorage.setItem(currentPhotoId, JSON.stringify({
				id: currentPhotoId,
				url: data.urls.regular,
				author: data.user.name,
				likes: likes,
				lastViewed: new Date().toLocaleString()
			}));
		}
		updateLikeButton(likes);

		updateHistory();
	} catch (error) {
		console.error('Error loading photo:', error);
	}
}

function updateLikes() {
	const storedData = JSON.parse(localStorage.getItem(currentPhotoId));
	storedData.likes++;
	localStorage.setItem(currentPhotoId, JSON.stringify(storedData));
	updateLikeButton(storedData.likes);
}

function updateLikeButton(likes) {
	const likeBtn = document.getElementById('like-btn');
	likeBtn.textContent = `${likes} ${likes === 1 ? 'лайк' : 'лайков'}`;
}

function updateHistory() {
	const historyContainer = document.getElementById('history-container');
	historyContainer.innerHTML = '';

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const data = JSON.parse(localStorage.getItem(key));

		const historyItem = document.createElement('div');
		historyItem.className = 'history-item';
		historyItem.innerHTML = `
                    <a href="#" onclick="loadSavedPhoto('${key}'); return false;">${data.author}</a>
                    (Просмотрено: ${data.lastViewed})
                `;
		historyContainer.appendChild(historyItem);
	}
}

function loadSavedPhoto(id) {
	const data = JSON.parse(localStorage.getItem(id));
	currentPhotoId = id;
	document.getElementById('photo').src = data.url;
	document.getElementById('author').textContent = `Автор: ${data.author}`;
	updateLikeButton(data.likes);


	data.lastViewed = new Date().toLocaleString();
	localStorage.setItem(id, JSON.stringify(data));

	updateHistory();
}

document.getElementById('like-btn').addEventListener('click', updateLikes);

loadRandomPhoto();