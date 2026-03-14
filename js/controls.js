export const createControls = (pet) => {
  // Принимаем живой объект питомца
  const container = new PIXI.Container();
  const gap = 20; // Отступ между элементами
  // Фон
  const bg = new PIXI.Graphics()
    .rect(0, 0, 250, 150)
    .fill({ color: 0xffffff, alpha: 0.5 }) // Добавим заливку, чтобы по нему было легче попасть
    .stroke({ width: 1, color: 0x000000 });

  pet.commands.map((c, index) => {
    const command = new PIXI.Text({ text: c.name, style: { fontSize: 16 } });
    // Делаем текст интерактивным
    command.eventMode = "static";
    command.cursor = "pointer";
    // command.width = 100;
    // command.height = 100;
    command.y = index * gap;
    // ВАЖНО: Используем анонимную функцию, чтобы вызвать метод у переданного питомца
    command.on("pointerdown", () => {
      console.log("Команда:", c.name);
      pet.setEvent(c.id); // ID для 'sid'
    });
    container.addChild(command);
  });

  // const commandSid = new PIXI.Text({ text: "Сидеть!", style: { fontSize: 24 } });

  // // Делаем текст интерактивным
  // commandSid.eventMode = "static";
  // commandSid.cursor = "pointer";

  // // ВАЖНО: Используем анонимную функцию, чтобы вызвать метод у переданного питомца
  // commandSid.on("pointerdown", () => {
  //   console.log("Команда: Сидеть!");
  //   pet.setEvent(1); // ID для 'sid'
  // });

  container.addChild(bg);
  return { view: container };
};
