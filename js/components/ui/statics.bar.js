import apiRequset from "../../service/api/api.requset.js";
import { createElement } from "../../service/components/elements.js";

const iconEnargy = new URL("../../../images/icons/energy.png", import.meta.url).href;

const reRenderStatistic = (name, value) => {
  const countEnergyPet = document.querySelector(`#${name}`);
  if (countEnergyPet) {
    countEnergyPet.textContent = value;
  }
};

export const refreshEnergy = (pet) => {
  const now = Date.now();

  // Если энергия полная, сбрасываем таймер и выходим
  if (pet.energy >= 8) {
    pet.energy = 8;
    pet.timeIncrement = null;
    apiRequset.updateMyPets(pet.id, "timeIncrement", null);
    return;
  }

  // Если время для пополнения еще не назначено — выходим
  if (!pet.timeIncrement) return;

  // Считаем сколько полных интервалов прошло
  if (now >= pet.timeIncrement) {
    const passedTime = now - pet.timeIncrement;
    const gainedEnergy = Math.floor(passedTime / pet.intervalIncrement) + 1;

    pet.energy = Math.min(8, pet.energy + gainedEnergy);

    // Устанавливаем время для СЛЕДУЮЩЕЙ единицы энергии
    if (pet.energy < 8) {
      const remainingMs = passedTime % pet.intervalIncrement;
      pet.timeIncrement = now + (pet.intervalIncrement - remainingMs);
    } else {
      pet.timeIncrement = null;
    }

    // Сохраняем и обновляем UI
    apiRequset.updateMyPets(pet.id, "energy", pet.energy);
    apiRequset.updateMyPets(pet.id, "timeIncrement", pet.timeIncrement);
    console.log(pet);
    reRenderStatistic("countEnergyPet", pet.energy);
  }
};

export const useEnergy = (pet) => {
  try {
    pet.energy--;
    apiRequset.updateMyPets(pet.id, "energy", pet.energy);
    // Ищем количество энергии
    reRenderStatistic("countEnergyPet", pet.energy);
    if (pet.timeIncrement === null) {
      apiRequset.updateMyPets(pet.id, "timeIncrement", Date.now() + pet.intervalIncrement);
      pet.timeIncrement = Date.now() + pet.intervalIncrement;
    }
    startEnergyTicker(pet, pet.intervalIncrement, 1);
  } catch {
    console.error("useEnergy");
  }
};

// Отдельный цикл, чтобы не плодить setTimeout
export const startEnergyTicker = (pet) => {
  if (pet.energy >= 8 || !pet.timeIncrement) return;

  const delay = pet.timeIncrement - Date.now();

  setTimeout(
    () => {
      refreshEnergy(pet);
      startEnergyTicker(pet); // Рекурсия только одна!
    },
    Math.max(0, delay),
  );
};

export const staticsBar = (pet) => {
  // Контейнер статистики
  const staticsContainer = createElement("div", "flx_bw");
  //   Контейнер энергии
  const energyContainer = createElement("div", "container_static");
  const energyIcon = createElement("img", "icon_statics", [{ attr: "src", value: iconEnargy }]);
  const energyCount = createElement("span", "icon_text", [
    { attr: "textContent", value: pet.energy },
    { attr: "id", value: "countEnergyPet" },
  ]);

  energyContainer.append(energyIcon, energyCount);
  staticsContainer.append(energyContainer);
  return staticsContainer;
};
