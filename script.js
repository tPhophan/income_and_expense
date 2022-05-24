const balance = document.querySelector("#balance");
const money_income = document.querySelector("#money-income");
const money_expense = document.querySelector("#money-expense");

const frm = document.querySelector("#frm");
const txt = document.querySelector("#text");
const amount = document.querySelector("#amount");

const ls = document.querySelector("#list");

const dataTransection = [
    {id:1, text:"ค่าขนม", amount:-100},
    {id:2, text:"เงินเดือน", amount:+15000},
    {id:3, text:"ค่าเช่าห้องพัก", amount:-4000}
];
//------------------------------------------------------------------

const transection = dataTransection;
//console.log(transection);

//นาทีที่ 1.12.36