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
		return this.getAvailableSeatCount() > 0
			? this.passengers.push(traveler)
			: false;
	};

	shouldQuarantine = () => {
		return this.passengers.some((traveler) => traveler.isHealthy === false);
	};

	totalFood = () => {
		return this.passengers.reduce((acc, previous) => acc + previous.food, 0);
	};
}
