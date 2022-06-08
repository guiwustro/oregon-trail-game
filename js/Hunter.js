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