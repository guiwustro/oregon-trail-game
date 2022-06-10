class UpdateCardData {
	static updateSickAndSlot() {
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

	static actionTraveler(event) {
		if (event.target.tagName === "BUTTON") {
			const idTraveler = +event.target.id.match(/\d/g)[0];
			if (event.target.className.includes("card__traveler-hunt")) {
				huntAction(idTraveler);
			} else if (event.target.className.includes("card__traveler-eat")) {
				eatAction(idTraveler);
			}
		}
	}

	static huntAction(idSearch) {
		const traveler = wagon1.passengers.find(({ id }) => id === idSearch);
		traveler.hunt();

		let idButton = `#food-${idSearch}`;

		const foodNumber = document.querySelector(idButton);
		foodNumber.innerText = traveler.food;
		return foodNumber;
	}

	static eatAction(idSearch) {
		const traveler = wagon1.passengers.find(({ id }) => id === idSearch);
		traveler.eat();

		let idButton = `#food-${idSearch}`;

		const foodNumber = document.querySelector(idButton);
		foodNumber.innerText = traveler.food;
		return foodNumber;
	}

	static updateTravelerHealthy() {
		const cardList = document.querySelector(".card-list");
		cardList.addEventListener("click", updateHealthy);
	}

	static updateNamesGiveFoodAndHeal() {
		const selectGiveFood = document.querySelectorAll(".card__select--giveFood");
		selectGiveFood.forEach((selectItems) => {
			selectItems.innerText = "";
			const idTraveler = +selectItems.id.match(/\d/g)[0];
			wagon1.passengers.forEach(({ id, name }) => {
				if (idTraveler != id) {
					const labelOptions = document.createElement("option");
					labelOptions.value = name;
					labelOptions.className = "traveler__option";
					labelOptions.id = "giveFood-option" + id;
					labelOptions.innerText = name;
					selectItems.append(labelOptions);
				}
			});
		});

		const selectHeal = document.querySelectorAll(".card__select--heal");
		selectHeal.forEach((selectItems) => {
			selectItems.innerText = "";
			const idTraveler = +selectItems.id.match(/\d/g)[0];
			wagon1.passengers.forEach(({ id, name }) => {
				if (idTraveler != id) {
					const labelOptions = document.createElement("option");
					labelOptions.value = name;
					labelOptions.className = "traveler__option";
					labelOptions.id = "heal-option" + id;
					labelOptions.innerText = name;
					selectItems.append(labelOptions);
				}
			});
		});
	}
}
const inputAddToWagon = document.querySelector(".add-traveler__submit");
inputAddToWagon.addEventListener(
	"click",
	UpdateCardData.updateNamesGiveFoodAndHeal()
);
