export class Input {
    constructor(options) {
        const {
            name,
            placeholder,
            label,
            type = 'text',
            onInput,
            onChange,
        } = options;

        this.input = document.createElement('input');
        this.errorMessageElement = document.createElement('span');

        this.name = name;
        this.input.name = name;
        this.input.type =type
        this.input.placeholder = placeholder;
        this.label = label;        
        this.value = this.input.value;// щоб не звертатися до ДОМ

        this.control = this.createControl(onInput, onChange);// дів який включає в себе лейбл(емайл) строчку інпута і помилку
    
    } 

    createControl(onInput, onChange) {
         const container = document.createElement('div');// <div></div>
         const label = document.createElement('label');// <label> </label>


         const inputId = `_${this.name}`//повязуємо <label for="name" з id="name"

         container.classList.add('text-control');//  class="text-control"
         this.errorMessageElement.classList.add('input-error');//class="input-error"
         this.input.classList.add('input');//<input>

         this.input.id = inputId;
         label.setAttribute('for', inputId);

         label.innerText = this.label;

         container.append(label, this.input, this.errorMessageElement) //this.errorMessageElement-це в нас спан <span class="input-error"></span>
    
         
            this.input.addEventListener('input', (event) => {
                this.value = event.target.value;
                this.updateErrorMessage('')
                if(onInput) {
                onInput(event); 
            }
        });
        

         if(onChange) {
            this.input.addEventListener('input', (event) => {
                onChange(event);
            });
         }

         return container
    }

    updateErrorMessage(message) {
        this.errorMessageElement.innerText = message;
    }

    render(container) {
        container.append(this.control);
    }
}