export default class Pet {
  constructor(name, dataSkin, baseSpeed, stepDistance, commands) {
    this.name = name; // Имя питомца
    this.dataSkin = dataSkin; // данные событий fakeApiPets.data
    // this.assets = assets; // Здесь хранятся загруженные спрайты PIXI.Assets
    this.coordinates = { x: window.innerWidth, y: window.innerHeight };
    this.commands = commands;
    this.currentStatus = dataSkin.find((e) => e.default); // Текущее состояние
    this.timeLeft = 0.2; // Остаток времени до смены события (в сек.)
    // Параметры для "живой" ходьбы
    this.distanceWalked = 5; // Пройденная дистанция для смены кадра
    this.currentSpeed = 0.1; // Текущая скорость (будет меняться)
    this.baseSpeed = baseSpeed; // Базовая скорость
    this.stepDistance = stepDistance; // растояние шага
    this.direction = -1; // Направление движение при ходьбе
    this.thisSpriteID = null; // Ссылка на спрайт PIXI
    this.view = null; // Ссылка на спрайт PIXI
    // ВАЖНО: Запускаем таймер для первого состояния сразу
    this.resetTimer();
  }

  // Метод для инициализации спрайта
  initView() {
    const texture = this.assets[this.currentStatus.event];
    this.view = new PIXI.Sprite(texture); // записываем  спрайт события
    this.view.anchor.set(0.5, 1); // Центр по горизонтали, низ по вертикали
    // КОРРЕКЦИЯ: теперь мы знаем ширину спрайта.
    this.coordinates.x = window.innerWidth - this.view.width / 2 - 15; // координаты при инициализации
    this.updatePosition();
    return this.view;
  }

  // Обновление координат
  updatePosition() {
    if (this.view) {
      this.view.x = this.coordinates.x;
      this.view.y = this.coordinates.y;
    }
  }

  // Выбираем, сколько будет проигрываться один спрайт
  resetTimer() {
    const { minTime, maxTime } = this.currentStatus;
    // Если это движение, задаем общее время прогулки от 2 до 10 сек
    // if (this.currentStatus.event.includes("move")) {
    // this.timeLeft = Math.random() * (10 - 2) + 2;
    // } else {
    this.timeLeft = Math.random() * (maxTime - minTime) + minTime;
    // }
  }

  // Метод, который вызывается в app.ticker (анимация)
  update(dt) {
    const deltaSec = dt / 60;
    this.timeLeft -= deltaSec;

    if (this.currentStatus.event.includes("move")) {
      // 1. Эффект инерции: скорость плавно стремится к базовой
      // Это убирает "автомобильную" жесткость
      this.currentSpeed += (this.baseSpeed - this.currentSpeed) * 0.1 * dt;

      // 2. Двигаем персонажа
      const moveStep = this.currentSpeed * dt * this.direction;
      this.coordinates.x += moveStep;
      this.distanceWalked += Math.abs(moveStep);

      // 3. Смена кадра по ДИСТАНЦИИ (как в жизни: шаг сделал — ногу сменил)
      if (this.distanceWalked >= this.stepDistance) {
        this.distanceWalked = 0;
        const nextEvent = this.currentStatus.event === "move_1" ? "move_2" : "move_1";
        this.view.texture = this.assets[nextEvent];
        this.currentStatus = this.dataSkin.find((s) => s.event === nextEvent);

        // 4. "Толчок": в момент смены кадра даем микро-ускорение
        this.currentSpeed += 1;
      }

      // 5. Границы экрана (с проверкой направления)
      const halfWidth = this.view.width / 2;
      if (this.coordinates.x < halfWidth && this.direction === -1) {
        this.direction = 1;
        this.currentSpeed = 0; // Остановка при развороте для реализма
      } else if (this.coordinates.x > window.innerWidth - halfWidth && this.direction === 1) {
        this.direction = -1;
        this.currentSpeed = 0;
      }

      this.view.scale.x = -this.direction;
      this.updatePosition();
    }

    if (this.timeLeft <= 0) {
      this.chooseNextEvent();
    }
  }

  // Рандомный выбор ид для следующего события
  chooseNextEvent() {
    const events = this.currentStatus.permittedEvents;
    const nextId = events[Math.floor(Math.random() * events.length)];
    this.setEvent(nextId);
  }

  // Главный метод смены анимации
  setEvent(id) {
    const newStatus = this.dataSkin.find((s) => s.id === id);
    this.currentStatus = newStatus;
    console.log(newStatus);
    this.view.texture = this.assets[newStatus.event];
    this.thisSpriteID = id;
    // Если это не движение — возвращаем нормальный масштаб
    if (!newStatus.event.includes("move")) {
      this.view.scale.x = 1;
    } else {
      this.walkTimer = 0; // Сразу меняем кадр при начале движения
    }
    this.resetTimer();
    console.log(`Новое состояние: ${newStatus.event} на ${this.timeLeft.toFixed(2)}с`);
  }
}
