class Traveler {
	constructor(name) {
		this.name = name;
		this.food = 1;
		this.isHealthy = true;
	}

	hunt = () => {
		return (this.food += 2);
	};
	eat = () => {
		if (this.food > 0) {
			this.isHealthy = true;
			this.food -= 1;
			let message = `${this.name} comeu e restou ${this.food} comida(s)`;

			//!Verificação
			console.log(message);

			return this.food;
		} else {
			let message = `${this.name} agora está com fome (doente)`;
			this.isHealthy = false;
			//!Verificação
			console.log(message);

			return this.isHealthy;
		}
	};
}

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
		const checkSeats = this.capacity - this.passengers.length;

		//! Verificação
		console.log(
			checkSeats > 0
				? `A ${traveler.name} entrou na carroça`
				: `Não tem espaço para ${traveler.name} entrar na carroça! `
		);

		return checkSeats > 0
			? this.passengers.push(traveler)
			: `Não tem espaço para ${traveler.name} entrar na carroça! `;
	};

	shouldQuarantine = () => {
		console.log(this.passengers);
		return this.passengers.some((traveler) => traveler.isHealthy === false)
			? true
			: false;
	};

	totalFood = () => {
		return this.passengers.reduce((acc, previous) => acc + previous.food, 0);
	};
}

class Hunter extends Traveler {
	constructor(name, isHealthy) {
		super(name, isHealthy);
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

class Doctor extends Traveler {
	constructor(name, food, isHealthy) {
		super(name, food, isHealthy);
	}
	heal = (traveler) => {
		traveler.isHealthy = true;
		return traveler.isHealthy;
	};
}

// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler("Henrietta");
let juan = new Traveler("Juan");
let drsmith = new Doctor("Dr. Smith");
let sarahunter = new Hunter("Sara");
let maude = new Traveler("Maude");

console.log(
	`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);

wagon.join(henrietta);
console.log(
	`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);

wagon.join(maude); // Não tem espaço para ela!
console.log(
	`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)
console.log(juan);
console.log(
	`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`
);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(
	`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`
);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(
	`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`
);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
