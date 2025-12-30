export const MATCH_STATUS = {
  SCHEDULED: 'scheduled',
  VETO: 'veto',
  LIVE: 'live',
  COMPLETED: 'completed',
  ARCHIVED: 'archived'
};

export const MAP_POOL = [
  { id: 'MIRAGE', name: 'Mirage', image: 'https://img.youtube.com/vi/F91V3V6Qh6U/maxresdefault.jpg' },
  { id: 'INFERNO', name: 'Inferno', image: 'https://blob.faceit.com/static/img/maps/cs2/inferno_bg.jpg' },
  { id: 'NUKE', name: 'Nuke', image: 'https://blob.faceit.com/static/img/maps/cs2/nuke_bg.jpg' },
  { id: 'OVERPASS', name: 'Overpass', image: 'https://blob.faceit.com/static/img/maps/cs2/overpass_bg.jpg' },
  { id: 'VERTIGO', name: 'Vertigo', image: 'https://blob.faceit.com/static/img/maps/cs2/vertigo_bg.jpg' },
  { id: 'ANCIENT', name: 'Ancient', image: 'https://blob.faceit.com/static/img/maps/cs2/ancient_bg.jpg' },
  { id: 'ANUBIS', name: 'Anubis', image: 'https://blob.faceit.com/static/img/maps/cs2/anubis_bg.jpg' },
  { id: 'DUST2', name: 'Dust 2', image: 'https://blob.faceit.com/static/img/maps/cs2/dust2_bg.jpg' }
];

export const ROLE_TAXONOMY = {
  OWNER: { id: 'OWNER', priority: -1, label: 'Tournament Owner' },
  ADMIN: { id: 'ADMIN', priority: 0, label: 'Administrator' },
  CAPTAIN: { id: 'CAPTAIN', priority: 1, label: 'Team Captain' },
  PLAYER: { id: 'PLAYER', priority: 3, label: 'Operator' },
  GUEST: { id: 'GUEST', priority: 99, label: 'Spectator' }
};
