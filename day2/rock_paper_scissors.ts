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

export const calculateScoreByMoves = (input: string) => {
  const pairs = input
    .split("\n")
    .map((row) => row.split(" "))
    .filter(([opponent, player]) => opponent && player) // for fileline ending
    .map(([opponent, player]) => [
      opponent,
      String.fromCodePoint(player.codePointAt(0)! - 23), // Normalise player values to match opponent
    ]);

  return pairs.reduce(
    (score, [opponent, player]) => {
      let roundScore = 0;

      if (opponent === player) {
        roundScore = 3;
      }

      const node = findNode(listHead, opponent);

      if (node?.next?.value === player) {
        roundScore = 6;
      }

      return score + roundScore + player.codePointAt(0)! - 64;
    },
    0,
  );
};

export const calculateScoreByStrategy = (input: string) => {
    const pairs = input
    .split("\n")
    .map((row) => row.split(" "))
    .filter(([opponent, strategy]) => opponent && strategy); // for fileline ending

  return pairs.reduce(
    (score, [opponent, strategy]) => {
      let roundScore = 3;
      let move: string = opponent;

      if (strategy === 'X') {
        const node = findNode(listHead, opponent)
        move = node?.previous?.value!;
        roundScore = 0;
      }

      if (strategy === 'Z') {
        const node = findNode(listHead, opponent)
        move = node?.next?.value!;
        roundScore = 6;
      }

      return score + roundScore + move.codePointAt(0)! - 64;
    },
    0,
  );
};
