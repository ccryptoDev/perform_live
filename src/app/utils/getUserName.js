export const getUserName = userInfo => {
  const { stageName, firstName, lastName } = userInfo;
  if (stageName) return stageName;
  return [firstName, lastName].filter(e => e).join(' ');
};
