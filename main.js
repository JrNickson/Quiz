const questions = [
  {
    question: "Какой национальный цветок Японии?",
    answers: ["Ромашка", "Сакура", "Подорожник", "Тюльпан"],
    correct: 2,
  },
  {
    question: "Сколько полос на флаге США?",
    answers: ["13", "20", "7", "15"],
    correct: 1,
  },
  {
    question: "Когда открыли лондонское метро?",
    answers: ["1863", "1905", "2000", "1855"],
    correct: 1,
  },
  {
    question: "Какое животное можно увидеть на логотипе Porsche?",
    answers: ["Крот", "Лошадь", "Жаба", "Лемур"],
    correct: 2,
  },
  {
    question: "Сколько клавиш у классического пианино?",
    answers: ["100", "93", "88", "112"],
    correct: 3,
  },
  {
    question: "Какая кошка самая большая на планете?",
    answers: ["Лев", "Домашний кот", "Гепард", "Тигр"],
    correct: 4,
  },
  {
    question: "Какая звезда ближе всего к Земле?",
    answers: ["Полярная звезда", "Сириус", "Солнце", "Андромеда"],
    correct: 3,
  },
  {
    question: "Какие деревья растут из желудей?",
    answers: ["Дуб", "Клен", "Гикори", "Грецкий орех"],
    correct: 1,
  },
  {
    question: "Сколько цветов в радуге?",
    answers: ["10", "7", "6", "8"],
    correct: 2,
  },
  {
    question: "Какой корабль затонул в 1912 году?",
    answers: ["Мэйфлауэр", "Аризона", "Черная жемчужина", "Титаник"],
    correct: 4,
  },
];

// Находим элементы HTML разметки
const quizHeader = document.querySelector(".quiz-header");
const quizList = document.querySelector(".quiz-list");
const quizBtn = document.querySelector(".quiz-button");

// Переменные игры
let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

// Запуск функций
claerPage();
showQuestion();
// Запуск функции по кнопке
quizBtn.onclick = checkAnswear;

// Очищаем HTML разметку
function claerPage() {
  quizHeader.innerHTML = "";
  quizList.innerHTML = "";
}

// Запуск вопроса и ответов
function showQuestion() {
  //Замена Title в Header
  const headerTepmlate = `<h2 class="quiz-header__title">%title%</h2>`;
  const title = headerTepmlate.replace("%title%", questions[questionIndex]["question"]);

  quizHeader.innerHTML = title;

  // Варианты ответов цикл для преборки
  for ([index, answerText] of questions[questionIndex]["answers"].entries()) {
    // Шаблонная разметка для вопроса
    const questionTemplate = `
    <li class="quiz-list__item">
        <label for="">
            <input value="%number%" type="radio" name="answer" />
            <span>%answer%</span>
        </label>
    </li>`;

    const answearHTML = questionTemplate.replace("%answer%", answerText).replace("%number%", index + 1);

    quizList.innerHTML += answearHTML;
  }
}

function checkAnswear() {
  // Выбор отмеченной радиокнопки
  const checkedRadio = quizList.querySelector('input[type="radio"]:checked');

  // Если ответ не выбран ничего не делаем, и выходим из функции
  if (!checkedRadio) {
    quizBtn.blur();
    // alert("Выбери ответ");
    return;
  }

  const userAnswear = parseInt(checkedRadio.value);

  //   Если ответил верно - увеличиваем счет
  if (userAnswear === questions[questionIndex]["correct"]) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    claerPage();
    showQuestion();
    return;
  } else {
    claerPage();
    quizList.remove();
    showResults();
  }
}

// Функция для показа результатов
function showResults() {
  const resultsTemplate = `
  <h2 class="quiz-header__title">%title%</h2>
  <h3 class="quiz-header__summary">%message%</h3>
  <p class="quiz-header__result">%result%</p>`;

  let title, message;

  if (score === questions.length) {
    title = "Поздравляем! 🎊";
    message = "Вы ответили верно на все вопросы😎";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Неплохой результат! 🤘🏽";
    message = "Вы дали более половины правильных ответов 😉";
  } else {
    title = "Стоит постараться 😒";
    message = "Пока Ваш результат оставляет желать лучшего 👒";
  }

  // Результат
  let result = `${score} из ${questions.length}`;

  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);

  quizHeader.innerHTML = finalMessage;

  // Меняем кнопку на играть снова
  quizBtn.blur();
  quizBtn.innerText = "Начать заново";
  quizBtn.onclick = () => history.go();
}
