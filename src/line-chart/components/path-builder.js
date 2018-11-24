export default class PathBuilder {
    constructor() {
        this._result = '';
    }

    moveTo(x, y) {
        this._result += `M${x},${y}`;
        return this;
    }

    lineTo(x, y) {
        this._result += `L${x},${y}`;
        return this;
    }

    build() {
        return this._result;
    }
}