let idCountTraveler = 0;

class Traveler {
	constructor(name) {
		this.name = name;
		this.food = 1;
		this.isHealthy = true;
		this.id = ++idCountTraveler;
	}

	hunt = () => {
		if (this.food === 0) {
			return false;
		}
		return (this.food += 2);
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
