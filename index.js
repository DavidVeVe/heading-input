const headingInput = document.querySelector("#heading-input");
const dropdown = document.querySelector(".heading-input__dropdown");
const dropdownContent = document.querySelector(
  ".heading-input__dropdown__content"
);

let selectedItem;

function toggleHeadingInputDropdown() {
  headingInput.value.charAt(0) === "/"
    ? dropdown.classList.remove("display-none")
    : dropdown.classList.add("display-none");
}

async function fetchDropdownData() {
  const response = await fetch("./mock-data.json");
  const data = await response.json();
  return data;
}


const test = () => {
    console.log('hello')
}

function createDropdownElements(data) {
  return data.map(({ title, shortcutText, isSelected }) => {
    return `<div onclick="test()" class="heading-input__dropdown__content__item" is-selected="${isSelected || false}">
                    <h6>${title}</h6>
                    <p>Shortcut: ${shortcutText}</p>
                </div>`;
  });
}

function filterDropdownData(data) {
  return data.filter((element) => {
    return RegExp(headingInput.value.slice(1), "gi").test(element.title);
  });
}

headingInput.addEventListener("keyup", async () => {
  const dropdownData = await fetchDropdownData();
  const filteredData = [...filterDropdownData(dropdownData)];

  toggleHeadingInputDropdown();

  if(filteredData.length > 0) filteredData[0].isSelected = true;


  dropdownContent.innerHTML = createDropdownElements(filteredData).join("");
});

window.addEventListener("keyup", (event) => {
  event.code === "Escape" && dropdown.classList.add("display-none");
});
