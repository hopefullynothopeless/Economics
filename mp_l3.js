function Project(sys_type, complexity, prog_lang, time, sizing, tables, relations, attributes, func_points, env_modifier, employee_salary, loc){
	this.sys_type = sys_type;
	this.complexity = complexity;
	this.prog_lang = prog_lang;
	this.time = time;
	this.sizing = sizing;
	this.tables = tables;
	this.relations = relations;
	this.attributes = attributes;
	this.func_points = func_points;
	this.env_modifier = env_modifier;
	this.employee_salary = employee_salary;
	this.loc = loc;
	this.getP=function(complexity, sys_type){
		if (this.sys_type ==="IRS" && this.complexity === "simple"){
			return 220;
		}
		if (this.sys_type ==="IRS" && this.complexity === "complex"){
			return 160;
		}
		if (this.sys_type ==="COM" && this.complexity === "simple"){
			return 140;
		}
        if (this.sys_type ==="COM" && this.complexity === "complex"){
			return 80;
		}		
	}
	this.getT=function(){
		return this.sizing / P;
	}
	this.getZ=function(){
		return T / this.time;
	}
	this.getR=function(){
		return 2 * this.tables * 5 * this.relations * 10 * this.attributes;
	}
	this.getQ=function(){
		if (R < 90000){
			return 0.00566;
		}
		if (200000 > R && R >= 90000){
			return 0.00808;
		}
		if (500000 > R && R >= 200000){
			return 0.01537;
		}
	}
	this.getT1=function(){
		return 0.01 * R * Q;
	}
	this.getZ1=function(){
		return T1 / this.time;
	}
	this.getW=function(){
		return 0.65 + 0.01 * this.env_modifier;
	}
	this.getRf=function(){
		return W * this.func_points;
	}
	this.getRloc=function(){
		return Rf * this.loc;
	}
	this.getT2=function(){
		if (this.sys_type ==="IRS"){
			return 3 * Math.pow(Rloc/1000 , 1.12) / 12;
		}
		if (this.sys_type ==="COM"){
			return 3.6 * Math.pow(Rloc/1000, 1.2) / 12;
		}
		if (this.sys_type ==="APP"){
			return 2.4 * Math.pow(Rloc/1000, 1.05) / 12;
		}
	}
	this.getZ2=function(){
		return T2 / this.time;
	}
	this.getTime=function(){
		return this.time;
	}
	this.getSalary=function(){
		return this.employee_salary;
	}
}

var project1 = new Project("IRS", "simple", "Basic", 6, 5000, 11, 12, 14, 1300, 40, 19000, 38);
console.log("Данные методом экспертных оценок:");
P = project1.getP();
T = project1.getT();
Z = project1.getZ();
console.log("Норматив производительности труда " + P.toFixed(2));
console.log("Трудозатраты на разработку " + T.toFixed(2));
console.log("Средняя численность персонала " + Math.floor(Z));
console.log();

console.log("Данные на основе размеренности базы данных:");
R = project1.getR();
Q = project1.getQ();
T1 = project1.getT1();
Z1 = project1.getZ1();

console.log("Размеренность базы данных " + R.toFixed(2))
console.log("Норматив трудоемкости " + Q);
console.log("Трудозатраты на разработку " + T1.toFixed(2));
console.log("Средняя численность персонала " + Math.floor(Z1));
console.log();

console.log("Данные на основе решения методом функциональных точек:");
W = project1.getW();
Rf = project1.getRf();
Rloc = project1.getRloc();
T2 = project1.getT2();
Z2 = project1.getZ2();

console.log("Влияние факторов среды " + W.toFixed(2));
console.log("Уточненное количество функциональных точек " + Rf.toFixed(2));
console.log("Размеренность ПО для заданного языка программирования " + Rloc.toFixed(2));
console.log("Трудозатраты на разработку(COCOMO) " + T2.toFixed(2));
console.log("Средняя численность сотрудников " + Math.floor(Z2));
console.log();

