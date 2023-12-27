// Класс задачки
class MathGame {
    constructor(question, button1, button2, button3, button4, button5) {
        // Вопрорс
        this.question = question;
        // Кнопки
        this.button1 = button1;
        this.button2 = button2;
        this.button3 = button3;
        this.button4 = button4;
        this.button5 = button5;
        // Переменная для хранения значения правильной кнопки
        this.correct_button = 0;
        // Переменные для хранения ответов
        this.correct_answers = 0;
        this.all_answers = 1;
        // Переменная для проверки работы
        this.is_play = true;
    }

    // Функция создания задачки и кнопок
    createTest() {
        if (this.is_play) {
            // Создание оператора
            let operation = ["+", "-", "*"][this.getRandom(0, 2)];
            
            // Облегчение задачки с минусом
            let firstNum, secondNum;
            if (operation == '-') {
                do {
                    // Создание двух чисел
                    firstNum = this.getRandom(1, 100);
                    secondNum = this.getRandom(1, 100);
                } while (firstNum < secondNum);
            } else {
                // Создание двух чисел
                firstNum = this.getRandom(1, 100);
                secondNum = this.getRandom(1, 100);
            }

            // Создание вопроса
            let quetion_text = `${firstNum} ${operation} ${secondNum}`;

            // Размещение вопроса
            this.question.innerHTML = `${quetion_text} = ?`;

            // Определение верной кнопки
            this.correct_button = [1, 2, 3, 4, 5][this.getRandom(0, 4)];

            // Создание списка для заполнения кнопак
            let list, activeButton;
            if (this.correct_button == 1) {
                list = [this.button2, this.button3, this.button4, this.button5];
                activeButton = this.button1;
            } else if (this.correct_button == 2) {
                list = [this.button1, this.button3, this.button4, this.button5];
                activeButton = this.button2;
            } else if (this.correct_button == 3) {
                list = [this.button1, this.button2, this.button4, this.button5];
                activeButton = this.button3;
            } else if (this.correct_button == 4) {
                list = [this.button1, this.button2, this.button3, this.button5];
                activeButton = this.button4;
            } else {
                list = [this.button1, this.button2, this.button3, this.button4];
                activeButton = this.button5;
            }

            activeButton.innerHTML = eval(quetion_text);

            // Функция для проверки наличия объекта в списке
            function contains(arr, elem) {
                for (var i = 0; i < arr.length; i++) { 
                    if (arr[i] === elem) { return true } 
                }
                return false;
            }
            // Заполнение кнопок
            let valueList = [eval(quetion_text)];
            for (let button of list) {
                let value;
                do { 
                    value = this.getRandom(eval(quetion_text)-50, eval(quetion_text)+50);
                } while ( 
                    value == eval(quetion_text) &&
                    contains(valueList, value)
                );
                valueList.push(value);
                button.innerHTML = value;
            }
        }
    }

    // Функция обработки на нажатие кнопки
    buttonPressed(button) {
        if (this.is_play) {
            // Обработка правельного ответа
            if (button == this.correct_button) {
                this.correct_answers += 1;
                console.log(`Correct! Your score is ${this.correct_answers}!`);
                this.showCorrectAnswer(true, button);
                this.addTime();
            // Обработка неправильного ответа
            } else {
                console.log(`Incorrect. Your score is ${this.correct_answers}.`);
                this.showCorrectAnswer(false, button);
            }
            this.all_answers += 1;
            // Пересоздание задачи
            this.createTest();
        }
    }

    // Функция показа правильного ответа
    showCorrectAnswer(value, button) {
        // Создание переменной с активной кнопкой
        let activeButton;

        // Поиск активной кнопки
        if (button == 1) { activeButton = this.button1 } 
        else if (button == 2) { activeButton = this.button2 } 
        else if (button == 3) { activeButton = this.button3 } 
        else if (button == 4) { activeButton = this.button4 } 
        else { activeButton = this.button5 } 

        // Обработка
        if (value == false) { activeButton.style.background = '#f00' } 
        else { activeButton.style.background = '#0f0' }

        // Окрашивание правильного ответа
        if (this.correct_button == 1) { 
            this.button1.style.background = '#0f0';
            setTimeout(() => {this.button1.style.background = '#eee' }, 500);
        } else if (this.correct_button == 2) { 
            this.button2.style.background = '#0f0';
            setTimeout(() => {this.button2.style.background = '#eee' }, 500);
        } else if (this.correct_button == 3) { 
            this.button3.style.background = '#0f0';
            setTimeout(() => {this.button3.style.background = '#eee' }, 500);
        } else if (this.correct_button == 4) { 
            this.button4.style.background = '#0f0';
            setTimeout(() => {this.button4.style.background = '#eee' }, 500);
        } else { 
            this.button5.style.background = '#0f0';
            setTimeout(() => {this.button5.style.background = '#eee' }, 500);
        }

        // Возвращение цвета кнопки через время
        setTimeout(() => { activeButton.style.background = '#eee' }, 500);
    }

