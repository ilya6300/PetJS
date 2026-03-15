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

export const viewControl = (x) => {
  // Основной контейнер меню
  const createController = createElement("div", "controllerContainer hidden");
  createController.style.left = `${x - 30}px`;
  document.body.appendChild(createController);

  // логотип
  const createLogo = createElement("p", "myPetsLogo__", [{ attr: "textContent", value: "Мой асисстент" }]);

  const mainAndHeader__ = createElement("div", "mainAndHeader__");

  // Кнопка закрыть
  const createBtnClosed = createElement("span", "controllerBtn", [{ attr: "textContent", value: "Закрыть" }]);
  createBtnClosed.onclick = () => {
    createController.classList.add("hidden");
  };
  mainAndHeader__.append(createLogo);
  createController.append(mainAndHeader__, createBtnClosed);
  return createController;
};
