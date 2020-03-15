#import json
import math
import matplotlib.pyplot as plt

main_values = {
 'start_investments':100000,
 'discount':13,
 'years':3
 }

income = {
 'first_year_income':65000,
 'second_year_income':65000,
 'third_year_income':65000
 }

expences = {
 'first_year_expences':20000,
 'second_year_expences':15000,
 'third_year_expences':10000
}

with open('datafile.json', 'w') as file:
    json.dump(main_values, file)
    json.dump(income, file)
    json.dump(expences, file)

def getCFArray():
    cf_array = []
    in_list = []
    ex_list = []
    in_keys = income.keys()
    ex_keys = expences.keys()
    for in_key in in_keys:
        income_per_year = income.get(in_key)
        in_list.append(income_per_year)
    for ex_key in ex_keys:
        expence_per_year = expences.get(ex_key)
        ex_list.append(expence_per_year)
    year_counter = 0
    if len(in_list) == len(ex_list):
        year_counter = len(in_list)
    for i in range(year_counter):
        cf_array.append(in_list[i] - ex_list[i])

    counter = 0
    for cf in cf_array:
        counter += 1
        print(f"Чистый доход за {str(counter)}й год: {cf}")
    return cf_array
"""
    cf1 = income.get('first_year_income') - expences.get('first_year_expences')
    cf2 = income.get('second_year_income') - expences.get('second_year_expences')
    cf3 = income.get('third_year_income') - expences.get('third_year_expences')
    cf_array.extend([cf1, cf2, cf3])
"""
cf_array = getCFArray()

# Функция рассчета чистого приведенного дохода(NPV)

def countNPV():
    npv = 0
    for i in range(main_values.get('years')):
        npv += cf_array[i] * math.pow(1 + main_values.get('discount') / 100, i + 1)
    npv -= main_values.get('start_investments')
    print(f"Чистый приведенный доход составляет: {round(npv, 2)} руб.")
    return npv

npv = countNPV()

# Функция рассчета коэффицента возврата инвестиций(ROI)
def countROI():
    roi = npv / main_values.get('start_investments') * 100
    print(f"Коэффицент возврата инвестиций: {round(roi, 2)}%")
    return roi

roi = countROI()

# Функция рассчета индекса доходности(PI = NPV / Ic)
def countPI():
    pi = round(npv / main_values.get('start_investments'), 2)
    print(f"Индекс доходности: {round(pi, 2)}")
    return pi

pi = countPI()

# Рассчет накопленного дисконтированного денежного потока по периодам

Rk = [] # Дисконтированный денежный поток(значения для 3х лет)
NVPk = [] # Накопленный денежный поток(значения для 3х лет)

def countPeriodicIncome():
    for i in range(main_values.get('years')):
        R = cf_array[i] / math.pow(1 + main_values.get('discount') / 100, i + 1)
        Rk.append(round(R, 2))
    NVP1 = -main_values.get('start_investments') + Rk[0]
    NVP2 = NVP1 + Rk[1]
    NVP3 = NVP2 + Rk[2]
    NVPk.extend([round(NVP1, 2), round(NVP2, 2), round(NVP3, 2)])

countPeriodicIncome()

print(NVPk)

# Подсчет срока окупаемости проэкта(РВР)
def countRVR():
     counter = 0
     for each in NVPk:
         if each < 0:
             counter += 1
     RVR = counter + math.fabs(NVPk[counter - 1]) / Rk[counter]
     print(f"Срок окупаемости: {round(RVR, 2)} года.(Когда прибыль покроет затраты на проэкт)")
     return RVR

rvr = countRVR()

test_arr = [-100000]
test_arr.extend(NVPk)

fig = plt.figure()
plt.title("График возврата средств, вложенных в проект")
plt.xlabel("Количество лет")
plt.ylabel("Денежные средства")
plt.plot([0, 1, 2, 3], test_arr)
points = fig.add_subplot(111)
points = plt.scatter([0, 1, 2, 3], test_arr)
plt.axis([0, 4, -110000, 100000])
plt.grid(True)

"""
dg = fig.add_axes([0.25, 0.5, 0.25, 0.25])
#dg.title("Диаграмма")
dg.bar([0, 1, 2, 3], test_arr)
dg.grid(True)
"""
fig = plt.figure()
plt.title("Диаграмма")
plt.xlabel("Количество лет")
plt.ylabel("Денежные средства")
plt.bar([0,1,2,3], test_arr)
plt.axis([0,4,-110000,100000])
plt.grid(True)

plt.show()
