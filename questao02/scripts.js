window.addEventListener('load', () => {
  const form = document.forms.withdrawal
  const input = document.querySelector('#money')
  const ballots = document.querySelector('.ballots')

  input.addEventListener('input', function () {
    let value = this.value.replaceAll(/\D+/g, '')

    if (value.length > 5) {
      value = value.substring(0, 5)
    }

    this.value = value
  })

  form.addEventListener('submit', function(event) {
    event.preventDefault()

    ballots.innerHTML = ''

    const { isValid, money } = validateField()

    if (!isValid) return

    const notes50 = Math.floor(money / 50)
    const notes20 = Math.floor((money - (notes50 * 50)) / 20)
    const notes10 = Math.floor((money - (notes50 * 50 + notes20 * 20)) / 10)
    let notes5 = Math.floor((money - (notes50 * 50 + notes20 * 20 + notes10 * 10)) / 5)
    let notes2 = Math.floor((money - (notes50 * 50 + notes20 * 20 + notes10 * 10 + notes5 * 5)) / 2)

    const lastDigit = String(money).slice(-1);
    if (lastDigit === '6' || lastDigit === '8') {
      notes5--
      notes2 = Math.floor((money - (notes50 * 50 + notes20 * 20 + notes10 * 10 + notes5 * 5)) / 2)
    }
    
    const notes = {
      50: notes50,
      20: notes20,
      10: notes10,
      5: notes5,
      2: notes2
    }

    Object.entries(notes)
      .filter(([_, amount]) => amount > 0)
      .forEach(([note, amount]) => {
        const noteImg = document.createElement('img')
        noteImg.src = `./images/cedula-${note.padStart(2, '0')}.png`
        noteImg.alt = `Cédula de ${note.padStart(2, '0')} Real(is)`

        const noteText = document.createElement('span')
        noteText.innerHTML = `${amount} Cédula(s)`

        const noteDivWrapper = document.createElement('div')
        noteDivWrapper.classList.add('ballot')
        noteDivWrapper.appendChild(noteImg)
        noteDivWrapper.appendChild(noteText)

        ballots.prepend(noteDivWrapper)
      })
  })

  function validateField() {
    const money = input.value
    let message = ''

    if (!money || isNaN(money)) {
      message = 'Valor ínválido inserido!'
    }

    const lastDigit = money.slice(-1);
    if (Number(money) % 2 !== 0 && !['5', '7', '9'].includes(lastDigit)) {
      message = 'Não é possível sacar este valor.'
    }

    if (message) alert(message)

    return {
      isValid: message === '',
      money: Number(money)
    }
  }
})