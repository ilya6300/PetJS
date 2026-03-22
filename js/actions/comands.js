import { useEnergy } from "../components/ui/statics.bar.js";
import { createElement } from "../service/components/elements.js";

// Контейнер с командами
export const comandsContainer = createElement("div", "mainAndHeader__ hidden");

export const getCommands = (pet) => {
  pet.commands.forEach((c) => {
    // собираем строку
    const row = createElement("div", "flx_bw");
    const name = createElement("span", "controllerBtnLeft", [{ attr: "textContent", value: c.name }]);
    const rate = createElement("span", "controllerBtnLeft", [{ attr: "textContent", value: `${c.successRate}%` }]);
    row.append(name, rate);
    comandsContainer.appendChild(row);
    // применяем клики
    row.onclick = () => {
      const successRate = Math.random() * (100 - 1) + 1;
      console.log("Команда:", pet.thisSpriteID);
      if (c.id === pet.thisSpriteID) {
        return console.log("Команда уже выполняется");
      }
      if (pet.energy === 0) {
        return console.log("Питомец устал");
      }
      if (successRate > c.successRate) return;
      useEnergy(pet);
      if (c.successRate < 100) {
        c.successRate += 1;
        // ОБНОВЛЯЕМ ТЕКСТ ВИЗУАЛЬНО
        rate.textContent = `${c.successRate}%`;
      }
      pet.setEvent(c.id); // ID для 'sid'
    };
  });
};
