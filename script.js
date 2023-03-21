import { Calculator } from "./compute.js"
const inputedNumber = document.querySelectorAll('.number')
const inputedOperation = document.querySelectorAll('.operation')
const currentOperandDisplay = document.querySelector('.operand-display')
const previousOperandDisplay = document.querySelector('.previous')
const timeInput = document.querySelector('[data-time]')

const calculator = new Calculator(currentOperandDisplay,previousOperandDisplay)

inputedNumber.forEach(number => {
    number.addEventListener('click',() => {
        calculator.appendNumber(number.innerText)
        calculator.updateDisplay()
    })
})

inputedOperation.forEach(operation => {
    operation.addEventListener('click',() => {
        calculator.initailizeOperation(operation.innerText)
        calculator.updateDisplay()
    })
})

document.addEventListener('click',async(e) =>  {
    if(e.target.classList.contains('delete')){
        calculator.delete()
        calculator.updateDisplay()
    }

    if(e.target.classList.contains('clear')){
        calculator.clear()
        calculator.updateDisplay()
    }

    if(e.target.classList.contains('equalTo')){
        calculator.compute()
        calculator.updateDisplay()
    }

    if(e.target.classList.contains('on-calculator')){
        calculator.switchOn(e.target.classList)
        calculator.updateDisplay()
    }

    if(e.target.classList.contains('off-calculator')){
        calculator.switchOff()
        calculator.updateDisplay()
    }

    if(e.target.classList.contains('grand-total')){
        calculator.grandTotal()
        calculator.updateDisplay()
    }


    if(e.target.classList.contains('memory-create')){
        calculator.getMemory('.memory-create')
        calculator.updateDisplay()
    }

    if(e.target.classList.contains('memory-plus')){
        calculator.appendMemory()
        calculator.updateDisplay()
    }

    if(e.target.classList.contains('memory-minus')){
        calculator.decrementMemory()
        calculator.updateDisplay()
    }
})



window.onload = localStorage.removeItem('value')
window.onload = calculator.switchOff()



function setCalculatorTime(){
    const currentTime = new Date()
    const Hr = currentTime.getHours()
    const Mn = currentTime.getMinutes()

    timeInput.innerHTML =  Mn <= 9 ? `${Hr} : 0${Mn}`: `${Hr} : ${Mn}`;
}

setInterval(setCalculatorTime,100)

