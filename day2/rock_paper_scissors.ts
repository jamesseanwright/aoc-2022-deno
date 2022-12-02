export const calculateScore = (input: string) => {
    const pairs = input
        .split("\n")
        .map(row => row.split(" "))
        .filter(([opponent, player]) => opponent && player) // for fileline ending
        .map(([opponent, player]) => [
            opponent,
            String.fromCodePoint(player.codePointAt(0)! - 23)
        ]);

    return pairs.reduce(
        (score, [opponent, player]) =>
            score + Math.min(Math.max((player.codePointAt(0)! - opponent.codePointAt(0)! + 1), -1), 2) * 3 + player.codePointAt(0)! - 'A'.codePointAt(0)! + 1,
        0
    );
};
