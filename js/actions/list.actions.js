import { createBtnHome, main } from "../contols.js";
import { createElement } from "../service/components/elements.js";
import { comandsContainer } from "./comands.js";

// Открыть меню с командами
const visibleComands = () => {
  interactionContainer.classList.add("hidden");
  comandsContainer.classList.remove("hidden");
};

// Список интерактивных взаимодействий с питомцем
const listInteractionMenu = [{ name: "Команды", func: visibleComands }];

// Открыть интерактивное меню взаимодействия с питомцем
export const visibleInteractioPet = () => {
  interactionContainer.classList.remove("hidden");
  main.classList.add("hidden");
  createBtnHome.classList.remove("hidden");
};

// Контейнер с командами
export const interactionContainer = createElement("div", "mainAndHeader__ hidden");

// Отрисовка команд из списка
listInteractionMenu.forEach((btn) => {
  const createBtn = createElement("span", "controllerBtnLeft", [{ attr: "textContent", value: btn.name }]);
  createBtn.addEventListener("click", btn.func);
  interactionContainer.append(createBtn);
});
