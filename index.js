const headingInput = document.querySelector("#heading-input");
const dropdown = document.querySelector(".heading-input__dropdown");
const dropdownContent = document.querySelector(
  ".heading-input__dropdown__content"
);
const documentBody = document.querySelector("body");
let selectedItem;

window.addEventListener("keyup", (event) => {
  event.code === "Escape" && dropdown.classList.add("display-none");
});

documentBody.addEventListener("click", () => {
  dropdown.classList.add("display-none");
});

function toggleHeadingInputDropdown(keycode) {
  headingInput.value.match(/\/[A-Za-z0-9]+/) && keycode !== "Escape"
    ? dropdown.classList.remove("display-none")
    : dropdown.classList.add("display-none");
}

async function fetchDropdownData() {
  const response = await fetch("./mock-data.json");
  const data = await response.json();
  return data;
}

function createDropdownElements(data) {
  return data.map(({ title, shortcutText, isSelected, tag }) => {
    return `<div
                    class="heading-input__dropdown__content__item"
                     is-selected="${isSelected || false}"
                    tag="${tag}">
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

const setSelectedElement = (filteredData) => {
  if (filteredData.length > 0) filteredData[0].isSelected = true;
};

const setDropDownContent = (filteredData) =>
  (dropdownContent.innerHTML = createDropdownElements(filteredData).join(""));

const createSelectedTag = (tagName) => {
  const selectedTag = document.createElement(tagName);
  console.log(selectedTag)
};

const setSelectedItemEvent = () => {
  selectedItem = document.querySelector('div[is-selected="true"]');

  selectedItem &&
    selectedItem.addEventListener("click", () => {
      const selectedTagName = selectedItem.getAttribute("tag");
      createSelectedTag(selectedTagName)
    });
};

headingInput.addEventListener("keyup", async (e) => {
  const dropdownData = await fetchDropdownData();
  const filteredData = [...filterDropdownData(dropdownData)];

  toggleHeadingInputDropdown(e.code);
  setSelectedElement(filteredData);
  setDropDownContent(filteredData);

  setSelectedItemEvent();
});
