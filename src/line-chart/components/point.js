export default class Point {
    constructor(bind) {
        const getAttribure = x => `${x}="${bind[x]}"`;

        this._binds = Object.keys(bind)
            .map(getAttribure);
    }

    render(x, y, r = 5) {
        return `<circle class="point" cx="${x}" cy="${y}" r="${r}" ${this._binds.join(' ')} fill="black"></circle>`;
    }
}