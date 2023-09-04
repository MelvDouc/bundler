(() => {
  // src/random-int.ts
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // src/random-char.ts
  function randomLowerCase() {
    return String.fromCharCode(randomInt(97, 122));
  }
  function randomUpperCase() {
    return String.fromCharCode(randomInt(65, 90));
  }
  function randomSymbol() {
    return String.fromCharCode(randomInt(33, 47));
  }

  // src/shuffle.ts
  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  // src/app.ts
  function getRandomPassword(length) {
    const password = [];
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
    `
Your random password:
%c${getRandomPassword(23)}`,
    "color: lightgreen"
  );
})();
