const balance = document.getElementById("yourBal");
const income = document.getElementById("Income");
const expense = document.getElementById("Expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("intext");
const amount = document.getElementById("inamo");


const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transactions=localStorage.getItem('transactions')!== null?localStorageTransactions:[];

function addTransaction(e){
    e.preventDefault();

    if(text.value.trim()==='' || amount.value.trim()===''){
        alert("Please add a text and amount");
    }else{
        const transaction={
            id:idGenerate(),
            text:text.value,
            amount:+amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        text.value='';
        amount.value='';
    }
}

function idGenerate(){
    const id=Math.floor(Math.random()*1000000);
    return id;
}

function addTransactionDOM(transaction){
    const sign=transaction.amount<0 ?'-':'+';
    const item=document.createElement("li");

    item.classList.add(transaction.amount<0 ? 'minus' :'plus');
    item.innerHTML=`${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn"onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);
}

function updateValues(){
    const amoun=transactions.map(transaction=>transaction.amount);//give an array of all transaction values

    const total=amoun.reduce((acc,item)=>(acc+=item),0).toFixed(2);//0 is initial value of acc

    const incom=amoun.filter(item=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);//give sum for all positive transactions

    const expens=amoun.filter(item=>item<0).reduce((acc,item)=>(acc+=item),0).toFixed(2);

    balance.innerText=`$${total}`;
    income.innerText=`$${incom}`;
    expense.innerText=`$${expens}`;
}

function removeTransaction(id){
    transactions=transactions.filter(transaction=>transaction.id!==id);

    updateLocalStorage();

    init();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init(){
    list.innerHTML='';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);