function solve(arr) {
    result = [];
    arr.forEach(el => {
        let width = el[0];
        let height = el[1];
        result.push({
            width,
            height,
            area: function () {
                return this.width * this.height;
            },
            compareTo: function (other) {
                return other.area() - this.area() || other.width - this.width;
            }
        })
    });

    return result.sort((a, b) => a.compareTo(b));
}

console.log(solve([[1, 20], [20, 1], [5, 3], [5, 3]]))