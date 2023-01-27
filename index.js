const headingInput = document.querySelector("#heading-input");
const dropdown = document.querySelector(".heading-input__dropdown");
const dropdownContent = document.querySelector(
  ".heading-input__dropdown__content"
);

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

function createDropdownElements(data) {
  return data.map(({ title, shortcut }) => {
    return `<div>
                    <h6>${title}</h6>
                    <p>Shortcut: ${shortcut}</p>
                </div>`;
  });
}

function filterDropdownData(data) {
  return data.filter((element) => {
    return RegExp(headingInput.value.slice(1), "gi").test(element.title);
  });
}

headingInput.addEventListener("keyup", async () => {
  toggleHeadingInputDropdown();
  const dropdownData = await fetchDropdownData();
  const filteredData = filterDropdownData(dropdownData);
  dropdownContent.innerHTML = createDropdownElements(filteredData).join("");
});
