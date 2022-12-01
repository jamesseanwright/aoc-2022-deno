const PLAYER_WIN = 6;
const PLAYER_LOSS = 0;
const DRAW = 3;

interface Node<T> {
  value: T;
  previous?: Node<T>;
  next?: Node<T>;
}

const createNode = <T>(value: T): Node<T> => ({
  value,
});

const listHead = createNode("A");
listHead.next = createNode("B");
listHead.next.next = createNode("C");
listHead.next.next.next = listHead;
listHead.previous = listHead.next.next;
listHead.next.previous = listHead;
listHead.next.next.previous = listHead.next;

const findNode = <T>(head: Node<T>, value: T): Node<T> | undefined => {
  const walk = (node?: Node<T>): Node<T> | undefined =>
    !node || node && node.value === value ? node : walk(node.next);

  return walk(head);
};

const parseInput = (input: string) =>
  input
    .split("\n")
    .map((row) => row.split(" "))
    .filter(([a, b]) => a && b); // for file line ending

const getRoundScore = (player: string, opponent: string) => {
  const moves = findNode(listHead, opponent);

  if (moves?.next?.value === player) {
    return PLAYER_WIN;
  }

  if (moves?.previous?.value === player) {
    return PLAYER_LOSS;
  }

  return DRAW;
};

// Calculates the offset from (UTF-16 code point for 'A') - 1 i.e:
// * 'A' => 1
// * 'B' => 2
// * 'C' => 2
const getMoveScore = (move: string) => move.codePointAt(0)! - 64;

export const calculateScoreByMoves = (input: string) =>
  parseInput(input)
    .map(([opponent, player]) => [
      opponent,
      String.fromCodePoint(player.codePointAt(0)! - 23), // Normalise player values to match opponent
    ])
    .reduce(
      (score, [opponent, player]) => (
        score + getRoundScore(player, opponent) + getMoveScore(player)
      ),
      0,
    );

export const calculateScoreByStrategy = (input: string) =>
  parseInput(input)
    .reduce(
      (score, [opponent, strategy]) => {
        const node = findNode(listHead, opponent);
        let move = node?.value;

        switch (strategy) {
          case "X":
            move = node?.previous?.value;
            break;
          case "Z":
            move = node?.next?.value;
            break;
        }

        return score + getRoundScore(move!, opponent) + getMoveScore(move!);
      },
      0,
    );
