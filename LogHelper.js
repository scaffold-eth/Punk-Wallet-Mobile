let count = 0;

log = (...args) => {
    console.log(count++, ...args);
}

module.exports = {
    log
}