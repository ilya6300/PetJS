export const createControls = (pet) => {
  const gap = 25; // Отступ между элементами

  // Основной контейнер меню
  const container = new PIXI.Container();
  container.visible = false; // Скрыто по умолчанию
  container.x = window.innerWidth - 185;
  container.y = window.innerHeight - 500;
  container.width = 180;
  container.height = 250;
  const bgContainer = new PIXI.Graphics()
    .roundRect(0, 0, 180, 250, 8)
    .fill({ color: "#080808", alpha: 0.85 }) // Альфа теперь часть объекта или отдельный параметр
    .stroke({ width: 1, color: 0x000000 });
  container.addChild(bgContainer);
  // const bgRow = new PIXI.Graphics()
  //   .rect(window.innerWidth, 0, 250, 150)
  //   .fill({ color: "#c0ced3d9", alpha: 1 }) // Добавим заливку, чтобы по нему было легче попасть
  //   .stroke({ width: 1, color: 0x000000 });
  // Контайнер для команд и прочих задач
  const containerMain = new PIXI.Container();
  containerMain.x = 10;
  containerMain.y = 40;
  // Логотип (имя) приложения в меню
  const logo = new PIXI.Text({ text: "My pet JS", style: { fontSize: 16, fill: "#FFFFFF" } });
  logo.y = 10;
  logo.x = bgContainer.width / 2 - logo.width / 2;

  // Кнопка закрытия
  const btnClosed = new PIXI.Text({ text: "Закрыть", style: { fontSize: 16, fill: "#FFFFFF" } });
  btnClosed.x = bgContainer.width / 2 - logo.width / 2;
  btnClosed.y = container.height - 30;
  // Делаем текст интерактивным
  btnClosed.eventMode = "static";
  btnClosed.cursor = "pointer";
  btnClosed.on("pointerdown", () => {
    container.visible = false;
    comandContainer.visible = false;
    visibleComands.visible = true;
    btnHome.visible = false;
  });

  // Кнопка открытия команд
  const visibleComands = new PIXI.Text({ text: "Команды", style: { fontSize: 16, fill: "#FFFFFF" } });
  // Делаем текст интерактивным
  visibleComands.eventMode = "static";
  visibleComands.cursor = "pointer";
  // 1. Событие: Мышь наведена (Hover)
  visibleComands.on("pointerover", () => {
    visibleComands.style.fill = "#FFD700"; // Меняем на золотой (или любой другой)
  });

  // 2. Событие: Мышь ушла (Blur)
  visibleComands.on("pointerout", () => {
    visibleComands.style.fill = "#FFFFFF"; // Возвращаем исходный белый
  });

  // Кнопка в начало
  const btnHome = new PIXI.Text({ text: "Назад", style: { fontSize: 16, fill: "#FFFFFF" } });
  btnHome.visible = false;
  btnHome.x = bgContainer.width / 2 - logo.width / 2;
  btnHome.y = container.height - 55;
  // Делаем текст интерактивным
  btnHome.eventMode = "static";
  btnHome.cursor = "pointer";
  btnHome.on("pointerdown", () => {
    container.visible = true;
    comandContainer.visible = false;
    visibleComands.visible = true;
    btnHome.visible = false;
  });

  // Команды питомца
  const comandContainer = new PIXI.Container();
  comandContainer.visible = false; // Скрыто по умолчанию
  visibleComands.on("pointerdown", () => {
    visibleComands.visible = false;
    comandContainer.visible = true;
    btnHome.visible = true;
  });
  containerMain.addChild(visibleComands, comandContainer);
  container.addChild(logo, containerMain, btnClosed, btnHome);
  // Создаём команды из массива команд питомца
  pet.commands.forEach((c, index) => {
    const command = new PIXI.Container();
    const textName = new PIXI.Text({ text: c.name, style: { fontSize: 16, fill: "#FFFFFF" } });
    const textRate = new PIXI.Text({ text: `${c.successRate}%`, style: { fontSize: 16, fill: "#FFFFFF" } });

    textRate.anchor.x = -1;
    textRate.x = container.width / 2;
    command.addChild(textName, textRate);
    // Делаем текст интерактивным
    command.eventMode = "static";
    command.cursor = "pointer";
    // command.width = 100;
    // command.height = 100;
    command.y = index * gap;
    // 1. Событие: Мышь наведена (Hover)
    command.on("pointerover", () => {
      textName.style.fill = "#FFD700"; // Меняем на золотой (или любой другой)
    });

    // 2. Событие: Мышь ушла (Blur)
    command.on("pointerout", () => {
      textName.style.fill = "#FFFFFF"; // Возвращаем исходный белый
    });
    // ВАЖНО: Используем анонимную функцию, чтобы вызвать метод у переданного питомца
    command.on("pointerdown", () => {
      const successRate = Math.random() * (100 - 1) + 1;
      console.log("Команда:", c.name, successRate, c.successRate);
      if (successRate > c.successRate) return;
      if (c.successRate < 100) {
        c.successRate += 1;
        // ОБНОВЛЯЕМ ТЕКСТ ВИЗУАЛЬНО
        textRate.text = `${c.successRate}%`;
      }

      pet.setEvent(c.id); // ID для 'sid'
    });
    comandContainer.addChild(command);
  });

  return { view: container };
};
