import { useState } from 'react';
import Championship from "../Championship"
import Navbar from "../Navbar"
import Team from "../../types/Team";
import RacingAppStatus from '../../types/RacingAppStatus';
import AppConfig from '../AppConfig';
import TeamForm from '../../types/TeamForm';
import { generateRandomColor } from '../../utils/ColorUtils';

const RacingApp = () => {

  const [numberOfRacings, setNumberOfRacings] = useState<number>(10);
  const [numberOfLaps, setNumberOfLaps] = useState<number>(10);
  const [lapLength, setLapLength] = useState<number>(36);
  const [speed, setSpeed] = useState<number>(500);
  const [numberOfDriverPerTeam, setNumberOfDriversPerTeam] = useState<number>(4);
  const [status, setStatus] = useState<RacingAppStatus>('NOT_START');
  const [showConfig, setShowConfig] = useState<boolean>(true);
  const [championshipId, setChampionshipId] = useState<number>(0);
  const [teams, setTeams] = useState<Array<TeamForm>>([
    {
      color: generateRandomColor(),
      name: '',
      drivers: Array<string>(numberOfDriverPerTeam).fill('')
    }
  ]);

  const handleStartClick = () => {
    setStatus('STARTED');
    setShowConfig(false);
    setChampionshipId((prevState) => prevState + 1);
  }

  const handleConfigClick = () => {
    setShowConfig((prevState) => !prevState);
  }

  const handleTeamChange = (nextTeam: TeamForm, index: number) => {
    setTeams((prevState) => {
      return [
        ...prevState.slice(0, index),
        nextTeam,
        ...prevState.slice(index + 1)
      ]
    })
  }

  const handleAddTeam = () => {
    setTeams((prevState) => {
      return [
        ...prevState,
        {
          color: generateRandomColor(),
          name: '',
          drivers: Array<string>(numberOfDriverPerTeam).fill('')
        }
      ]
    })
  }

  const handleRemoveTeam = (index: number) => {
    setTeams((prevState) => {
      return [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1)
      ]
    })
  }

  const handleNumberOfDriversPerTeamChange = (nextNumberOfDriversPerTeam: number) => {
    const nextTeams: Array<TeamForm> = teams.map((team) => {
      const nextDrivers = Array<string>(nextNumberOfDriversPerTeam).fill('');
      team.drivers.forEach((driverName, index) => {
        if(index + 1 <= nextNumberOfDriversPerTeam) {
          nextDrivers[index] = driverName
        }
      });
      return {
        ...team,
        'drivers': nextDrivers
      }
    });
    setNumberOfDriversPerTeam(nextNumberOfDriversPerTeam);
    setTeams(nextTeams);
  }

  const championshipTeams: Team[] = teams.map((team, index) => {
    return {
      id: index,
      color: team.color,
      name: team.name,
      drivers: Array(numberOfDriverPerTeam).fill('')
    }
  });

  championshipTeams.forEach((team, teamIndex) => {
    const teamForm = teams[teamIndex];
    team.drivers = teamForm.drivers.map((driverName, driverIndex) => {
      return  {
        id: teamIndex * 2 + driverIndex + 1,
        name: driverName,
        team: team
      }
    })
  })

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
          numberOfDriversPerTeam={numberOfDriverPerTeam}
          onNumberOfRacingsChange={setNumberOfRacings}
          onNumberOfLapsChange={setNumberOfLaps}
          onLapLengthChange={setLapLength}
          onSpeedChange={setSpeed}
          onNumberOfDriversPerTeamChange={handleNumberOfDriversPerTeamChange}
          teams={teams}
          onTeamChange={handleTeamChange}
          onAddTeam={handleAddTeam}
          onRemoveTeam={handleRemoveTeam}
          setTeams={setTeams}
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
            teams={championshipTeams}
            //teams={[mercedes, rbr, ferrari, mcLaren, alfaRomeo, alphaTauri, alpine, williams, astonMartin, haas]}
            systemPoints={[25, 18, 15, 12, 10, 8, 6, 4, 2, 1]}  
          />
        </div>
      ) }
    </>
  );
}

export default RacingApp;