function getMinResults(T1, T2, T3, Z1, Z2, Z3){
	let arr = new Array();
	if (T1 < T2){
		if(T1 < T3){
			arr.push(T1.toFixed(2));
		}
	}
	if (T2 < T1){
		if(T2 < T3){
			arr.push(T2.toFixed(2));
		}
	}
	if (T3 < T1){
	 	if (T3 < T2){
			arr.push(T3.toFixed(2));
		}
	}
	if (Z1 < Z2){
		if(Z1 < Z3){
			arr.push(Math.floor(Z1));
		}
	}
	if (Z2 < Z1){
		if(Z2 < Z3){
			arr.push(Math.floor(Z2));
		}
	}
	if (Z3 < Z1){
	 	if (Z3 < Z2){
			arr.push(Math.floor(Z3));
		}
	}
	time = project1.getTime();
	arr.push(time);
	console.log("Итог:");
	for (let i = 0;i < arr.length;i++){
		switch(i){
			case 0:
			    console.log("Минимальное количество человеко-месяцев: " + arr[i]);
				break;
			case 1:
			    console.log("Минимальное среднее число сотрудников: " + arr[i]);
				break
			case 2:
			    console.log("Выделенное на разработку время в месяцах: " + arr[i]);
				break;
			default:
			    console.log();
				break;
		}
	}
	console.log();
	return arr;
}

function calcMonthsForPeriods(){
	let D = new Array();
	for (let i = 0;i < beta.length;i++){
		D.push((beta[i]/100 * minValues[2]).toFixed(2));
	}
	return D;
}

function calcOptimalEmployeeNumbers(){
	employee_labor = minValues[0];
	employees = minValues[1];
	months = minValues[2];
	let Z = new Array();
	let D = new Array();
	console.log("Этапы жизненного цикла:")
	for (let i = 0; i < alpha.length;i++){
		let value = (alpha[i] * employee_labor) / (beta[i] * months);
		Z.push(Math.floor(value));
		let value1 = beta[i]/100 * months;
		D.push(value1.toFixed(2));
		console.log(Z[i] + "   " + D[i] + "   ---> " +steps[i] + "(Чел./Месяцев)");
	}
	console.log();
	return Z;
}

function lifecycleEmployeeDistribution(){
	let distrib_matrix = [['', '', ''],['', '', ''],['', '', ''],['', '', '']];
	let value = 0;
	for (let i = 0; i < employee_percentage_matrix.length;i++){
		for (let j = 0; j < employee_percentage_matrix[i].length;j++){
			value = employee_percentage_matrix[i][j] / 100 * employee_numbers[i];
			distrib_matrix[i][j]=Math.ceil(value);
		}
	}
	console.log("Распределение персонала по периодам:");
	for (let i = 0;i < steps.length;i++){
		console.log(steps[i] + " (Программисты, Аналитики, IT-Специалисты) ----> " + distrib_matrix[i]);
	}
	console.log();
	return distrib_matrix;
}

function calculateSalaries(salary){
	let developer_salary = salary;
	let analyst_salary = developer_salary * 1.3;
	let itExpert_salary = developer_salary * 0.7;
	let profession_salaries = [];
	profession_salaries.push(developer_salary, analyst_salary, itExpert_salary);
	let salary_matrix = [['','',''],['','',''],['','',''],['','','']];
	let value = 0;
	let period_salaries = [];
	for (let i = 0;i < employee_matrix.length;i++){
		let period_sum = 0;
		for (let j = 0;j < employee_matrix[i].length;j++){
			 value = employee_matrix[i][j] * period_months[i] * profession_salaries[j];
			 salary_matrix[i][j] = Math.floor(value);
			 period_sum += value;
		}
		period_salaries.push(period_sum);
		console.log("Фонд зарплаты специалистов для реализации этапа \"" + steps[i] + "\"" + " равна " + period_sum);
	}
	let sum = 0;
	period_salaries.forEach((item, index, array) => {
		sum += item;
	});
	console.log("Общий фонд заработной платы по всем этапам составит: " + sum);
	console.log();
	salary_matrix.unshift(['Программисты','Аналитики','IT-специалисты'])
	for (let i = 0;i < salary_matrix.length;i++){
		console.log(salary_matrix[i]);
	}
	return sum;
}

