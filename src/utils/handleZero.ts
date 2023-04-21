const handleZero = (num: number): string | number => {
  if (num.toString().length === 1) {
    return `0${num}`;
  }

  return num;
};

export default handleZero;
