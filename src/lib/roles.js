export const ROLES = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  REFEREE: 'REFEREE',
  CAPTAIN: 'CAPTAIN',
  PLAYER: 'PLAYER',
  GUEST: 'GUEST'
};

export const normalizeRole = (role) => {
  if (!role) return ROLES.GUEST;
  const upper = role.toUpperCase();
  return Object.values(ROLES).includes(upper) ? upper : ROLES.GUEST;
};
