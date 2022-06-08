
//! Supor que a capacidade da carroça seja 5
const wagon1 = new Wagon(5);

//* Identificando os valores

function addTraveler() {
	const submitButton = document.querySelector(".add-traveler__submit");
	submitButton.addEventListener("click", addCardToList);
}

addTraveler();

function getTravelerData(event) {
	event.preventDefault();
	const travelerName = document.querySelector("#travelerName").value;
	if (travelerName.length > 15) {
		alert("O nome deve ter no máximo 15 caracteres");
	} else if (travelerName != "") {
		const select = document.getElementById("types");
		const travelerType = select.options[select.selectedIndex].value;
		return { name: travelerName, type: travelerType };
	} else {
		return "Defina um nome para o viajante";
	}
}

function addCardToList(event) {
	const cardList = document.querySelector(".card-list");

	const card = createCard(event);
	if (card === "Defina um nome para o viajante") {
		//! Avisar para colocar um nome! module
		alert("Defina um nome para o viajante!");
	} else if (card === "Carroça cheia") {
		alert("A carroça está cheia!");
	} else {
		cardList.appendChild(card);
	}

	//! Fazer um module avisando que a carroça está cheia !
}

//* Criando cards!
function createCard(event) {
	const travelerData = getTravelerData(event);
	if (travelerData.type === "common") {
		const traveler = new Traveler(travelerData.name);
		const verifySlotWagon = wagon1.join(traveler);
		if (
			verifySlotWagon !=
			`Não tem espaço para ${traveler.name} entrar na carroça! `
		) {
			const card = createTravelerCard(traveler);
			card.className = "card__info card--common card--border-green";
			return card;
		}
		return "Carroça cheia";
	}
	if (travelerData.type === "hunter") {
		const traveler = new Hunter(travelerData.name);
		const verifySlotWagon = wagon1.join(traveler);
		if (
			verifySlotWagon !=
			`Não tem espaço para ${traveler.name} entrar na carroça! `
		) {
			const card = createHunterCard(traveler);
			card.className = "card__info card--hunter card--border-violet";
			return card;
		}
		return "Carroça cheia";
	}
	if (travelerData.type === "doctor") {
		const traveler = new Doctor(travelerData.name);
		const verifySlotWagon = wagon1.join(traveler);
		if (
			verifySlotWagon !=
			`Não tem espaço para ${traveler.name} entrar na carroça! `
		) {
			const card = createDoctorCard(traveler);
			card.className = "card__info card--doctor card--border-cyan";
			return card;
		}
		return "Carroça cheia";
	}
	return travelerData;
}

function createTravelerCard(traveler) {
	const card = document.createElement("li");
	card.classList.add("card__info");
	const cardName = createCardName(traveler.name);
	const cardType = createCardType(traveler.constructor.name);
	const cardFood = createCardFood(traveler.constructor.name);
	const cardIsHealthy = createCardIsHealthy();
	const cardHunt = createCardHunt(traveler.constructor.name);
	const cardEat = createCardEat(traveler);

	card.append(cardName, cardType, cardFood, cardIsHealthy, cardHunt, cardEat);

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

function createCardName(travelerName) {
	const name = document.createElement("h3");
	name.innerText = travelerName;
	name.classList.add("card__traveler-name");
	return name;
}

function createCardType(travelerType) {
	const type = document.createElement("p");
	type.classList.add("card__traveler-type");
	if (travelerType === "Traveler") {
		type.classList.add("card__traveler-type--common");
		type.innerText = "Comum";
	}
	if (travelerType === "Hunter") {
		type.classList.add("card__traveler-type--hunter");
		type.innerText = "Caçador";
	}
	if (travelerType === "Doctor") {
		type.classList.add("card__traveler-type--doctor");
		type.innerText = "Médico";
	}
	return type;
}

function createCardFood(travelerType) {
	const food = document.createElement("p");
	food.classList.add("card__traveler-food");
	if (travelerType === "Hunter") {
		food.innerHTML = `Comida = <span id ="food-${idCountTraveler}">2</span>`;
	} else {
		food.innerHTML = `Comida = <span id ="food-${idCountTraveler}">1</span>`;
	}
	return food;
}

function createCardIsHealthy() {
	const isHealthy = document.createElement("p");
	isHealthy.classList.add("card__traveler-health");
	isHealthy.innerText = "Saudável";
	isHealthy.id = `healthy-${idCountTraveler}`;
	return isHealthy;
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

function createCardEat() {
	const eat = document.createElement("button");
	eat.classList.add("card__traveler-eat");
	eat.innerText = "Comer";
	eat.id = `eat-${idCountTraveler}`;
	return eat;
}

function createCardGiveFood(travelerId) {
	const giveFood = document.createElement("form");
	giveFood.classList.add("card__traveler-giveFood");
	const label = document.createElement("label");
	label.innerText = "Transferir ";

	const inputNumber = document.createElement("input");
	inputNumber.setAttribute("type", "number");
	inputNumber.setAttribute("min", "0");

	const labelSelect = document.createElement("label");
	labelSelect.innerText = " unidades de comida para ";
	const select = document.createElement("select");
	select.id = `card__select--giveFood-${travelerId}`;
	//!Especifico para apenas uma carroça

	wagon1.passengers.forEach(({ id, name }) => {
		if (travelerId != id) {
			const labelOptions = document.createElement("option");
			labelOptions.value = name;
			labelOptions.className = "traveler__option";
			labelOptions.id = "heal-option" + id;
			labelOptions.innerText = name;
			select.append(labelOptions);
		}
	});

	const transferButton = document.createElement("button");
	transferButton.innerText = "Transferir";
	giveFood.append(label, inputNumber, labelSelect, select, transferButton);

	return giveFood;
}

function createCardHeal(travelerId) {
	const heal = document.createElement("form");
	heal.classList.add("card__traveler-heal");
	const labelSelect = document.createElement("label");
	labelSelect.innerText = " Curar ";
	const select = document.createElement("select");
	select.id = `card__select--heal-${travelerId}`;

	//!Especifico para apenas uma carroça

	wagon1.passengers.forEach(({ id, name }) => {
		if (travelerId != id) {
			const labelOptions = document.createElement("option");
			labelOptions.value = name;
			labelOptions.className = "traveler__option";
			labelOptions.id = "heal-option" + id;
			labelOptions.innerText = name;
			select.append(labelOptions);
		}
	});

	const healButton = document.createElement("button");
	healButton.innerText = "Curar";
	heal.append(labelSelect, select, healButton);

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
			huntAction(idTraveler);
		} else if (event.target.className.includes("card__traveler-eat")) {
			eatAction(idTraveler);
		}
	}
}

function huntAction(idSearch) {
	const traveler = wagon1.passengers.find(({ id }) => id === idSearch);
	traveler.hunt();

	let idButton = `#food-${idSearch}`;

	const foodNumber = document.querySelector(idButton);
	foodNumber.innerText = traveler.food;
	return foodNumber;
}

function eatAction(idSearch) {
	const traveler = wagon1.passengers.find(({ id }) => id === idSearch);
	traveler.eat();

	let idButton = `#food-${idSearch}`;

	const foodNumber = document.querySelector(idButton);
	foodNumber.innerText = traveler.food;
	return foodNumber;
}

function giveFoodButton() {}

function healButton() {}

function updateTravelerHealthy() {}

function updateNamesGiveFoodAndHeal() {}
updateNamesGiveFoodAndHeal();