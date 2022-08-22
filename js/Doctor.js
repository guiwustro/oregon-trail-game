export class Doctor extends Traveler {
	constructor(name, id) {
		super(name, id);
	}

	heal = (traveler) => {
		traveler.isHealthy = true;
		return traveler.isHealthy;
	};
}
