const wagonCapacity = localStorage.getItem("initialCapacity");
const wagon1 = new Wagon(wagonCapacity);

import { Modal } from "./Modal.js";
//* Identificando os valores

function addTraveler() {
	const submitButton = document.querySelector(".add-traveler__submit");
	submitButton.addEventListener("click", addCardToList);
}

addTraveler();

function getTravelerName(event) {
	event.preventDefault();
	const travelerName = document.querySelector("#travelerName").value;
	if (travelerName.length > 15) {
		Modal.criarEventoModal(
			"Não foi possível adicionar o viajante",
			"O nome deve ter no máximo 15 caracteres"
		);
		return;
	}
	if (travelerName === "") {
		Modal.criarEventoModal(
			"Não foi possível adicionar o viajante",
			"Defina um nome para o viajante"
		);
		return;
	}
	const select = document.getElementById("types");
	const travelerType = select.options[select.selectedIndex].value;
	return { name: travelerName, type: travelerType };
}

function addCardToList(event) {
	const cardList = document.querySelector(".card-list");
	const card = createCard(event);
	if (card === "CarrocaCheia") {
		Modal.criarEventoModal(
			"Não foi possível adicionar o viajante",
			"A carroça já está cheia. Não há vaga para o viajante."
		);
		return;
	}
	cardList.appendChild(card);
	removeEmptyWagon();
}

function removeEmptyWagon() {
	const emptyList = document.querySelector(".card-list__empty");
	const cardList = document.querySelector(".card-list");
	if (emptyList != null) {
		emptyList.remove();
		cardList.classList.remove("card-list--empty");
	}
}

//* Criando cards!
function createCard(event) {
	const travelerData = getTravelerName(event);
	if (travelerData.type === "common") {
		return createChooseCard(
			travelerData,
			Traveler,
			createTravelerCard,
			"card__info card--common card--border-green"
		);
	} else if (travelerData.type === "hunter") {
		return createChooseCard(
			travelerData,
			Hunter,
			createHunterCard,
			"card__info card--hunter card--border-violet"
		);
	} else if (travelerData.type === "doctor") {
		return createChooseCard(
			travelerData,
			Doctor,
			createDoctorCard,
			"card__info card--doctor card--border-cyan"
		);
	}
	return travelerData;
}

function createChooseCard(travelerData, constructorClass, cardType, className) {
	const traveler = new constructorClass(travelerData.name);
	console.log(traveler);
	const verifySlotWagon = wagon1.join(traveler);
	if (verifySlotWagon != false) {
		const card = cardType(traveler);
		card.className = className;
		return card;
	}
	return "CarrocaCheia";
}

function createTravelerCard(traveler) {
	const card = document.createElement("li");
	card.classList.add("card__info");
	const cardName = createCardElement(
		"h3",
		traveler.name,
		"card__traveler-name"
	);
	const cardImg = createCardImg(traveler.constructor.name);
	const cardType = createCardType(traveler.constructor.name);
	const cardFood = createCardFood(traveler);
	const cardIsHealthy = createCardElement(
		"p",
		"Saudável",
		"card__traveler-health",
		`healthy-${idCountTraveler}`
	);

	const cardDiv = createCardElement("div", "", "card__traveler-div", "");
	const cardHunt = createCardHunt(traveler.constructor.name);
	const cardEat = createCardElement(
		"button",
		"Comer",
		"card__traveler-eat",
		`eat-${idCountTraveler}`
	);

	card.append(
		cardName,
		cardImg,
		cardType,
		cardIsHealthy,
		cardFood,
		cardDiv,
		cardHunt,
		cardEat
	);

	return card;
}

function createHunterCard(traveler) {
	const card = createTravelerCard(traveler);
	const cardGiveFood = createCardGiveFood(traveler.id);
	card.append(cardGiveFood);
	return card;
}

function createDoctorCard(traveler) {
	const card = createTravelerCard(traveler);
	const cardHeal = createCardHeal(traveler.id);
	card.append(cardHeal);
	return card;
}

function createCardElement(element, innertext, className, id) {
	const name = document.createElement(element);
	name.innerText = innertext;
	name.className = className;
	name.id = id;
	return name;
}

