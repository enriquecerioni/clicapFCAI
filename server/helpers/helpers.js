const { PAGE_LIMIT } = process.env;

export const calcNumOffset = (page) => {
  //calculo el numero del offset
  let numOffset = (Number(page) - 1) * Number(PAGE_LIMIT);
  return numOffset;
};
export const calcTotalPages = (totalItems) => {
  //Cantidad de paginas en total
  const cantPages = Math.ceil(totalItems / Number(PAGE_LIMIT));
  return cantPages;
};
