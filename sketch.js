let inputBox; // 用於填空題的文字框
let button; // 下一題按鈕
let result = ""; // 顯示結果的文字
let questionData; // 儲存從 CSV 讀取的題目資料
let currentQuestion = 0; // 當前題目的索引
let correctCount = 0; // 答對的題數
let incorrectCount = 0; // 答錯的題數

function preload() {
  // 載入 CSV 檔案
  questionData = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  // 產生一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);
  background("#bde0fe");

  // 建立文字框 (input)
  inputBox = createInput();
  inputBox.style('font-size', '20px');
  inputBox.position(width / 2 - 100, height / 2 - 50);

  // 建立下一題按鈕
  button = createButton('下一題');
  button.style('font-size', '20px');
  button.position(width / 2 - 50, height / 2 + 50);
  button.mousePressed(nextQuestion); // 按下按鈕時執行 nextQuestion 函數

  // 顯示第一題
  displayQuestion();
}

function draw() {
  // 清除背景並重新繪製結果文字
  background("#bde0fe");
  textSize(35);
  textAlign(CENTER, CENTER);
  fill(0);

  if (currentQuestion < questionData.getRowCount()) {
    // 顯示題目
    let question = questionData.getString(currentQuestion, 'question');
    text(question, width / 2, height / 2 - 100);
  } else {
    // 測驗結束，清除畫布並顯示結果
    background("#bde0fe"); // 清除畫布
    text(`答對題數：${correctCount}`, width / 2, height / 2 - 50);
    text(`答錯題數：${incorrectCount}`, width / 2, height / 2);
  }

  // 顯示結果
  text(result, width / 2, height / 2 + 150);
}

function displayQuestion() {
  // 清空文字框
  inputBox.value('');

  // 如果還有題目，顯示題目
  if (currentQuestion < questionData.getRowCount()) {
    let question = questionData.getString(currentQuestion, 'question');
    text(question, width / 2, height / 2 - 100);
  }
}

function nextQuestion() {
  if (currentQuestion < questionData.getRowCount()) {
    // 檢查輸入的答案
    let answer = inputBox.value().trim();
    let correctAnswer = questionData.getString(currentQuestion, 'answer');

    if (answer === correctAnswer) {
      result = "答對了！";
      correctCount++;
    } else {
      result = "答錯了！";
      incorrectCount++;
    }

    // 移動到下一題
    currentQuestion++;

    if (currentQuestion >= questionData.getRowCount()) {
      // 如果已經是最後一題，顯示測驗結束
      button.html('再試一次'); // 按鈕文字改為 "再試一次"
      button.mousePressed(restartQuiz); // 按下按鈕重新開始測驗
      inputBox.hide(); // 隱藏文字框
    } else {
      displayQuestion(); // 顯示下一題
    }
  }
}

function restartQuiz() {
  // 重置測驗狀態
  currentQuestion = 0;
  correctCount = 0;
  incorrectCount = 0;
  result = "";
  button.html('下一題'); // 按鈕文字改回 "下一題"
  button.mousePressed(nextQuestion); // 恢復按鈕功能
  inputBox.show(); // 顯示文字框
  displayQuestion(); // 顯示第一題
}

// 當視窗大小改變時，調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  inputBox.position(width / 2 - 100, height / 2 - 50);
  button.position(width / 2 - 50, height / 2 + 50);
}
