const PACKET_START_WINDOW = 4;
const MESSAGE_START_WINDOW = 14;

const getFirstMarkerIndex = (input: string, markerSize: number) => {
  for (let i = 0; i < input.length; i++) {
    let seen = "";

    for (let j = i; j < i + markerSize; j++) {
      if (seen.includes(input[j])) {
        break;
      }

      seen += input[j];

      if (seen.length === markerSize) {
        return j + 1;
      }
    }
  }

  return -1;
};

export const getFirstPacketIndex = (input: string) =>
  getFirstMarkerIndex(input, PACKET_START_WINDOW);

export const getFirstMessageIndex = (input: string) =>
  getFirstMarkerIndex(input, MESSAGE_START_WINDOW);
