export const TransformDateAndTime = (dateString) => {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes < 9 ? "0" + minutes : minutes}`,
  };
};
