import DriverType from "../../types/DriverType";
import TeamType from "../../types/TeamType";
import Racing from "../Racing";

const rbr: TeamType = {
  id: 1,
  color: '#0600EF',
  name: 'Red Bull',
  drivers: []
}

const mercedes: TeamType = {
  id: 2,
  color: '#00D2BE',
  name: 'Mercedes',
  drivers: []
}

const ferrari: TeamType = {
  id: 3,
  color: '#DC0000',
  name: 'Ferrari',
  drivers: []
}

const williams: TeamType = {
  id: 4,
  color: '#005AFF',
  name: 'Williams',
  drivers: []
}

const mcLaren: TeamType = {
  id: 5,
  color: '#FF8700',
  name: 'McLaren',
  drivers: []
}

const haas: TeamType = {
  id: 6,
  color: '#BBB',
  name: 'Haas',
  drivers: []
}

const alfaRomeo: TeamType = {
  id: 7,
  color: '#900000',
  name: 'Alfa Romeo',
  drivers: []
}

const alpine: TeamType = {
  id: 8,
  color: '#0090FF',
  name: 'Alpine',
  drivers: []
}

const astonMartin: TeamType = {
  id: 9,
  color: '#006F62',
  name: 'Aston Martin',
  drivers: []
}

const alphaTauri: TeamType = {
  id: 10,
  color: '#2B4562',
  name: 'AlphaTauri',
  drivers: []
}

const max: DriverType = {
  id: 1,
  name: "Max Verstappen",
  team: rbr
}

const sergio: DriverType = {
  id: 2,
  name: "Sergio Pérez",
  team: rbr
}

rbr.drivers = [max, sergio];

const hamilton: DriverType = {
  id: 3,
  name: "Lewis Hamilton",
  team: mercedes
}

const russel: DriverType = {
  id: 4,
  name: "George Russell",
  team: mercedes
}

mercedes.drivers = [hamilton, russel];

const carlos: DriverType = {
  id: 5,
  name: "Carlos Sainz",
  team: ferrari
}

const leclerc: DriverType = {
  id: 6,
  name: "Charles Leclerc",
  team: ferrari
}

ferrari.drivers = [carlos, leclerc];

const alexander: DriverType = {
  id: 7,
  name: "Alexander Albon",
  team: williams
}

const logan: DriverType = {
  id: 8,
  name: "Logan Sargeant",
  team: williams
}

williams.drivers = [alexander, logan];

const lando: DriverType = {
  id: 9,
  name: "Lando Norris",
  team: mcLaren
}

const oscar: DriverType = {
  id: 10,
  name: "Oscar Piastri",
  team: mcLaren
}

mcLaren.drivers = [lando, oscar];

const hulkenberg: DriverType = {
  id: 11,
  name: "	Nico Hulkenberg",
  team: haas
}

const magnussen: DriverType = {
  id: 12,
  name: "Kevin Magnussen",
  team: haas
}

haas.drivers = [hulkenberg, magnussen];

const bottas: DriverType = {
  id: 13,
  name: 'Valtteri Bottas',
  team: alfaRomeo
}

const zhou: DriverType = {
  id: 14,
  name: 'Guanyu Zhou',
  team: alfaRomeo
}

alfaRomeo.drivers = [bottas, zhou];

const estaban: DriverType = {
  id: 15,
  name: 'Esteban Ocon',
  team: alpine
}

const pierre: DriverType = {
  id: 16,
  name: 'Pierre Gasly',
  team: alpine
}

alpine.drivers = [estaban, pierre];

const alonso: DriverType = {
  id: 17,
  name: 'Fernando Alonso',
  team: astonMartin
}

const stroll: DriverType = {
  id: 18,
  name: 'Lance Stroll',
  team: astonMartin
}

astonMartin.drivers = [alonso, stroll];

const yuki: DriverType = {
  id: 19,
  name: 'Yuki Tsunoda',
  team: alphaTauri
}

const nyck: DriverType = {
  id: 20,
  name: 'Nyck de Vries',
  team: alphaTauri
}

alphaTauri.drivers = [yuki, nyck];

const App =() => {

  return (
    <div className="container-fluid py-4">
      <Racing 
        lapSize={36} 
        numberOfLaps={10} 
        teams={[mercedes, rbr, ferrari, mcLaren, alfaRomeo, alphaTauri, alpine, williams, astonMartin, haas]}
        systemPoints={[25, 18, 15, 12, 10, 8, 6, 4, 2, 1]}  
      />
    </div>
  );
}

export default App
