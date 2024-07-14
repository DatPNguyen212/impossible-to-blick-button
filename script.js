const button = document.querySelector('.button')

button.addEventListener('click', (event) => {
  alert('Smart one!')
  location.reload()
})

// Get size and position of button and winddow:
const buttonSizePosition = button.getBoundingClientRect()
console.log(buttonSizePosition)

const windowSizePosition = button.getBoundingClientRect()

// Offset value distance from button's sides (not including button's size) where button will start moving
const offset = 100

// Offset distance between button center and pointer(includes button's size)
const xButtonOffset = buttonSizePosition.width / 2 + offset
const yButtonOffset = buttonSizePosition.height / 2 + offset

console.log(xButtonOffset, yButtonOffset)

document.addEventListener('mousemove', (event) => {
  let mouseX = event.pageX
  let mouseY = event.pageY
  // console.log(mouseX, mouseY)

  // get current size and position of button:
  const buttonSizePosition = button.getBoundingClientRect()
  console.log(buttonSizePosition)

  // get current button center position
  const buttonCenterX = buttonSizePosition.left + buttonSizePosition.width / 2

  const buttonCenterY = buttonSizePosition.top + buttonSizePosition.height / 2

  // console.log(buttonCenterX, buttonCenterY)

  // Distance Mouse to Button Center
  let xDistMToB = getDistance(mouseX, buttonCenterX)
  let yDistMToB = getDistance(mouseY, buttonCenterY)

  console.log(xDistMToB, yDistMToB)

  // need absolute to turn negative distance to positive, because X and Y is based on top left corner of screen, when 2 things subtract, depending on the order, you can get negative value.
  if (Math.abs(xDistMToB) <= xButtonOffset) {
    button.style.left = `${
      buttonSizePosition.left - (xButtonOffset / xDistMToB) * 10
    }px`
  }
  if (Math.abs(yDistMToB) <= yButtonOffset) {
    button.style.top = `${
      buttonSizePosition.top - (yButtonOffset / yDistMToB) * 10
    }px`
  }
})

function getDistance(objectOne, objectTwo) {
  return objectOne - objectTwo
}
