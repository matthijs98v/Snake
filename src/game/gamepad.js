// Sets eventListener for controller connect and disconnect
function setupController() {
  window.addEventListener(
    "gamepadconnected",
    (e) => {
      gamepadHandler(e, true);
    },
    false
  );
  window.addEventListener(
    "gamepaddisconnected",
    (e) => {
      gamepadHandler(e, false);
    },
    false
  );
}

// The handler
function gamepadHandler(event, connecting) {
  const gamepad = event.gamepad;

  if (connecting) {
    const gp = navigator.getGamepads()[gamepad.index];
    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      gp.index,
      gp.id,
      gp.buttons.length,
      gp.axes.length
    );
  } else {
    console.log("Gamepad %s disconnected.", gamepad.id);
  }
}

// Checks the input and returns a numbers
function checkController() {
  if (navigator.getGamepads()[0] != undefined) {
    for (let i = 0; i < navigator.getGamepads()[0].buttons.length; i++) {
      if (navigator.getGamepads()[0].buttons[i].pressed) {
        return i;
      }
    }
  }
}
