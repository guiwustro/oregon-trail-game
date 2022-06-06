let initialCapacity = 0;

function eventMainPage() {
	const button = document.querySelector(".capacity__submit");
	button.addEventListener("click", goToMainPage);
}

function getCapacityValue() {
	const input = document.querySelector(".capacity__input");
	initialCapacity = +input.value;
	return initialCapacity;
}

console.log(initialCapacity);

function goToMainPage(event) {
	event.preventDefault();
	getCapacityValue();
	if (initialCapacity > 0 && initialCapacity <= 20) {
		console.log(initialCapacity);
		window.location.href = "/game-page.html";
	} else {
		alert("Digite um valor entre 1 e 20!!");
	}
	return initialCapacity;
	//!Fazer uma aviso que o número deve ser entre 0 e 20!
}
console.log(initialCapacity);

eventMainPage();

// module.exports = { initialCapacity };
