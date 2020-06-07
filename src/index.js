const baseUrl = "http://localhost:3000"
const senseisUrl = `${baseUrl}/senseis`
const ninjasUrl = `${baseUrl}/ninjas`
const unitsUrl = `${baseUrl}/units`
const main = document.querySelector('main')

//anonymous function invokes loadSensies upon page load

class Sensei {
  constructor(sensei) {
    this.id = sensei.id
    this.name = sensei.name

    this.element = document.createElement('div')
    this.element.setAttribute('class', 'sensei-card')
  }

  render = () => {
    this.element.innerHTML = `
    <h2>${this.name}</h2>
    `
    return this.element
  }
}

class Unit {
  constructor(unit) {
    this.id = unit.id
    this.sensei = unit.sensei.name
    this.ninjas = unit.ninjas.filter(ninja => ninja.name)

    this.element = document.createElement('div')
    this.element.setAttribute('class', 'unit-card')
  }
  render = () => {
    this.element.innerHTML = `
    <h2>${this.ninjas.name}</h2>
    `
    return this.element
  }
}

class UnitsAdapter {
  constructor() {

    this.element = main;
  }

  loadUnits = () => {
    fetch(unitsUrl)
    .then(resp => resp.json())
    .then(json => this.renderUnits(json))
  }

  renderUnits = (json) => {
    json.forEach(unit => {
      const u = new Unit(unit)
      const unitCard = u.render()
      this.element.appendChild(unitCard)
    })
  }

  
}
class SenseisAdapter {
  constructor() {

    this.element = main;
  }

  loadSenseis = () => {
    fetch(senseisUrl)
    .then(resp => resp.json())
    .then(json => this.renderSenseis(json))
  }

  renderSenseis = (json) => {
    json.forEach( sensei => {
      const s = new Sensei(sensei)
      const senseiCard = s.render()
      this.element.appendChild(senseiCard)
    })
  }
}
const senseisAdapter = new SenseisAdapter()
const unitsAdapter = new UnitsAdapter()


document.addEventListener('DOMContentLoaded', () => {
  unitsAdapter.loadUnits()
})