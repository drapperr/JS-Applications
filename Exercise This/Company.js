class Company {
    constructor() {
        this.departments = [];

        this.realDepatments={};
    }

    addEmployee(username, salary, position, department) {
        if (!username || (!salary&&salary!==0) || !position || !department ) {
            throw new Error("Invalid input!");
        }

        if (salary < 0) {
            throw new Error(" Invalid input!");
        }

        if (!this.realDepatments[department]) {
            this.realDepatments[department]=[];
        }
        this.realDepatments[department].push({
            username,
            salary,
            position
        })

        return `New employee is hired. Name: ${username}. Position: ${position}`;

    }

    _getAvrgSalary(department){
        let sum=this.realDepatments[department].reduce((acc,el)=>acc+el.salary,0);
        let count=this.realDepatments[department].length;

        return sum/count;
    }

    bestDepartment() {
        let bestDepartment = Object.keys(this.realDepatments).sort((a, b) => this._getAvrgSalary(b) - this._getAvrgSalary(a))[0];
        let result = [];

        result.push(`Best Department is: ${bestDepartment}`);
        let avrgSalary = this._getAvrgSalary(bestDepartment);
        result.push(`Average salary: ${avrgSalary.toFixed(2)}`)

        let sortedEmployees = this.realDepatments[bestDepartment].sort((a, b) => {
            if (b.salary === a.salary) {
                return a.username.localeCompare(b.username)
            }

            return b.salary - a.salary;
        });
        sortedEmployees.forEach(e => {
            result.push(`${e.username} ${e.salary} ${e.position}`)
        });
        return result.join('\n');
    }
}


let c = new Company();

c.addEmployee("Stanimir", 2000, "engineer", "Human resources");

c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");

console.log(c.bestDepartment())
//let exp = "Best Department is: Human resources\nAverage salary: 1675.00\nStanimir 2000 engineer\nGosho 1350 HR";
