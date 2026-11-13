import teamsData from '../data/teams.json';
import primeraData from '../data/seasons/2026-2027/primera.json';
import segundaData from '../data/seasons/2026-2027/segunda.json';
import copaData from '../data/seasons/2026-2027/copa.json';

export type Team = (typeof teamsData)[number];
const teams = new Map(teamsData.map((team) => [team.id, team]));

function teamById(teamId: string): Team {
  const team = teams.get(teamId);
  if (!team) throw new Error(`Equipo desconocido: ${teamId}`);
  return team;
}

export function getLeague(division: 'primera' | 'segunda') {
  const data = division === 'primera' ? primeraData : segundaData;
  return { ...data, standings: data.standings.map((row) => ({ ...row, team: teamById(row.teamId) })) };
}

export function getCup() {
  return {
    ...copaData,
    groups: Object.fromEntries(Object.entries(copaData.groups).map(([name, rows]) => [
      name,
      rows.map((row) => ({ ...row, team: teamById(row.teamId) })),
    ])),
  };
}

export function getAllTeams() { return teamsData; }
