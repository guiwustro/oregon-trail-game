let idCountTraveler = 0;

class Traveler {
	constructor(name) {
		this.name = name;
		this.food = 1;
		this.isHealthy = true;
		this.id = ++idCountTraveler;
	}

	hunt = () => {
		if (!this.isHealthy) {
			return false;
		}
		this.food += 2;
		return this.isHealthy;
	};
	eat = () => {
		if (this.food > 0) {
			this.isHealthy = true;
			this.food -= 1;
		} else {
			this.isHealthy = false;
		}
		return this.isHealthy;
	};
}
