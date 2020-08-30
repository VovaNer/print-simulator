"use strict";

const printerPreview = document.querySelector('.preview'),
  printerProcess = document.querySelector('.process'),
  printerCrash = document.querySelector('.crash'),
  paintBar = document.querySelector('.printer__bar-inner'),
  buttons = document.querySelectorAll('.btn');

let timerId;
let btnTogglerId;
let broken = false;

buttons[2].disabled = true;

function printToggle() {
  if (printerPreview.classList.contains('show')) {
    printerPreview.classList.remove('show');
    printerPreview.classList.add('hide');
    printerProcess.classList.remove('hide');
    printerProcess.classList.add('show');
    buttons[0].disabled = true;
    timerId = setTimeout(printToggle, 7000);
  } else {
    printerPreview.classList.remove('hide');
    printerPreview.classList.add('show');
    printerProcess.classList.remove('show');
    printerProcess.classList.add('hide');
    buttons[0].disabled = false;
  }
}

function printProcess() {
  breakChance();
  if (!broken) {
    if (parseInt(paintBar.style.height, 10) > 40) {
      printToggle();
      paintBar.style.height = parseInt(paintBar.style.height, 10) - 20 + "px";
    } else {
      buttons[0].disabled = true;
      alert("Low level of paint!");
    }
  } else {
    printerPreview.classList.remove('show');
    printerPreview.classList.add('hide');
    printerCrash.classList.remove('hide');
    printerCrash.classList.add('show');
    buttons[0].disabled = true;
    alert("Printer is broken, please repair it!");
  }
}

function printerRefill() {
  if (parseInt(paintBar.style.height, 10) < 300) {
    paintBar.style.height = parseInt(paintBar.style.height, 10) + 20 + "px";
    buttons[0].disabled = false;
  } else {
    alert("Paint is refilled!");
  }
}

function breakChance() {
  if (Math.floor(Math.random() * 10) >= 7) {
    broken = true;
    buttons[2].disabled = false;
  }
}

function printerRepair() {
  if (broken) {
    broken = false;
    buttons[0].disabled = false;
    buttons[2].disabled = true;
    printerCrash.classList.remove('show');
    printerCrash.classList.add('hide');
    printerPreview.classList.remove('hide');
    printerPreview.classList.add('show');
  }
}

buttons[0].addEventListener('click', printProcess);
buttons[1].addEventListener('click', printerRefill);
buttons[2].addEventListener('click', printerRepair);