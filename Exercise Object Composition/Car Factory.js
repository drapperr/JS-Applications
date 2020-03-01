function solve(order) {
    let engines = {
        Small: { power: 90, volume: 1800 },
        Normal: { power: 120, volume: 2400 },
        Monster: { power: 200, volume: 3500 }
    }

    let engineKey = Object.keys(engines).find(x => engines[x].power >= order.power);
    let engine = engines[engineKey];

    return {
        model: order.model,
        engine: {
            power: engine.power,
            volume: engine.volume
        },
        carriage: {
            type: order.carriage,
            color: order.color
        },
        wheels: Array(4).fill(order.wheelsize % 2===0 ? order.wheelsize - 1 : order.wheelsize)
    }
}

console.log(solve({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}
))