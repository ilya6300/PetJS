import { comandsContainer, getCommands } from "./actions/comands.js";
import { interactionContainer, visibleInteractioPet } from "./actions/list.actions.js";
import { staticsBar } from "./components/ui/statics.bar.js";
import { createElement } from "./service/components/elements.js";
import data from "./service/state/data.js";
import { getListUtilitys, utilitysContainer, visibleUtility } from "./utilitys/list.utility.js";
import { notesContainer } from "./utilitys/notes.js";

// создаём задний фон
const createControllerBack = createElement("div", "controllerContainerBack hidden");
document.body.appendChild(createControllerBack);

// Основной контейнер меню
const createController = createElement("div", "controllerContainer");
createControllerBack.appendChild(createController);

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
  createControllerBack.classList.add("hidden");
};

// Применение стилей из апи
export const selectStyle = (item) => {
  // Применяем стили
  console.log(item);
  createControllerBack.style.background = item.background;
  createControllerBack.style.width = item.width;
  createControllerBack.style.height = item.height;
};

// Основная функция отрисовки меню
export const viewControl = (pet) => {
  selectStyle(data.style);
  // Позиционирование меню относительно питомца
  createControllerBack.style.left = `${pet.coordinates.x - 30}px`;

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
  getListUtilitys();

  // Вкладываем все вложения
  mainAndHeader__.append(createLogo, staticsBar(pet), comandsContainer, interactionContainer, utilitysContainer, notesContainer, main);
  closedContainer.append(createBtnHome, createBtnClosed);
  createController.append(mainAndHeader__, closedContainer);
  return createControllerBack;
};
