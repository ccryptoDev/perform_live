export const getPerformerName = ({ global }) => ({
  firstName: global.userInfo.firstName,
  lastName: global.userInfo.lastName,
});