function createCardType(travelerType) {
	const type = document.createElement("p");
	type.classList.add("card__traveler-type");
	if (travelerType === "Traveler") {
		type.classList.add("card__traveler-type--common");
		type.innerText = "Comum";
	} else if (travelerType === "Hunter") {
		type.classList.add("card__traveler-type--hunter");
		type.innerText = "Caçador";
	} else if (travelerType === "Doctor") {
		type.classList.add("card__traveler-type--doctor");
		type.innerText = "Médico";
	}
	return type;
}

function createCardImg(travelerType) {
	const element = document.createElement("img");
	element.classList.add("card__traveler-img");
	if (travelerType === "Traveler") {
		element.src = "./imgs/Female adventurer/character_femaleAdventurer_hit.png";
	} else if (travelerType === "Hunter") {
		element.src = "./imgs/Male adventurer/character_maleAdventurer_attack0.png";
	} else if (travelerType === "Doctor") {
		element.src = "./imgs/Male person/character_malePerson_attack0.png";
	}
	return element;
}

function createCardFood(traveler) {
	const food = document.createElement("p");
	food.classList.add("card__traveler-food");
	food.innerHTML = `<i class ="fa-solid fa-meat"></i> Comida = <span id ="food-${idCountTraveler}">${traveler.food}</span>`;
	return food;
}

function createCardHunt(travelerType) {
	const hunt = document.createElement("button");
	hunt.classList.add("card__traveler-hunt");
	hunt.innerText = "Caçar";
	travelerType == "Hunter"
		? (hunt.id = `hunt-${idCountTraveler}--hunter`)
		: (hunt.id = `hunt-${idCountTraveler}`);
	return hunt;
}

function createCardGiveFood(travelerId) {
	const giveFood = createCardElement("form", null, "card__traveler-giveFood");
	const label = createCardElement(
		"label",
		"Transferir",
		"giveFood_label-1",
		""
	);

	const inputNumber = document.createElement("input");
	inputNumber.id = `transfer__input-number-${travelerId}`;

	inputNumber.setAttribute("type", "number");
	inputNumber.setAttribute("min", "0");

	const labelSelect = createCardElement(
		"label",
		" unidades de comida para",
		"giveFood_label-2",
		""
	);
	const select = createCardElement(
		"select",
		"",
		`card__select--giveFood`,
		`card__select--giveFood-${travelerId}`
	);
	createSelectOption("giveFood-option", select, travelerId);

	const transferButton = createCardElement(
		"button",
		"Transferir",
		"transfer__button",
		`transfer__button-${travelerId}`
	);
	giveFood.append(label, inputNumber, labelSelect, select, transferButton);
	return giveFood;
}

function createSelectOption(optionType, select, travelerId) {
	const firstOption = document.createElement("option");
	firstOption.value = "";
	firstOption.innerText = "Escolha um viajante";
	select.append(firstOption);
	wagon1.passengers.forEach(({ id, name }) => {
		if (travelerId != id) {
			const selectOption = document.createElement("option");
			selectOption.value = name;
			selectOption.className = "traveler__option";
			selectOption.id = optionType + id;
			selectOption.innerText = name;
			select.append(selectOption);
		}
	});
}

function createCardHeal(travelerId) {
	const heal = createCardElement("form", null, "card__traveler-heal");
	const select = createCardElement(
		"select",
		"",
		`card__select--heal`,
		`card__select--heal-${travelerId}`
	);
	createSelectOption("heal-option", select, travelerId);
	const healButton = createCardElement(
		"button",
		"Curar",
		"card__heal-button",
		`heal-button-${travelerId}`
	);
	heal.append(select, healButton);
	return heal;
}

function wagonStatus() {
	document.addEventListener("click", updateSickAndSlot);
}

wagonStatus();

function updateSickAndSlot() {
	const sickTravelers = document.querySelector(".sick__number");
	const slotNumber = document.querySelector(".slot__number");
	const totalFood = document.querySelector(".food__number");
	const sickNumber = wagon1.passengers.filter(
		({ isHealthy }) => isHealthy === false
	).length;
	sickTravelers.innerText = sickNumber;
	slotNumber.innerText = wagon1.getAvailableSeatCount();
	totalFood.innerText = wagon1.totalFood();
}

const cardList = document.querySelector(".card-list");
cardList.addEventListener("click", actionTraveler);

