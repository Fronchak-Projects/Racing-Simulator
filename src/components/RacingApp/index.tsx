import { useState } from 'react';
import Championship from "../Championship"
import Navbar from "../Navbar"
import Driver from "../../types/Driver";
import Team from "../../types/Team";
import RacingAppStatus from '../../types/RacingAppStatus';
import AppConfig from '../AppConfig';

const rbr: Team = {
  id: 1,
  color: '#0600EF',
  name: 'Red Bull',
  drivers: []
}

const mercedes: Team = {
  id: 2,
  color: '#00D2BE',
  name: 'Mercedes',
  drivers: []
}

const ferrari: Team = {
  id: 3,
  color: '#DC0000',
  name: 'Ferrari',
  drivers: []
}

const williams: Team = {
  id: 4,
  color: '#005AFF',
  name: 'Williams',
  drivers: []
}

const mcLaren: Team = {
  id: 5,
  color: '#FF8700',
  name: 'McLaren',
  drivers: []
}

const haas: Team = {
  id: 6,
  color: '#BBB',
  name: 'Haas',
  drivers: []
}

const alfaRomeo: Team = {
  id: 7,
  color: '#900000',
  name: 'Alfa Romeo',
  drivers: []
}

const alpine: Team = {
  id: 8,
  color: '#0090FF',
  name: 'Alpine',
  drivers: []
}

const astonMartin: Team = {
  id: 9,
  color: '#006F62',
  name: 'Aston Martin',
  drivers: []
}

const alphaTauri: Team = {
  id: 10,
  color: '#2B4562',
  name: 'AlphaTauri',
  drivers: []
}

const max: Driver = {
  id: 1,
  name: "Max Verstappen",
  team: rbr
}

const sergio: Driver = {
  id: 2,
  name: "Sergio Pérez",
  team: rbr
}

rbr.drivers = [max, sergio];

const hamilton: Driver = {
  id: 3,
  name: "Lewis Hamilton",
  team: mercedes
}

const russel: Driver = {
  id: 4,
  name: "George Russell",
  team: mercedes
}

mercedes.drivers = [hamilton, russel];

const carlos: Driver = {
  id: 5,
  name: "Carlos Sainz",
  team: ferrari
}

const leclerc: Driver = {
  id: 6,
  name: "Charles Leclerc",
  team: ferrari
}

ferrari.drivers = [carlos, leclerc];

const alexander: Driver = {
  id: 7,
  name: "Alexander Albon",
  team: williams
}

const logan: Driver = {
  id: 8,
  name: "Logan Sargeant",
  team: williams
}

williams.drivers = [alexander, logan];

const lando: Driver = {
  id: 9,
  name: "Lando Norris",
  team: mcLaren
}

const oscar: Driver = {
  id: 10,
  name: "Oscar Piastri",
  team: mcLaren
}

mcLaren.drivers = [lando, oscar];

const hulkenberg: Driver = {
  id: 11,
  name: "	Nico Hulkenberg",
  team: haas
}

const magnussen: Driver = {
  id: 12,
  name: "Kevin Magnussen",
  team: haas
}

haas.drivers = [hulkenberg, magnussen];

const bottas: Driver = {
  id: 13,
  name: 'Valtteri Bottas',
  team: alfaRomeo
}

const zhou: Driver = {
  id: 14,
  name: 'Guanyu Zhou',
  team: alfaRomeo
}

alfaRomeo.drivers = [bottas, zhou];

const estaban: Driver = {
  id: 15,
  name: 'Esteban Ocon',
  team: alpine
}

const pierre: Driver = {
  id: 16,
  name: 'Pierre Gasly',
  team: alpine
}

alpine.drivers = [estaban, pierre];

const alonso: Driver = {
  id: 17,
  name: 'Fernando Alonso',
  team: astonMartin
}

const stroll: Driver = {
  id: 18,
  name: 'Lance Stroll',
  team: astonMartin
}

astonMartin.drivers = [alonso, stroll];

const yuki: Driver = {
  id: 19,
  name: 'Yuki Tsunoda',
  team: alphaTauri
}

const nyck: Driver = {
  id: 20,
  name: 'Nyck de Vries',
  team: alphaTauri
}

alphaTauri.drivers = [yuki, nyck];

const RacingApp = () => {

  const [numberOfRacings, setNumberOfRacings] = useState<number>(10);
  const [numberOfLaps, setNumberOfLaps] = useState<number>(10);
  const [lapLength, setLapLength] = useState<number>(36);
  const [speed, setSpeed] = useState<number>(500);
  const [status, setStatus] = useState<RacingAppStatus>('NOT_START');
  const [showConfig, setShowConfig] = useState<boolean>(true);
  const [championshipId, setChampionshipId] = useState<number>(0);

  const handleStartClick = () => {
    setStatus('STARTED');
    setShowConfig(false);
    setChampionshipId((prevState) => prevState + 1);
  }

  const handleConfigClick = () => {
    setShowConfig((prevState) => !prevState);
  }

  return (
    <>
      <Navbar 
        onStartClick={handleStartClick}
        onConfigClick={handleConfigClick}
      />
      <hr/>
      { showConfig && 
        <AppConfig 
          numberOfRacings={numberOfRacings}
          numberOfLaps={numberOfLaps}
          lapLength={lapLength}
          speed={speed}
          onNumberOfRacingsChange={setNumberOfRacings}
          onNumberOfLapsChange={setNumberOfLaps}
          onLapLengthChange={setLapLength}
          onSpeedChange={setSpeed}
        />
      }
      { status === 'STARTED' && (
        <div className={`container-fluid ${showConfig ? 'mt-3' : ''}`}>
          <Championship 
            key={championshipId}
            numberOfRacings={numberOfRacings}
            lapLength={lapLength} 
            numberOfLaps={numberOfLaps} 
            speed={speed}
            teams={[mercedes, rbr, ferrari, mcLaren, alfaRomeo, alphaTauri, alpine, williams, astonMartin, haas]}
            systemPoints={[25, 18, 15, 12, 10, 8, 6, 4, 2, 1]}  
          />
        </div>
      ) }
    </>
  );
}

export default RacingApp;