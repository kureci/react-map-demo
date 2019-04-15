export default class DataSource {
  constructor(args) {
    this.apiHostname = args.hostname
    this.autoUpdate = args.autoUpdate;
    this.updateInterval = args.updateInterval || 5;
    this.changeListeners = [];
    this.interval = null;

    this.notifyListeners = this.notifyListeners.bind(this);
  }

  getDrivers(coordinates, count) {
    return fetch(`${this.apiHostname}/drivers?latitude=${coordinates.lat}&longitude=${coordinates.lng}&count=${count}`)
      .then(response => response.ok && response.json())
      .then((result) => {
        if (this.interval) clearInterval(this.interval);
        if (this.autoUpdate) {
          this.interval = setInterval(() => {
            this.getDrivers(coordinates, count).then(this.notifyListeners);
          }, this.updateInterval * 1000)
        }
        return result;
      })
  }

  addChangeListener(listener) {
    if (typeof listener === 'function') {
      this.changeListeners.push(listener);
    }
  }
  removeChangeListener(listener) {
    this.changeListeners = this.changeListeners.map(l => l !== listener);
  }
  notifyListeners(result) {
    this.changeListeners.forEach(listener => listener(result.drivers));
  }
}