const headingInput = document.querySelector("#heading-input");
const dropdown = document.querySelector(".heading-input__dropdown");
const dropdownContent = document.querySelector('.heading-input__dropdown__content')
let dropdownData = [];

const toggleHeadingInputDropdown = () => {
  headingInput.value === "/"
    ? dropdown.classList.remove("display-none")
    : dropdown.classList.add("display-none");
};

const fetchDropdownData = async () => {
  const response = await fetch("./mock-data.json");
  const data = await response.json();
  return data;
};

const createDropdownElements = (data) => {
    return data.map(({title, shortcut}) => {
        return `<div><h6>${title}</h6><p>Shortcut: ${shortcut}</p></div>`
    

    });
}

headingInput.addEventListener("keyup", async () => {
  toggleHeadingInputDropdown();
  if (headingInput.value === "/") {
    dropdownData = await fetchDropdownData();
  }

  dropdownContent.innerHTML = createDropdownElements(dropdownData).join('')

});