function actionTraveler(event) {
	if (event.target.tagName === "BUTTON") {
		const idTraveler = +event.target.id.match(/\d/g)[0];
		if (event.target.className.includes("card__traveler-hunt")) {
			action("hunt", idTraveler);
		} else if (event.target.className.includes("card__traveler-eat")) {
			action("eat", idTraveler);
		} else if (event.target.className.includes("transfer__button")) {
			event.preventDefault();
			transferFoodAction(idTraveler);
		}
	}
}

function action(typeAction, idSearch) {
	const traveler = wagon1.passengers.find(({ id }) => id === idSearch);
	typeAction === "hunt" ? traveler.hunt() : traveler.eat();
	const idFood = `#food-${idSearch}`;
	const foodNumber = document.querySelector(idFood);
	foodNumber.innerText = traveler.food;
}

function transferFoodAction(idSender) {
	const travelerSender = wagon1.passengers.find(({ id }) => id === idSender);
	const foodTransfer = +document.getElementById(
		`transfer__input-number-${idSender}`
	).value;

	const idSelect = document.getElementById(
		`card__select--giveFood-${idSender}`
	);
	const selectValue = idSelect.options[idSelect.selectedIndex].value;
	const travelerRecipient = wagon1.passengers.find(
		({ name }) => name === selectValue
	);

	const giveFood = travelerSender.giveFood(travelerRecipient, foodTransfer);
	if (giveFood === false)
		return Modal.criarEventoModal(
			"Não foi possível fazer a transferência de comida",
			"O caçador não possui essa quantidade de comida para transferir. Por favor, selecione um número menor."
		);
	const idFoodSender = `#food-${idSender}`;
	const foodNumberSender = document.querySelector(idFoodSender);
	foodNumberSender.innerText = travelerSender.food;

	const idFoodRecipient = `#food-${travelerRecipient.id}`;
	const foodNumberRecipient = document.querySelector(idFoodRecipient);
	foodNumberRecipient.innerText = travelerRecipient.food;
}

function updateHealthy() {
	const wagonList = document.querySelector(".card-list");
	wagonList.addEventListener("click", updateHealthyEatButton);
	wagonList.addEventListener("click", updateHealthyHealButton);
}

updateHealthy();

function updateHealthyEatButton(event) {
	if (event.target.className === "card__traveler-eat") {
		const idNumber = +event.target.id.match(/\d/g)[0];
		const idHealthyStatus = `#healthy-${idNumber}`;
		const healthyStatus = document.querySelector(idHealthyStatus);
		const indexTraveler = wagon1.passengers.findIndex(
			({ id }) => id === idNumber
		);
		let isHealthyTraveler = wagon1.passengers[indexTraveler].isHealthy;
		isHealthyTraveler = isHealthyTraveler === true ? "Saudável" : "Doente";
		healthyStatus.innerText = isHealthyTraveler;
	}
}

function updateHealthyHealButton(event) {
	if (event.target.className === "card__heal-button") {
		event.preventDefault();
		const idNumber = +event.target.id.match(/\d/g)[0];
		const idSelect = `#card__select--heal-${idNumber}`;
		const select = document.querySelector(idSelect);
		const selectValue = select.options[select.selectedIndex].value;
		const traveler = wagon1.passengers.find(({ name }) => name === selectValue);
		const idHealthyStatus = `#healthy-${traveler.id}`;
		const healthyStatus = document.querySelector(idHealthyStatus);
		healthyStatus.innerText = "Saudável";
	}
}

function updateNamesGiveFoodAndHeal() {
	const selectGiveFood = document.querySelectorAll(".card__select--giveFood");
	const selectHeal = document.querySelectorAll(".card__select--heal");
	updateNamesOptions(selectGiveFood, "giveFood-option");
	updateNamesOptions(selectHeal, "heal-option");
}

function updateNamesOptions(selectType, classType) {
	selectType.forEach((select) => {
		select.innerText = "";
		const travelerId = +select.id.match(/\d/g)[0];
		createSelectOption(classType, select, travelerId);
	});
}

const inputAddToWagon = document.querySelector(".add-traveler__submit");
inputAddToWagon.addEventListener("click", updateNamesGiveFoodAndHeal);
