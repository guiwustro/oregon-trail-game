import { Modal } from "./Modal.js";

export class Hunter extends Traveler {
	constructor(name, isHealthy, id) {
		super(name, isHealthy, id);
		this.food = 2;
	}
	hunt = () => {
		if (!this.isHealthy) {
			return false;
		}
		this.food += 5;
		return true;
	};
	eat = () => {
		if (this.food < 2) {
			this.food = 0;
			this.isHealthy = false;
		} else {
			this.isHealthy = true;
			this.food -= 2;
		}
		return this.isHealthy;
	};
	giveFood = (traveler, numOfFoodUnits) => {
		if (!traveler) {
			Modal.criarEventoModal(
				"Escolha um viajante",
				"É necessário escolher um viajante para transferir alimento."
			);
			return false;
		}
		if (numOfFoodUnits > this.food) {
			Modal.criarEventoModal(
				"Não foi possível fazer a transferência de comida",
				"O caçador não possui essa quantidade de comida para transferir. Por favor, selecione um número menor."
			);
			return false;
		} else {
			this.food -= numOfFoodUnits;
			traveler.food += numOfFoodUnits;
			return true;
		}
	};
}
