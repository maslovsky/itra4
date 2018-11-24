export default class Axis {
    static buildAxis(start, end, min, max) {
        return (value) => {
            return end - (end - start) * (value / max);
        };
    }

    static buildEnumAxis(start, end, enumValues) {
        return (value) => {
            return start + (end - start) * (enumValues.indexOf(value)) / (enumValues.length - 1);
        }
    }
}