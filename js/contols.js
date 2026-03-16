import { comandsContainer, getCommands } from "./actions/comands.js";
import { interactionContainer, visibleInteractioPet } from "./actions/list.actions.js";
import { createElement } from "./service/components/elements.js";
import { getListUtilitys, utilitysContainer, visibleUtility } from "./utilitys/list.utility.js";
import { notesContainer } from "./utilitys/notes.js";

// Основной контейнер меню
const createController = createElement("div", "controllerContainer hidden");
document.body.appendChild(createController);

// логотип
const createLogo = createElement("p", "myPetsLogo__", [{ attr: "textContent", value: "Мой асисстент" }]);

// Контейнер с подменю и логотипом
const mainAndHeader__ = createElement("div", "mainAndHeader__");

// Контейнеры в подменю
// Список подменю
export const main = createElement("div", "mainAndHeader__");

// Кнопка домой, возвращает на начальный экран меню
export const createBtnHome = createElement("span", "controllerBtn hidden", [{ attr: "textContent", value: "Назад" }]);
createBtnHome.onclick = () => {
  goHomeMenu___();
};

// Функция возвращения в начало меню
const goHomeMenu___ = () => {
  main.classList.remove("hidden");
  createBtnHome.classList.add("hidden");
  comandsContainer.classList.add("hidden");
  interactionContainer.classList.add("hidden");
};

// Кнопка закрытия всего меню
const closedContainer = createElement("div", "mainAndHeader__");
const createBtnClosed = createElement("span", "controllerBtn", [{ attr: "textContent", value: "Закрыть" }]);
createBtnClosed.onclick = () => {
  goHomeMenu___();
  createController.classList.add("hidden");
};

// Основная функция отрисовки меню
export const viewControl = (pet) => {
  // Позиционирование меню относительно питомца
  createController.style.left = `${pet.coordinates.x - 30}px`;

  // Список интерактивных кнопок у подменю listMainSubMenu
  const listMainSubMenu = [
    { name: "Взаимодействие", func: visibleInteractioPet },
    { name: "Инструменты", func: visibleUtility },
  ];
  listMainSubMenu.forEach((btn) => {
    const createBtn = createElement("span", "controllerBtnLeft", [{ attr: "textContent", value: btn.name }]);
    createBtn.addEventListener("click", btn.func);
    main.append(createBtn);
  });

  // Взаимодействие
  // Команды
  getCommands(pet);

  // Инструменты
  // Заметки
  getListUtilitys()

  // Вкладываем все вложения
  mainAndHeader__.append(createLogo, comandsContainer, interactionContainer, utilitysContainer, notesContainer, main);
  closedContainer.append(createBtnHome, createBtnClosed);
  createController.append(mainAndHeader__, closedContainer);
  return createController;
};
