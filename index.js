const headingInput = document.querySelector("#heading-input");
const dropdown = document.querySelector(".heading-input__dropdown");
const dropdownContent = document.querySelector(
  ".heading-input__dropdown__content"
);
let dropdownData = [];

function toggleHeadingInputDropdown() {
  //headingInput.value === "/"
    //? dropdown.classList.remove("display-none")
    //: dropdown.classList.add("display-none");
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
    console.log('called')
  const regex = /([A-Za-z0-9]+( [A-Za-z0-9]+)+)/i;
  console.log(headingInput.value.slice(1))

 const test = data.filter((element) => {
    return RegExp(headingInput.value.slice(1), "gi").test(element.title)
  });

  console.log(test)

  return test
}

//function useRegex(input) {
//    let regex = /.*/i;
//    console.log(regex.test(input));
//    return regex.test(input);
//}

//useRegex('a')

headingInput.addEventListener("keyup", async () => {
  toggleHeadingInputDropdown();
  dropdownData = await fetchDropdownData();
    const filteredData =  filterDropdownData(dropdownData);

  dropdownContent.innerHTML = createDropdownElements(filteredData).join("");
});
