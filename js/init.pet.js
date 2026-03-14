import { fakeApiPets } from "./service/dev_data/fake.pets.js";
import Pet from "./service/state/pet.js";

const petProfile = () => {};

// Получаем всех питомцев по апи
const getApiPets = async () => {
  return fakeApiPets;
};

// Получаем активного питомца
const getMyPets = async (id) => {
  const resPets = await getApiPets();
  const petID = resPets.find((p) => p.id === id);
  // Создаём питомца
  const myPet = new Pet("Зевс", petID.data, petID.parameters.baseSpeed, petID.parameters.stepDistance, petID.commands);
  return myPet;
};

const getPetsAssets = async (myPet) => {
  const events = myPet.dataSkin.map((e) => {
    return { alias: e.event, src: e.source };
  });
  const assetsPet = await PIXI.Assets.load(events);
  return assetsPet;
};
export const initPet = async () => {
  // активный питомец под ид - 0
  const myPet = await getMyPets(0);
  // Собираем все скины питомца
  const assetsPet = await getPetsAssets(myPet);

  // Сохраняем ассеты в экземпляр класса
  myPet.assets = assetsPet;

  // Инициализируем визуально
  myPet.initView();

  return myPet;
};
