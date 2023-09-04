import randomInt from "$src/random-int.ts";

export function randomLowerCase() {
  return String.fromCharCode(randomInt(97, 122));
}

export function randomUpperCase() {
  return String.fromCharCode(randomInt(65, 90));
}

export function randomSymbol() {
  return String.fromCharCode(randomInt(33, 47));
}