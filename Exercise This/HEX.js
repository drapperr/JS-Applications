class Hex {
    constructor(value) {
        this.value = value;
    }

    valueOf() {
        return this.value;
    }

    toString() {
        let result = '';
        if (this.value < 0) {
            result += '-';
        }
        result += `0x${Math.abs(this.value).toString(16).toUpperCase()}`;

        return result;
    }

    plus(number) {
        ;
        return new Hex(this.value + Number(number));
    }

    minus(number) {
        this.value -= Number(number)
        return new Hex(this.value);
    }

    parse(string) {
        return Number(string);
    }
}


let FF = new Hex(255);
console.log(FF.toString());//0xFF
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.minus(11).toString());//0xF
console.log(a.plus(b).toString() === '0xF');//true

console.log(a.parse('0x1A'))
