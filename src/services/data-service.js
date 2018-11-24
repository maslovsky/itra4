import Service from './service.js';

export default class DataService extends Service {
    getData() {
        return this.getJson('./data/data.json');
    }
}