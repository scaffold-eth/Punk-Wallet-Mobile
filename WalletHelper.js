calculatePunkIndex = (address) => {
    const part1 = address.substr(2,20);
    const part2= address.substr(22);
    const y = parseInt(part1, 16)%100;
    const x = parseInt(part2, 16)%100;

    return (((x < 10) ? "0" : "") + x.toString() + ((y < 10) ? "0" : "") + y.toString());
}

module.exports = {
    calculatePunkIndex
}