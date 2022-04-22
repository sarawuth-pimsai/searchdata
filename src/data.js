const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateData = (num) => {
  const data = [];

  for (let i = 0; i < num; i++) {
    data.push({
      title: `name-${random(1, 100)}`,
      value: random(1000, 10000000),
      get display() {
        return this.title + "-" + this.value;
      },
    });
  }

  return data;
};

export { generateData };
