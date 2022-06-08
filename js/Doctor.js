class Doctor extends Traveler {
	constructor(name, food, isHealthy, id) {
		super(name, food, isHealthy, id);
	}
	heal = (traveler) => {
		traveler.isHealthy = true;
		return traveler.isHealthy;
	};
}