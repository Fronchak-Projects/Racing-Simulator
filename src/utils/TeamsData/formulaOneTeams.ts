import TeamForm from "../../types/TeamForm"

const rbr: TeamForm = {
    color: '#030061',
    name: 'Red Bull',
    drivers: ['Max Verstappen', 'Sergio Pérez']
  }
  
const mercedes: TeamForm = {
    color: '#00D2BE',
    name: 'Mercedes',
    drivers: ['Hamilton', 'George Russell']
}
  
const ferrari: TeamForm = {
    color: '#DC0000',
    name: 'Ferrari',
    drivers: ['Carlos Sainz', 'Charles Leclerc']
}
  
const williams: TeamForm = {
    color: '#005AFF',
    name: 'Williams',
    drivers: ['Alexander Albon', 'Logan Sargeant']
}
  
const mcLaren: TeamForm = {
    color: '#D14900',
    name: 'McLaren',
    drivers: ['Lando Norris', 'Oscar Piastri']
}
  
const haas: TeamForm = {
    color: '#BBBBBB',
    name: 'Haas',
    drivers: ['Nico Hulkenberg', 'Kevin Magnussen']
}
  
const alfaRomeo: TeamForm = {
    color: '#7DB602',
    name: 'Alfa Romeo',
    drivers: ['Valtteri Bottas', 'Guanyu Zhou']
}
  
const alpine: TeamForm = {
    color: '#8155C3',
    name: 'Alpine',
    drivers: ['Esteban Ocon', 'Pierre Gasly']
}
  
const astonMartin: TeamForm = {
    color: '#1B9D35',
    name: 'Aston Martin',
    drivers: ['Fernando Alonso', 'Lance Stroll']
}
  
const alphaTauri: TeamForm = {
    color: '#D81ADB',
    name: 'AlphaTauri',
    drivers: ['Yuki Tsunoda', 'Nyck de Vries']
}

const teams: Array<TeamForm> = [
    rbr, mercedes, ferrari, williams, mcLaren,
    haas, alfaRomeo, alpine, astonMartin, alphaTauri
]
  
export default teams;