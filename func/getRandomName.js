export const getRandomName = () => {
  var randomNames = [
    "Звездёныши",
    "Столешки",
    "Найденыши",
    "Памперсы",
    "Йогурты",
    "Цикады",
    "Ужаленые",
    "Куропатки",
    "Ездуны",
    "Несквики",
    "Гномыши",
    "Засланцы",
    "Хомякичи",
    "Фермеры",
    "Воблеры",
    "Армяне",
    "Пилюли",
    "Ранетки",
    "Отбитые",
    "Лешие",
    "Душнилы",
    "Жандармы",
    "Электроники",
    "Ястребы",
    "Чукчи",
    "Семки",
    "Млекопитающие",
    "Интегралы",
    "Тепловизоры",
    "Бульдозеры",
    "Юнцы",
  ];
  var max = randomNames.length;
  var rand = Math.floor(Math.random() * max);
  return randomNames[rand];
};
