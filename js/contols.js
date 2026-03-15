const createElement = (tag, classes, parameters) => {
  // тэг html разметки, classes классы в строку 'hidden seper_class', parameters - массив атрибутов и значений [{attr: textContent, value: 'Команда!'}]
  const _tag = document.createElement(tag);
  if (classes && classes !== "") {
    _tag.classList.add(...classes.split(" "));
  }

  if (parameters) {
    parameters.forEach((p) => {
      console.log(p);
      _tag[p.attr] = p.value;
    });
  }
  return _tag;
};

export const viewControl = (pet) => {
  // Основной контейнер меню
  const createController = createElement("div", "controllerContainer hidden");
  createController.style.left = `${pet.coordinates.x - 30}px`;
  document.body.appendChild(createController);

  // логотип
  const createLogo = createElement("p", "myPetsLogo__", [{ attr: "textContent", value: "Мой асисстент" }]);

  // Контейнер с подменю и логотипом
  const mainAndHeader__ = createElement("div", "mainAndHeader__");

  // Список подменю
  const main = createElement("div", "mainAndHeader__");
  const visibleComands = () => {
    main.classList.add("hidden");
    comandsContainer.classList.remove("hidden");
    createBtnHome.classList.remove("hidden");
  };

  // Список интерактивных кновок у подменю
  const listMainSubMenu = [{ name: "Команды", func: visibleComands }];
  listMainSubMenu.forEach((btn) => {
    const createBtn = createElement("span", "controllerBtnLeft", [{ attr: "textContent", value: btn.name }]);
    createBtn.addEventListener("click", btn.func);
    main.append(createBtn);
  });

  // Контейнер с командами
  const comandsContainer = createElement("div", "mainAndHeader__ hidden");

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
      if (successRate > c.successRate) return;
      if (c.successRate < 100) {
        c.successRate += 1;
        // ОБНОВЛЯЕМ ТЕКСТ ВИЗУАЛЬНО
        rate.textContent = `${c.successRate}%`;
      }
      pet.setEvent(c.id); // ID для 'sid'
    };
  });

  const closedContainer = createElement("div", "mainAndHeader__");
  // Кнопка закрыть
  const createBtnClosed = createElement("span", "controllerBtn", [{ attr: "textContent", value: "Закрыть" }]);
  createBtnClosed.onclick = () => {
    goHomeMenu___();
    createController.classList.add("hidden");
  };

  // Кнопка домой, возвращает на начальный экран меню
  const createBtnHome = createElement("span", "controllerBtn hidden", [{ attr: "textContent", value: "Назад" }]);
  createBtnHome.onclick = () => {
    goHomeMenu___();
  };

  const goHomeMenu___ = () => {
    main.classList.remove("hidden");
    createBtnHome.classList.add("hidden");
    comandsContainer.classList.add("hidden");
  };

  // Вкладываем все вложения
  mainAndHeader__.append(createLogo, comandsContainer, main);
  closedContainer.append(createBtnHome, createBtnClosed);
  createController.append(mainAndHeader__, closedContainer);
  return createController;
};
