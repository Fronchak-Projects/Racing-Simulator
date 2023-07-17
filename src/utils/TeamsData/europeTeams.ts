import TeamForm from "../../types/TeamForm"

const barcelona: TeamForm = {
    color: '#E63EE9',
    name: 'Barcelona',
    drivers: ['Barcelona #1', 'Barcelona #2']
  }
  
const realMadrid: TeamForm = {
    color: '#CCCCCC',
    name: 'Real Madrid',
    drivers: ['Real Madrid #1', 'Real Madrid #2']
}
  
const bayernMunich: TeamForm = {
    color: '#DC052D',
    name: 'Bayern Munich',
    drivers: ['Bayern Munich #1', 'Bayern Munich #2']
}
  
const borussiaDortmund: TeamForm = {
    color: '#C4B121',
    name: 'Borussia Dortmund',
    drivers: ['Borussia Dortmund #1', 'Borussia Dortmund #2']
}
  
const milan: TeamForm = {
    color: '#562AA1',
    name: 'Milan',
    drivers: ['Milan #1', 'Milan #2']
}
  
const interMilan: TeamForm = {
    color: '#1417BC',
    name: 'Inter Milan',
    drivers: ['Inter Milan #1', 'Inter Milan #2']
}
  
const manchesterCity: TeamForm = {
    color: '#32E7EA',
    name: 'Manchester City',
    drivers: ['Manchester City #1', 'Manchester City #2']
}
  
const liverpool : TeamForm = {
    color: '#EA7332',
    name: 'Liverpool',
    drivers: ['Liverpool #1', 'Liverpool #2']
}
  
const atleticoMadrid: TeamForm = {
    color: '#307B1D',
    name: 'Atletico Madrid',
    drivers: ['Atletico Madrid #1', 'Atletico Madrid #2']
}
  
const juventus: TeamForm = {
    color: '#000000',
    name: 'Juventus',
    drivers: ['Juventus #1', 'Juventus #2']
}

const teams: Array<TeamForm> = [
    barcelona, realMadrid, bayernMunich, borussiaDortmund,
    milan, interMilan, manchesterCity, liverpool,
    atleticoMadrid, juventus
]
  
export default teams;