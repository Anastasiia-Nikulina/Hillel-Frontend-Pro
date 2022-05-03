class MultiTool {
	strength;
	cutUsage;
	sliceUsage;
	screwUsage;

	constructor(strength, cutUsage, sliceUsage, screwUsage) {
		this.strength = strength;
		this.cutUsage = cutUsage;
		this.sliceUsage = sliceUsage;
		this.screwUsage = screwUsage;
	}
	usage(value) {
		if (this.strength > 0) {
			return console.log(`Using tool... Strength left: ${this.strength = this.strength - value}`)
		}
		else {
			return console.error("the tool is broken")
		}
	}

	cut() {
		this.usage(this.cutUsage);
	}

	slice() {
		this.usage(this.sliceUsage);
	}

	screw() {
		this.usage(this.sliceUsage);
	}
}

class CheepMultiTool extends MultiTool {

}

class ExpensiveMultiTool extends MultiTool {
	drillUsage;
	constructor (strength, cutUsage, sliceUsage, screwUsage, drillUsage) {
		super(strength, cutUsage, sliceUsage, screwUsage);
		this.drillUsage = drillUsage;
	}

	drill() {
		this.usage(this.drillUsage)
	}
}

let cheepMult = new CheepMultiTool(100,10,15,20);
let expMult = new ExpensiveMultiTool(250, 5, 5, 5, 10);

console.log(cheepMult.cut());
console.log(cheepMult.slice());
console.log(cheepMult.screw());


console.log(expMult.cut());
console.log(expMult.slice());
console.log(expMult.screw());
console.log(expMult.drill());


