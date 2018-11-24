export default class Service {
    getJson(path) {
        return fetch(path).then(response => response.json());
    }
}