    // Функция окончания игры
    endGame(reason) {
        // Уничтожение таймеров
        clearTimeout(endGameTimer);
        clearInterval(gameTimer);

        // Аккуратность в процентах
        let accuracy = Math.round(this.correct_answers * 100 / this.all_answers * 100) / 100;

        if (isNaN(accuracy)) { accuracy = 0 }

        // Отключение работы математической задачи
        this.is_play = false;

//         // Вывод результатов
//         if (reason == 'Time') {
//             alert(`Time is Out! \n Correct: ${this.correct_answers} \n All: ${this.all_answers} \n Accuracy: ${accuracy}%`);
//         } else {
//             alert(`Game is end! \n Correct: ${this.correct_answers} \n All: ${this.all_answers} \n Accuracy: ${accuracy}%`);
//         }

        // Оповещение 
        if (reason == 'Time') { alert("Время вышло!") } 

        // Изменение контейнера
        container.innerHTML = `
            <h2>Правильно: ${this.correct_answers} <br> Всего: ${this.all_answers} <br> Аккуратность: ${accuracy}%</h2>
            <button class="start-button">Начать!</button>
            <h4 class="authorship">Made by <span class="Shaertiar">Shaertiar</span> with support from <a href="https://algoritmika.org/ru" target="_blank">Algoritmika</a></h4>`

        // Пересоздания кнопки и ее обработчика
        startButton = document.querySelector('.start-button');
        startButton.onclick = function() { startButtonHandler() }

        // Возвращение времени
        timeToTest = 30;
    }

    // Функция добавления времени
    addTime() {
        timeToTest++;
        clearTimeout(endGameTimer);
        endGameTimer = setTimeout(() => { mathGame.endGame('Time') }, 1000*timeToTest);
        timeDisplay.innerHTML = `+ ${timeToTest} +`
    }

    // Функция получения случайного числа
    getRandom(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) }
}

// Получение нужных элементов
let container = document.querySelector('.container');
let startButton = document.querySelector('.start-button');
let timeToTest = 30;
let button1, button2, button3, button4, button5, endGameButton;
let mathGame
let endGameTimer, timeDisplay, gameTimer;

// Функция обработки нажатия на кнопку старта
function startButtonHandler() {
    // Оповещение о начале игры
    console.log('Game start!');

    // Изменение контейнера
    container.innerHTML = `
<button class="end-button">Закончить игру</button>
<h1 class="time">00</h1>
<div class="second-container">
    <h1 class="quest">Hello world!</h1>
    <div class="buttons">
        <button class="button-n1">I</button>
        <button class="button-n2">❤</button>
        <button class="button-n3">Y</button>
        <button class="button-n4">O</button>
        <button class="button-n5">U</button>
    </div>
</div>`;

    // Обновление кнопок
    button1 = document.querySelector('.button-n1');
    button2 = document.querySelector('.button-n2');
    button3 = document.querySelector('.button-n3');
    button4 = document.querySelector('.button-n4');
    button5 = document.querySelector('.button-n5');
    endGameButton = document.querySelector('.end-button')
    timeDisplay = document.querySelector('.time');

    // Обработка нажатий на кнопки
    button1.onclick = function() { mathGame.buttonPressed(1) }
    button2.onclick = function() { mathGame.buttonPressed(2) }
    button3.onclick = function() { mathGame.buttonPressed(3) }
    button4.onclick = function() { mathGame.buttonPressed(4) }
    button5.onclick = function() { mathGame.buttonPressed(5) }
    endGameButton.onclick = function() { mathGame.endGame('Button') }

    // Создание и запуск модели модели
    mathGame = new MathGame(
        document.querySelector('.quest'),
        button1, button2, button3, button4, button5
    );

    mathGame.createTest();

    // Запуск часов
    timeDisplay.innerHTML = timeToTest;
    gameTimer = setInterval(() => {
        timeToTest--;
        timeDisplay.innerHTML = timeToTest;
    }, 1000);

    endGameTimer = setTimeout(() => { mathGame.endGame('Time') }, 1000*timeToTest);
}

// Обработка нажатия на кнопку старта 
startButton.onclick = function() { startButtonHandler() }
