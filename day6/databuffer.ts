const PACKET_START_WINDOW = 4;

export const getFirstPacketIndex = (input: string) => {
  for (let i = 0; i < input.length; i++) {
    let seen = "";

    for (let j = i; j < i + PACKET_START_WINDOW; j++) {
      if (seen.includes(input[j])) {
        break;
      }

      seen += input[j];

      if (seen.length === PACKET_START_WINDOW) {
        return j + 1;
      }
    }
  }

  return -1;
};
