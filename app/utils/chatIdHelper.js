export default (id1, id2) => {
  if (!id1 || !id2) return false;
  const sortedIds = [id1, id2].sort((a, b) => a > b);
  return `${sortedIds[0]}-${sortedIds[1]}`;
};
