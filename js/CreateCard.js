class CreateCard {
	static getTravelerName(event) {
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

	static addTraveler() {
		const submitButton = document.querySelector(".add-traveler__submit");
		submitButton.addEventListener("click", addCardToList);
	}

	addCardToList(event) {
		const cardList = document.querySelector(".card-list");
		const card = createCard(event);
		if (card === "Defina um nome para o viajante") {
			alert("Defina um nome para o viajante!");
		} else if (card === "Carroça cheia") {
			alert("A carroça está cheia!");
		} else {
			cardList.appendChild(card);
		}
		//! Fazer um module avisando que a carroça está cheia !
	}

	createCard(event) {
		const travelerData = getTravelerName(event);
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

	createTravelerCard(traveler) {
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

	createHunterCard(traveler) {
		const card = createTravelerCard(traveler);
		const cardGiveFood = createCardGiveFood(traveler.id);
		card.append(cardGiveFood);
		return card;
	}

	createDoctorCard(traveler) {
		const card = createTravelerCard(traveler);
		const cardHeal = createCardHeal(traveler.id);
		card.append(cardHeal);
		return card;
	}

	createCardName(travelerName) {
		const name = document.createElement("h3");
		name.innerText = travelerName;
		name.classList.add("card__traveler-name");
		return name;
	}

	createCardType(travelerType) {
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

	createCardFood(travelerType) {
		const food = document.createElement("p");
		food.classList.add("card__traveler-food");
		if (travelerType === "Hunter") {
			food.innerHTML = `Comida = <span id ="food-${idCountTraveler}">2</span>`;
		} else {
			food.innerHTML = `Comida = <span id ="food-${idCountTraveler}">1</span>`;
		}
		return food;
	}

	createCardIsHealthy() {
		const isHealthy = document.createElement("p");
		isHealthy.classList.add("card__traveler-health");
		isHealthy.innerText = "Saudável";
		isHealthy.id = `healthy-${idCountTraveler}`;
		return isHealthy;
	}

	createCardHunt(travelerType) {
		const hunt = document.createElement("button");
		hunt.classList.add("card__traveler-hunt");
		hunt.innerText = "Caçar";
		travelerType == "Hunter"
			? (hunt.id = `hunt-${idCountTraveler}--hunter`)
			: (hunt.id = `hunt-${idCountTraveler}`);

		return hunt;
	}

	createCardEat() {
		const eat = document.createElement("button");
		eat.classList.add("card__traveler-eat");
		eat.innerText = "Comer";
		eat.id = `eat-${idCountTraveler}`;
		return eat;
	}

	createCardGiveFood(travelerId) {
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
		select.className = `card__select--giveFood`;

		//!Especifico para apenas uma carroça

		wagon1.passengers.forEach(({ id, name }) => {
			if (travelerId != id) {
				const labelOptions = document.createElement("option");
				labelOptions.value = name;
				labelOptions.className = "traveler__option";
				labelOptions.id = "giveFood-option" + id;
				labelOptions.innerText = name;
				select.append(labelOptions);
			}
		});

		const transferButton = document.createElement("button");
		transferButton.innerText = "Transferir";
		giveFood.append(label, inputNumber, labelSelect, select, transferButton);

		return giveFood;
	}

	createCardHeal(travelerId) {
		const heal = document.createElement("form");
		heal.classList.add("card__traveler-heal");
		const labelSelect = document.createElement("label");
		labelSelect.innerText = " Curar ";
		const select = document.createElement("select");
		select.id = `card__select--heal-${travelerId}`;
		select.className = `card__select--heal`;

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
}

CreateCard.getTravelerName();
