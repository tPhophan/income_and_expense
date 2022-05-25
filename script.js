const balance = document.querySelector("#balance");
const money_income = document.querySelector("#money-income");
const money_expense = document.querySelector("#money-expense");

const frm = document.querySelector("#frm");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");

const ls = document.querySelector("#list");

const nb_Format = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2
});

//------------------------------------------------------------------

let transections = [];

fetch("log.json").then(res => {return res.json();}).then(data => {
    transections = data.transection
    init();
});

function init(){
    list.innerHTML = "";
    transections.forEach(ft_addDataToList);
    cal_Money();
}

function ft_addDataToList(transections){
    const txt = transections.text;
    const symbol = transections.amount < 0 ?"-":"+";
    const amount = Math.abs(transections.amount);

    const li = document.createElement("li");
    li.innerHTML = `${txt} <span>${symbol}${nb_Format.format(amount)}</span><button class="btn-del" onclick="ft_delTransection(${transections.id})">x</button>`
    symbol == "+" ?li.classList.add("income") :li.classList.add("expense");
    ls.appendChild(li);
}

function cal_Money(){
    const amounts = transections.map(transections => transections.amount);

    const total = amounts.reduce((result, item)=>(result += item),0).toFixed(2);
    balance.innerText = `฿${nb_Format.format(total)}`;

    const income = amounts.filter(item=>item>0).reduce((result, item)=>(result+=item),0).toFixed(2);
    money_income.innerText = `฿${nb_Format.format(income)}`

    const expense = ((amounts.filter(item=>item<0).reduce((result, item)=>(result+=item),0))*-1).toFixed(2);
    money_expense.innerText = `฿${nb_Format.format(expense)}`
}

function ft_genID(){
    return Math.floor(Math.random() * (10**6));
}

function ft_addTransaction(e){
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === ""){
        alert("กรุณากรอกข้อมูลให้ครบ");
    }
    else{
        const data={
            id: ft_genID(),
            text: text.value,
            amount: +amount.value
        };
        transections.unshift(data);
        init();
        text.value ="";
        amount.value = "";
        alert("บันทึกเรียบร้อย");
    }
}

function ft_delTransection(id){
    if (confirm("Delete This Transection")){
        transections = transections.filter(transections=>transections.id !== id);
        init();
        alert("Deleted.");
    }
}

frm.addEventListener("submit", ft_addTransaction);