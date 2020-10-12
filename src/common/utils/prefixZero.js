const prefixZero = num => {
  const prefix = num.toString().length === 1 ? '0' : '';
  return prefix + num;
};

export default prefixZero;
