

function Engine() {
    this.subjects = function () {
        return { };
    };

    this.roles = function () {
        return { };
    };

    this.contexts = function () {
        return { };
    };
}

function createEngine() {
    return new Engine();
}

module.exports = {
    createEngine: createEngine
};