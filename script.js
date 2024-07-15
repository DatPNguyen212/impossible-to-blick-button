const button = document.querySelector('.button')
const body = document.querySelector('body')

button.addEventListener('click', (event) => {
  alert('Smart one!')
  location.reload()
})

// Get size and position of button and winddow:
const buttonSizePosition = button.getBoundingClientRect()
console.log(buttonSizePosition)

const windowSizePosition = body.getBoundingClientRect()

// Offset value distance from button's sides (not including button's size) where button will start moving
const offset = 50

// Offset distance between button center and pointer(includes button's size)
const xButtonOffset = buttonSizePosition.width / 2 + offset
const yButtonOffset = buttonSizePosition.height / 2 + offset

console.log(xButtonOffset, yButtonOffset)

document.addEventListener('mousemove', (event) => {
  const mouseX = event.pageX
  const mouseY = event.pageY
  // console.log(mouseX, mouseY)

  // get current size and position of button:
  const buttonSizePosition = button.getBoundingClientRect()
  console.log(buttonSizePosition)

  // get current button center position
  const buttonCenterX = buttonSizePosition.left + buttonSizePosition.width / 2

  const buttonCenterY = buttonSizePosition.top + buttonSizePosition.height / 2

  // console.log(buttonCenterX, buttonCenterY)

  // Distance Mouse to Button Center
  const xDistMToB = getDistance(mouseX, buttonCenterX)
  const yDistMToB = getDistance(mouseY, buttonCenterY)

  console.log(xDistMToB, yDistMToB)

  // need absolute to turn negative distance to positive, because X and Y is based on top left corner of screen, when 2 things subtract, depending on the order, you can get negative value.
  if (
    Math.abs(xDistMToB) <= xButtonOffset &&
    Math.abs(yDistMToB) <= yButtonOffset
  ) {
    button.style.left = `${
      buttonSizePosition.left - (xButtonOffset / xDistMToB) * 10
    }px`

    button.style.top = `${
      buttonSizePosition.top - (yButtonOffset / yDistMToB) * 10
    }px`
  }

  if (getDistance(buttonCenterX, windowSizePosition.right) >= 0) {
    button.style.left = `${windowSizePosition.left + xButtonOffset}px`
  }
  if (getDistance(buttonCenterX, windowSizePosition.left) <= 0) {
    button.style.left = `${
      windowSizePosition.right - buttonSizePosition.width - xButtonOffset
    }px`
  }

  if (getDistance(buttonCenterY, windowSizePosition.top) <= 0) {
    button.style.top = `${
      windowSizePosition.bottom - buttonSizePosition.height - yButtonOffset
    }px`
  }

  if (getDistance(buttonCenterY, windowSizePosition.bottom) >= 0) {
    button.style.top = `${windowSizePosition.top + yButtonOffset}px`
  }
})

function getDistance(objectOne, objectTwo) {
  return objectOne - objectTwo
}