function countOperatorSalary(){
	let N0 = 0.0095;
	let t = project1.getTime() / 2;
	let Z = t * N0;
	let S = Z * t * project1.getSalary() * 0.85;
	console.log();
	console.log("Фонд ЗП сотрудников, привлекаемых к опытной эксплуатации: " + S.toFixed(2));
	return S.toFixed(2);
}

const minValues = getMinResults(T, T1, T2, Z, Z1, Z2);
const alpha = new Array(10, 22, 40.5, 27.5);
const beta = new Array(10, 30, 35, 25);
const employee_type = ["Analysts", "Developers", "IT-experts"];
const employee_percentage_matrix = [[20, 40, 40], [35, 35, 30], [65, 10, 25], [60, 15, 25]];
const steps = new Array("Анализ предметной области и разработка требований", "Проэктирование", "Программирование", "Тестирование и комплексные испытания");
const employee_numbers = calcOptimalEmployeeNumbers();
const employee_matrix = lifecycleEmployeeDistribution();
const period_months = calcMonthsForPeriods();
const averageSalary = project1.getSalary();
const empl_salary_for_periods_total = calculateSalaries(averageSalary);
const S = countOperatorSalary();

let employee_expences_total = empl_salary_for_periods_total + Math.floor(S);
console.log("Общий фонд ЗП с учетом затрат на эксплуатацию: " + employee_expences_total);
let ensurance = 0.3 * (empl_salary_for_periods_total + Math.floor(S));
console.log("Страховые взносы: " + ensurance.toFixed(2));
let notebook_costs = 20000 * minValues[1];
console.log("Увеличение стоимости основных средств (Notebook 20000 rub): " + notebook_costs);
let internet_cost = 1000 * project1.getTime();
console.log("Коммунальные услуги(телефон, Интернет): " + internet_cost);
let other_expenses = 500 * project1.getTime();
console.log("Прочие расходы: " + other_expenses);
let direct_cost = employee_expences_total + ensurance + notebook_costs + internet_cost + other_expenses;
console.log("Итоговые прямые затраты: " + direct_cost);
let prod_dev = 0.1 * direct_cost;
console.log("Фонд развития производства: " + prod_dev.toFixed(2));
let overhead_expenses = 0.12 * direct_cost;
console.log("Накладные расходы: " + overhead_expenses.toFixed(2));
let expences_total = direct_cost + prod_dev + overhead_expenses;
console.log("Всего расходов: " + expences_total.toFixed(2));
let VAT = 0.18 * expences_total;
console.log("НДС: " + VAT.toFixed(2));
let final_project_cost = expences_total + VAT;
console.log();
console.log("ИТОГОВАЯ ДОГОВОРНАЯ ЦЕНА: " + final_project_cost.toFixed(2));

function writeJson(){
	let data = {
		"project_cost" : final_project_cost,
		"develop_time" : project1.getTime()
	};
	let file = JSON.stringify(data);
	console.log(file);
}

writeJson();

const MongoClient = require("mongodb").MongoClient;
 
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

mongoClient.connect(function(err, client){
	
	
	const db = client.db("MPLABS_DATA");
	const collection = db.collection("Required_values");
	let data = {
		"project_cost" : final_project_cost,
		"develop_time" : project1.getTime()
	};
	collection.insertOne(data, function(err, result){
		if(err){
			return console.log(err);
		}
		console.log(result.ops);
		client.close();
	});
});
