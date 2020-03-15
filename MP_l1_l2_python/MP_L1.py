company_stats = {
  'PCs':150,
  'Employees':170,
  'Company_Income':75650000,
  'Average_salary':12000,
  'Work_hours_per_month':168,
  'Employee_hours':8
}

IT_budget ={
  'Equipmet_costs':400000,
  'Software_costs':150000,
  'Periphery_costs':130000,
  'Sys_admin':190000,
  'IT_manager':260000,
  'Developer':100000,
  'Tech_support':380000,
  'Education_cost':70000,
  'Outsourcing':180000,
  'Developing_Integration_costs':300000,
  'Telephone':140000,
  'Internet':100000
}

modifier = 1.1 # в соответствии с вариантом

#функция подсчета прямых затрат
def countDC():
    dc = 0
    keys = IT_budget.keys()
    for key in keys:
        dc += IT_budget.get(key)*modifier
    print(f"Прямые затраты на оборудование в данный момент:{dc}")
    return dc

#функция подсчета косвенных затрат
def countIndc():
    indc = 0
    sys_downtime_data = {
      'Shutdowns_Per_Month':2,
      'Average_shutdown_time':3,
      'Users_disabled':20,
      'Company_annual_income':78880000
    }
    #годовая стоимость деятельности пользованеля(СП)
    costOfEmployee = (company_stats.get('Average_salary') / company_stats.get('Work_hours_per_month') * company_stats.get('Employee_hours') * 12) * modifier
    #ежегодные затраты пользователей на ИС(СПГ)
    annualCOE = costOfEmployee * company_stats.get('Employees')
    print(f"СПГ = {round(annualCOE, 2)}")
    #Часовая оплата пользователя(ЧОп)
    payment_per_hour = (company_stats.get('Average_salary') / company_stats.get('Work_hours_per_month')) * modifier
    print(f"Часовая оплата пользователя, руб/ч: {round(payment_per_hour, 2)}")
    #Доход на каждого работника(Чд)
    employee_company_income = modifier * (sys_downtime_data.get('Company_annual_income') / 12 / company_stats.get('Work_hours_per_month') / company_stats.get('Employees'))
    print(f"Доход на каждого работника, руб/ч: {round(employee_company_income,2)}")
    #Простои, часов в год(Гп)
    downtimes = sys_downtime_data.get('Shutdowns_Per_Month') * sys_downtime_data.get('Average_shutdown_time') * 12 * modifier
    print(f"Простои, часов в год: {round(downtimes, 2)}")
    #Ежегодные затраты на простои системы(Спр)
    downtimes_annual = (employee_company_income + payment_per_hour) * downtimes * sys_downtime_data.get('Users_disabled')
    print(f"Ежегодные затраты на простои системы: {round(downtimes_annual, 2)}")
    indc = annualCOE + downtimes_annual
    print(f"Сумма косвенных затрат: {round(indc, 2)}")
    return indc

#direct costs(прямые затраты)
dc = countDC()

#indirect costs(косвенные затраты)
indc = countIndc()

# ТСО = ПЗ + КЗ : КЗ = СПГ + СПР
#Совокупная стоимость владения ПО
total = dc + indc
print(f"Итоговая сумма ТСО: {round(total, 2)}")
