import { Modal } from "./Modal.js";

let initialCapacity = 0;

function eventMainPage() {
	const button = document.querySelector(".capacity__submit");
	button.addEventListener("click", goToMainPage);
}

function getCapacityValue() {
	const input = document.querySelector(".capacity__input");
	initialCapacity = +input.value;
	localStorage.setItem("initialCapacity", initialCapacity);

	return initialCapacity;
}

function goToMainPage(event) {
	event.preventDefault();
	getCapacityValue();
	if (initialCapacity > 0 && initialCapacity <= 20) {
		localStorage.setItem("initialCapacity", initialCapacity);
		window.location.href = "/game-page.html";
		return;
	}
	Modal.criarEventoModal(
		"Não foi possível criar a carroça",
		"Digite um valor entre 1 e 20!!"
	);
}

eventMainPage();
