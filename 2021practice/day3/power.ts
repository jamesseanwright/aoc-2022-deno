export const getPowerConsumption = (input: string) => {
  const rows = input.split("\n");
  let gamma = "";
  let epsilon = "";

  for (let i = 0; i < rows[0].length; i++) {
    const counts = {
      0: 0,
      1: 0,
    };

    for (let j = 0; j < rows.length; j++) {
      const value = rows[j][i] as "0" | "1"; // TODO: validate
      counts[value]++;
    }

    if (counts["1"] > counts["0"]) {
      gamma += "1";
      epsilon += "0";
    } else {
      epsilon += "1";
      gamma += "0";
    }
  }

  return Number.parseInt(gamma, 2) * Number.parseInt(epsilon, 2);
};
