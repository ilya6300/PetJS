import { comandsContainer } from "../actions/comands.js";
import { createBtnHome, main } from "../contols.js";
import { createElement } from "../service/components/elements.js";
import { notesContainer, visibleNotes } from "./notes.js";

// Список инструментов
const listUtility = [{ name: "Заметки", func: visibleNotes }];

// Контейнер с инструментами
export const utilitysContainer = createElement("div", "mainAndHeader__ hidden");

// Открыть меню с инструментами
export const visibleUtility = () => {
  utilitysContainer.classList.remove("hidden");
  main.classList.add("hidden");
  createBtnHome.classList.remove("hidden");
  comandsContainer.classList.add("hidden");
};

// Отрисовка списка из инструментов
export const getListUtilitys = () => {
  listUtility.forEach((item) => {
    const createItem = createElement("span", "controllerBtnLeft", [{ attr: "textContent", value: item.name }]);
    console.log(item);
    createItem.addEventListener("click", item.func);
    utilitysContainer.append(createItem);
  });
};
