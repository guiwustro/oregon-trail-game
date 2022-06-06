// useSemiColon - Use ; at the end of a line e.g Import * from ./app or Import * from ./app; - Default True
// import goToMainPage from "../js/create-waggon";
// let teste = require("../js/create-waggon");

// import { initialCapacity } from "./create-waggon.js";

// console.log(initialCapacity);

// console.log(teste);
let idCountTraveler = 0;
class Traveler {
	constructor(name) {
		this.name = name;
		this.food = 1;
		this.isHealthy = true;
		this.id = idCountTraveler++;
	}

	hunt = () => {
		return (this.food += 2);
	};
	eat = () => {
		if (this.food > 0) {
			this.isHealthy = true;
			this.food -= 1;
			return this.food;
		} else {
			this.isHealthy = false;
			return this.isHealthy;
		}
	};
}

class Hunter extends Traveler {
	constructor(name, isHealthy, id) {
		super(name, isHealthy, id);
		this.food = 2;
	}
	hunt = () => {
		return (this.food += 5);
	};
	eat = () => {
		if (this.food < 2) {
			this.food = 0;
			this.isHealthy = false;
			return `${this.name} está doente`;
		} else {
			this.isHealthy = true;
			return (this.food -= 2);
		}
	};
	giveFood = (traveler, numOfFoodUnits) => {
		if (numOfFoodUnits > this.food) {
			return `O viajante não tem ${numOfFoodUnits} unidades de comida para transferir`;
		} else {
			this.food -= numOfFoodUnits;
			traveler.food += numOfFoodUnits;
		}
	};
}

class Doctor extends Traveler {
	constructor(name, food, isHealthy, id) {
		super(name, food, isHealthy, id);
	}
	heal = (traveler) => {
		traveler.isHealthy = true;
		return traveler.isHealthy;
	};
}

class Wagon {
	constructor(capacity) {
		this.capacity = capacity;
		this.passengers = [];
	}

	getAvailableSeatCount = () => {
		let emptySlots = this.capacity - this.passengers.length;
		return emptySlots;
	};

	join = (traveler) => {
		this.getAvailableSeatCount() > 0
			? this.passengers.push(traveler)
			: `Não tem espaço para ${traveler.name} entrar na carroça! `;
	};

	shouldQuarantine = () => {
		return this.passengers.some((traveler) => traveler.isHealthy === false);
	};

	totalFood = () => {
		return this.passengers.reduce((acc, previous) => acc + previous.food, 0);
	};
}

//! VERIFICAR COMO EXPORTA A VARIÁVEL Q FOI DIGITADA NA PÁGINA INTERIOR!
// import { initialCapacity } from "./create-waggon.js";

// console.log(initialCapacity);

//! Supor que a capacidade da carroça seja 4
const wagon1 = new Wagon(4);

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
	const cardHunt = createCardHunt(traveler);
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
	return isHealthy;
}
function createCardHunt() {
	const hunt = document.createElement("button");
	hunt.classList.add("card__traveler-hunt");
	hunt.innerText = "Caçar";
	return hunt;
}
function createCardEat() {
	const eat = document.createElement("button");
	eat.classList.add("card__traveler-eat");
	eat.innerText = "Comer";
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
	giveFood.classList.add("card__traveler-heal");

	const labelSelect = document.createElement("label");
	labelSelect.innerText = " Curar ";
	const select = document.createElement("select");

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
	heal.append(label, inputNumber, labelSelect, select, transferButton);

	return giveFood;
	heal.classList.add("card__traveler-heal");
	heal.innerText = "Curar";
	return heal;
}

function updateNamesGiveFoodAndHeal() {
	const sickTravelers = document.querySelector(".info__sick");
	const slotNumber = document.querySelector(".info__slot");
	document.addEventListener("click");
}
updateNamesGiveFoodAndHeal();
// function createWagonCard()
//! Roteiro
// 1. Criar uma carroça com capacidade X vagas

// 1.1 Criar uma página inicial onde será dado o valor da capacidade da carroça
// 1.2 Fazer um module aparecendo sempre que for clicada no botão inferior. (Criar nova carroça)

//2. Identificar os valores que serão colocados para criar o viajante quando o usuário clicar no botão "Adicionar a carroça"
//2.1 Identificar o nome do viajante adicionado no valor do input
//2.2 Identificar o tipo do viajante

//3. Com os valores identificados criar um card do personagem criado.
//3.1 O card - na parte INFERIOR - com o personagem criado deverá ter:
//3.1.1 Nome do viajante
//3.1.2 Tipo
//3.1.3 Food?
//3.1.4 Doente?
//3.1.5 Botão para caçar (muda caso for hunter)
//3.1.6 Botão para comer
//3.1.7 Botão para DAR COMIDA a outro VIAJANTE (pode criar um formulário com opções)
//3.1.8 Botão para CURAR (caso for médico)

//3.2 O card - na parte do WAGON - deverá ter somente o NOME, uma borda bem trabalhada, e o tipo dele.

//4. No footer terá:
//4.1 Carroças existentes (Com números para acessar - 1, 2, 3, 4, 5, 6, 7, 8..)
//4.2 Botão para criar nova carroça
