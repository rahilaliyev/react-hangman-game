export function showNotificationFunc(setState) {
  setState(true);
  setTimeout(() => {
    setState(false);
  }, 2000);
}

export function checkWin(correct, wrong, word) {
  let status = "win";

  word.split("").forEach(el => {
    if (!correct.includes(el)) {
      status = "";
    }

    if (wrong.length === 6) {
      status = "lose";
    }
  });

  return status;
}
