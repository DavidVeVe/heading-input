const headingInput = document.querySelector('#heading-input')
const dropdown = document.querySelector('.heading-input__dropdown')

headingInput.addEventListener('keyup', (event) => {
    headingInput.value === '/1' ? dropdown.classList.remove('display-none') : dropdown.classList.add('display-none')
})