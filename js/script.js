let btnPayment = document.getElementById('start'), // 1
	incomeTotal = document.getElementsByClassName('budget-value')[0], // 2
	budgetDay = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
	savingMonth = document.getElementsByClassName('monthsavings-value')[0],
	savingYear = document.getElementsByClassName('yearsavings-value')[0];

let expensesItem = document.getElementsByClassName('expenses-item'); // 3

let btnExpensesItem = document.getElementsByTagName('button')[0], // 4
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
	calculate = document.getElementsByTagName('button')[2],
	allBtn = document.querySelectorAll('button');

let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('#income'),
	checkSaving = document.querySelector('#savings'),
	sumValue = document.querySelector('#sum'),
	percentValue = document.querySelector('#percent'),
	inputYear = document.querySelector('.year-value'),
	inputMonth = document.querySelector('.month-value'),
	inputDay = document.querySelector('.day-value');

let money, time;

for (let i = 0; i < allBtn.length; i++) {
	allBtn[i].disabled = true;
	allBtn[allBtn.length - 1].disabled = false;
}

btnPayment.addEventListener('click', function () {
	time = prompt('Введите дату в формате YYYY-MM-DD', '');
	money = +prompt('Ваш бюджет на месяц?', '');

	while (isNaN(money) || money == '' || money == null) {
		money = +prompt('Ваш бюджет?', '');
	}
	appData.budget = money;
	appData.timeData = time;
	incomeTotal.textContent = money.toFixed();
	inputYear.value = new Date(Date.parse(time)).getFullYear();
	inputMonth.value = new Date(Date.parse(time)).getMonth() + 1;
	inputDay.value = new Date(Date.parse(time)).getDate();
	allBtn.forEach(function (item) {
		item.disabled = false;
	});
});

btnExpensesItem.addEventListener('click', function () {
	let sum = 0;

	for (let i = 0; i < expensesItem.length; i++) {
		let a = expensesItem[i].value,
			b = expensesItem[++i].value;

		if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null
			&& a != '' && b != '' && a.length < 50) {
			appData.expenses[a] = b;
			sum += +b;
		} else {
			i--;
		}
	}
	expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function () {
	for (let i = 0; i < optionalExpensesItem.length; i++) {
		let opt = optionalExpensesItem[i].value;
		if (typeof (opt) === 'string' && opt != '' &&
			opt != null && opt.length < 40) {
			appData.optionalExpenses[i] = opt;
			optionalExpensesValue.textContent += opt + ' ';
		} else {
			i--;
		}
	}
});

calculate.addEventListener('click', function () {
	if (appData.budget) {
		appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
		budgetDay.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
			levelValue.textContent = 'Минимальный уровень достатка';
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = 'Средний уровень достатка';
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = 'Высокий уровень достатка';
		}
	} else {
		budgetDay.textContent = 'Ошибка';
		levelValue.textContent = 'Ошибка';
	}
});

incomeItem.addEventListener('input', function () {
	let items = incomeItem.value;
	appData.income = items.split(',');
	incomeValue.textContent = items;
});

checkSaving.addEventListener('click', function () {
	if (appData.saving == false) {
		appData.saving = true;
	} else {
		appData.saving = false;
	}
});


sumValue.addEventListener('input', function () {
	if (appData.saving == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value,
			monthSum = appData.monthIncome = sum / 100 / 12 * percent,
			yearSum = appData.yearIncome = sum / 100 * percent;
		savingMonth.textContent = monthSum.toFixed(1);
		savingYear.textContent = yearSum.toFixed(1);

	}
});

percentValue.addEventListener('input', function () {
	if (appData.saving == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value,
			monthSum = appData.monthIncome = sum / 100 / 12 * percent,
			yearSum = appData.yearIncome = sum / 100 * percent;
		savingMonth.textContent = monthSum.toFixed(1);
		savingYear.textContent = yearSum.toFixed(1);
	}
});


let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	saving: false
};







