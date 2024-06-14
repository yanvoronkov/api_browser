let currentIndex = 0;

function showImage(index) {
	const images = document.querySelectorAll('.slider-image');
	const dots = document.querySelectorAll('.dot');
	if (index >= images.length) currentIndex = 0;
	if (index < 0) currentIndex = images.length - 1;

	images.forEach((img, i) => {
		img.style.transform = `translateX(${-currentIndex * 100}%)`;
		dots[i].classList.remove('active');
	});

	dots[currentIndex].classList.add('active');
}

function nextImage() {
	currentIndex++;
	showImage(currentIndex);
}

function prevImage() {
	currentIndex--;
	showImage(currentIndex);
}

function currentImage(index) {
	currentIndex = index - 1;
	showImage(currentIndex);
}

document.addEventListener('DOMContentLoaded', () => {
	showImage(currentIndex - 1);
});
