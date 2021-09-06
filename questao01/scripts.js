window.addEventListener('load', () => {
  const form = document.forms.floors

  function validateFields({ floorOne, floorTwo, floorThree }) {
    const { value: floorOneValue } = floorOne 
    const { value: floorTwoValue } = floorTwo 
    const { value: floorThreeValue } = floorThree 

    let message =''

    if (!floorOneValue || isNaN(floorOneValue)) {
      message = message.concat('Valor inválido no campo de funcionários do 1º andar\n')
    }

    if (!floorTwoValue || isNaN(floorTwoValue)) {
      message = message.concat('Valor inválido no campo de funcionários do 2º andar\n')
    }

    if (!floorThreeValue || isNaN(floorThreeValue)) {
      message = message.concat('Valor inválido no campo de funcionários do 3º andar\n')
    }

    if (message) alert(message)

    return {
      isValid: message === '',
      floorOne: Number(floorOneValue),
      floorTwo: Number(floorTwoValue),
      floorThree: Number(floorThreeValue),
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault()

    const { isValid, floorOne, floorTwo, floorThree } = validateFields(this)

    if (!isValid) return

    calculate({ floorOne, floorTwo, floorThree })
  }

  function calculate({ floorOne, floorTwo, floorThree }) {
    const totalMinutesFloorTwoIfCoffeeMakerOnTheFirstFloor = 2 * floorTwo
    const totalMinutesFloorThreeIfCoffeeMakerOnTheFirstFloor = 4 * floorThree

    const totalMinutesFloorOneIfCoffeeMakerOnTheSecondFloor = 2 * floorOne
    const totalMinutesFloorThreeIfCoffeeMakerOnTheSecondFloor = 2 * floorThree

    const totalMinutesFloorOneIfCoffeeMakerOnTheThirdFloor = 4 * floorOne
    const totalMinutesFloorTwoIfCoffeeMakerOnTheThirdFloor = 2 * floorTwo

    const [
      totalIfCoffeeMakerOnTheFirstFloor,
      totalIfCoffeeMakerOnTheSecondFloor,
      totalIfCoffeeMakerOnTheThirdFloor
    ] = [
      totalMinutesFloorTwoIfCoffeeMakerOnTheFirstFloor + totalMinutesFloorThreeIfCoffeeMakerOnTheFirstFloor,
      totalMinutesFloorOneIfCoffeeMakerOnTheSecondFloor + totalMinutesFloorThreeIfCoffeeMakerOnTheSecondFloor,
      totalMinutesFloorOneIfCoffeeMakerOnTheThirdFloor + totalMinutesFloorTwoIfCoffeeMakerOnTheThirdFloor
    ]

    let bestLocation = 'Melhor localização: '
    let bestTime = 'Tempo: '

    if (
      totalIfCoffeeMakerOnTheFirstFloor <= totalIfCoffeeMakerOnTheSecondFloor &&
      totalIfCoffeeMakerOnTheFirstFloor <= totalIfCoffeeMakerOnTheThirdFloor
    ) {
      bestLocation = bestLocation.concat('1º andar')
      bestTime = bestTime.concat(`${totalIfCoffeeMakerOnTheFirstFloor} min`)
    } else if (
      totalIfCoffeeMakerOnTheSecondFloor <= totalIfCoffeeMakerOnTheFirstFloor &&
      totalIfCoffeeMakerOnTheSecondFloor <= totalIfCoffeeMakerOnTheThirdFloor
    ) {
      bestLocation = bestLocation.concat('2º andar')
      bestTime = bestTime.concat(`${totalIfCoffeeMakerOnTheSecondFloor} min`)
    } else if (
      totalIfCoffeeMakerOnTheThirdFloor <= totalIfCoffeeMakerOnTheFirstFloor &&
      totalIfCoffeeMakerOnTheThirdFloor <= totalIfCoffeeMakerOnTheSecondFloor
    ) {
      bestLocation = bestLocation.concat('3º andar')
      bestTime = bestTime.concat(`${totalIfCoffeeMakerOnTheThirdFloor} min`)
    }

    alert(`${bestLocation}\n${bestTime}`)
  }

  form.addEventListener('submit', handleFormSubmit)
})