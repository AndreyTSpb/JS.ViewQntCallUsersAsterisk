document.addEventListener('DOMContentLoaded', function(){
    /**
     * Создание календаря на странице
     */

    /**
     * Функция для отображения создания одного месяца
     * <div class="col-4">
     *       <div class="card">
     *           <div class="card-header">
     *               <h4>Месяц</h4>
     *           </div>
     *           <div class="card-body">
     *               <table class="table">
     *                   <thead>
     *                        <tr>
     *                           ...
     *                        </tr>
     *                   </thead>
     *                   <tbody >
     *                        <tr>
     *                           ...
     *                        </tr>
     *                   </tbody>
     *               </table>
     *           </div>
     *       </div>
     *   </div>
     */
    function createCalendar(elem, year, month){
        let firstDay = new Date(year, month-1); //первый день месяца
        let now = new Date();

        //Массив с названием месяцев
        let monthName = ["","Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
        //Массив с днями недели
        let wDayName = ["","Пн","Вт","Ср","Чт", "Пт", "Сб","Вс"];

        //создаем нужные базовые блоки
        let divBody = document.createElement('div'),
            divCard = document.createElement('div'),
            divCardHead = document.createElement('div'),
            divCardBody = document.createElement('div'), 
            table = document.createElement('table'),
            thead = document.createElement('thead'),
            tr_h  = document.createElement('tr'),
            tbody = document.createElement('tbody');

        //Задаем стили базовым элементам
        table.classList.add('table');
        divBody.classList.add("col-sm-4", "mb-1", "col-lg-3", "col-12");
        divCard.classList.add("card", "text-center");
        divCardHead.classList.add("card-header");
        divCardBody.classList.add("card-body", "p-0");   
        thead.classList.add("thead-dark");

        
        //Блок с названием месяца
        let h4 = document.createElement("h4");
        h4.textContent = monthName[month];
        divCardHead.appendChild(h4);
        divCard.appendChild(divCardHead);

        //Хидер таблицы с днями недели
        for(let i = 0; i<8; i++){
                let th = document.createElement('th');
                th.classList.add('p-1');
                th.textContent  = (wDayName[i])?wDayName[i]:"#";
                tr_h.appendChild(th);
        }

        /*
         * В таблицу помещаем заголовок 
         * с кратким названием дней недели
         */
        thead.appendChild(tr_h)
        table.appendChild(thead);

        /**
         * Заполнение днями тела таблицы
         */
        let kol = 0;
        for(let i=1; i<7; i++){
            let tr_b = document.createElement('tr');
            for(let k=0; k<8; k++){
                let td = document.createElement('td'),
                    btn = document.createElement('button');
                if(k>0){
                    /**
                    *   Проверяем какой день недели (1-7) 
                    *   и текуший ли это месяц
                    *   если нет то пустыми ячейками заполняем 
                    *   "btn-day"  - это кнопка по которой модалка появляться будеты
                    */
                    if(getDay(firstDay) === k && firstDay.getMonth() === month-1){
                        if(now.getDate() === firstDay.getDate() && now.getMonth() === month-1){
                            btn.classList.add("btn", "btn-success", "btn-sm", "btn-day");
                        }else if(+now < +firstDay){
							btn.classList.add("btn", "btn-outline-dark", "btn-sm");
							btn.disabled = true; //блокируем кнопку
						}else{
                            btn.classList.add("btn", "btn-outline-success", "btn-sm", "btn-day");
                        }
                        btn.textContent = (firstDay.getDate()<10)?"0"+firstDay.getDate():firstDay.getDate();
                        //Добавляем атрибут TIME куда помещаем дату начала дня timestamp.
                        btn.setAttribute("time", firstDay.getTime()/1000);
                        td.appendChild(btn);

                        // переводим на день вперед
                        firstDay.setDate(firstDay.getDate() + 1);
                    }else{
                        td.textContent = "";
                    }
                }else{
                    //надо добавить номер недели
                    td.textContent = firstDay.getWeek();
                }
                td.classList.add("p-1");
                tr_b.appendChild(td);
            }
            tbody.appendChild(tr_b);
        }

        //добавляем тело таблицы в блок
        table.appendChild(tbody);
        //Самый конец добавления
        //Таблицу помещаем в блок
        divCardBody.appendChild(table);
        divCard.appendChild(divCardBody);
        divBody.appendChild(divCard);
        //Помещаем на страницу
        document.getElementById(elem).appendChild(divBody);
    }

    /**
     * получить номер дня недели,
     * от 1 (пн) до 7 (вс)
     * @param {*} date 
     */
    function getDay(date) { 
        let day = date.getDay();
        //if (day == 0) day = 7; // сделать воскресенье (7) последним днем
        return (day === 0) ? day = 7:day;
    }

    // Returns the ISO week of the date.
    Date.prototype.getWeek = function() {
        var date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    for(let i = 1; i<13; i++){
        createCalendar('calendar',2020, i);
    }
})