let idCountTraveler = 0;

class Traveler {
	constructor(name) {
		this.name = name;
		this.food = 1;
		this.isHealthy = true;
		this.id = ++idCountTraveler;
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