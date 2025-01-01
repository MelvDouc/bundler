import randomInt from "$test-app/random-int.ts";
import { randomLowerCase, randomSymbol, randomUpperCase } from "$test-app/random-char.ts";
import shuffle from "$test-app/array-utils/shuffle.ts";

function getRandomPassword(length: number): string {
  const password: string[] = [];

  while (password.length < length) {
    password.push(String(randomInt(0, 9)));
    password.push(randomLowerCase());
    password.push(randomUpperCase());
    password.push(randomSymbol());
  }

  const passwordStr = shuffle(password).slice(0, length).join("");

  if (/(.)\1/.test(passwordStr))
    return getRandomPassword(length);

  return passwordStr;
}

console.log(
  `\nYour random password:\n%c${getRandomPassword(23)}`, "color: lightgreen"
);