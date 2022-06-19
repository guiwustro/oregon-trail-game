class Hunter extends Traveler {
	constructor(name, isHealthy, id) {
		super(name, isHealthy, id);
		this.food = 2;
	}
	hunt() {
		return (this.food += 5);
	}
	eat() {
		if (this.food < 2) {
			this.food = 0;
			this.isHealthy = false;
		} else {
			this.isHealthy = true;
			this.food -= 2;
		}
		return this.isHealthy;
	}
	giveFood(traveler, numOfFoodUnits) {
		if (numOfFoodUnits > this.food) {
			return false;
		} else {
			this.food -= numOfFoodUnits;
			traveler.food += numOfFoodUnits;
		}
	}
}
