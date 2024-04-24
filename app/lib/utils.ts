function getTomorrow() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDate();
  let tomorrow = new Date(year, month, day + 1).toISOString();

  return tomorrow;
}

export const tomorrow = getTomorrow();
