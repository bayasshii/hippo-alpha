export const convertData = (arr: Array<any>, value: string, id: number) => {
  let result = [];
  let order = 1;
  for (let i = 0; i < arr.length; ) {
    let year = 0;
    for (let j = i; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        year++;
      } else {
        break;
      }
    }
    result.push({
      order: order++,
      year: year,
      [value]: arr[i],
      simulation_id: id
    });
    i += year;
  }

  return result;
};
