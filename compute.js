class Calculator{
    constructor(currentOperandDisplay,previousOperandDisplay){
        this.currentOperandDisplay = currentOperandDisplay;
        this.previousOperandDisplay = previousOperandDisplay;
        this.buttons = document.querySelectorAll('[data-canSwitch]')
        this.memoryPara = document.querySelector('.memory-display')
        this.clear()
    }

    clear(){
       this.currentOperand = '';
       this.previousOperand = '';
       this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }


    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.'))return;
       this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    initailizeOperation(operation){
        if(this.currentOperand === '')return;
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand ;
        this.currentOperand = '';
    }


    compute(){
        let computedValue;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        const memoryValue = parseFloat(localStorage.getItem('value'))

        if(isNaN(prev) || isNaN(current)){
            return;
        }

        switch(this.operation){
            case '+':
                computedValue = prev + current;
            break;

            case '-':
                computedValue = prev -  current;
            break;

            case 'x':
                computedValue = prev * current;
            break;

            case '÷':
                computedValue = prev / current;
            break;

            case '%' :
                computedValue = (prev / 100  * current);
            break;

            default:
                return;
        }
        this.currentOperand = computedValue;
        this.previousOperand = '';
        this.operation = undefined;
        localStorage.setItem('grandTotal',computedValue)
    }


    appendMemory(){
        if(this.currentOperand !== '' && localStorage.getItem('value') === null){
            localStorage.setItem('value',this.currentOperand)
            this.memoryPara.innerText =  'saved to memory';
            this.memoryParaSetTimeout()
            this.previousOperand = parseFloat(localStorage.getItem('value'))
            this.clear()
        }

        if(this.currentOperand !== '' && localStorage.getItem('value') !== null){
            const xr = parseFloat(localStorage.getItem('value'))
            const xr2 = xr + parseFloat(this.currentOperand)
            localStorage.setItem('value',xr2)
            this.memoryPara.innerText = 'memory'
            this.memoryParaSetTimeout()
        }
    }
     
    decrementMemory(){
        if(this.currentOperand !== '' && localStorage.getItem('value') !== null){
            const xr = parseFloat(localStorage.getItem('value'))
            const xr2 = xr - parseFloat(this.currentOperand)
            localStorage.setItem('value',xr2)
            this.memoryPara.innerText = 'memory'
            this.memoryParaSetTimeout()
        }
    }

    grandTotal(){
        if(localStorage.getItem('grandTotal') !== null){
            this.currentOperand = localStorage.getItem('grandTotal')
        }
    }

    getMemory(targetClass){
        const MRC =  document.querySelector(targetClass)

        MRC.addEventListener('click',() => {
            if(this.currentOperand === '' && localStorage.getItem('value') !== null){
                this.currentOperand =  localStorage.getItem('value')
                this.memoryPara.innerText = 'memory retrieved'
                this.memoryParaSetTimeout()
            }
        })

        MRC.addEventListener('dblclick',(e) => {
            if(localStorage.getItem('value') !== null){
                localStorage.removeItem('value')
                this.memoryPara.innerText = 'memory deleted'
                this.currentOperand = '';
                this.updateDisplay()
                this.memoryParaSetTimeout()
            }
         })
    }



    switchOff(){
        document.querySelector('.off-calculator').addEventListener('click',() => {
            this.buttons.forEach(button => {
                button.classList.add('switchedOff')
                button.disabled = true;
            })
            this.clear()
        })


        // explicitly just for the window.onload
        this.buttons.forEach(button => {
            button.classList.add('switchedOff')
            button.disabled = true;
        })
    }

    switchOn(){
        document.querySelector('.on-calculator').addEventListener('click',() => {
            this.buttons.forEach(button => {
                button.classList.remove('switchedOff')
                button.disabled = false;
            })
        })
    }
    

    // handling the number display, adding commas and handling decimals
    setFormatOutput(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

    //   function for clearing the memoryPara innerText
      memoryParaSetTimeout(){
        setTimeout(() => {
            this.memoryPara.innerText = '';
        }, 900);
    }

    updateDisplay(){
        this.currentOperandDisplay.innerText = this.setFormatOutput(this.currentOperand);
        if(this.currentOperand == '' && this.operation !== undefined){
            this.currentOperandDisplay.innerText = `${this.setFormatOutput(this.previousOperand)}  ${this.operation}`
        }
    }
}


export { Calculator }