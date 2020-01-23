/**
 * Для управления нажатиями на дни в календаре
 * Подцеплять после файла формирующего календарь
 */
document.addEventListener('DOMContentLoaded', function(){
    /**
     * Навешиваем слушателя на кнопки в календаре
     */
    let calendar = document.getElementById('calendar');
    if(calendar !== null){
        calendar.addEventListener('click', viewModal);
    }
    /**
     * Показывем модалку
     */
    function viewModal(e){
        let target = e.target;
        if(target.classList.contains("btn-day")){
            let dt = +target.getAttribute("time");
            getData(dt);
        }
    }
    // удаляем модалку если есть
    function delModal(){
        let modal = document.getElementById("myModal");
        if(modal !=null){
            document.body.removeChild(modal);
        }
    }
    
    
    /**
     * Get DATA
     * Получаем данные асинхронным запросом
     * dt - дата в юникс тайм стамп но которую надо получить данные
     */
    function getData(dt){

        viewModalProgressBar('modal_bar', 10);

        let jsonReq = new XMLHttpRequest();
        jsonReq.open('POST','../post/post_get_call.php');
        jsonReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        jsonReq.send('get=1&dt='+dt);

        jsonReq.addEventListener('readystatechange', function(){

            if(jsonReq.readyState === 4 && jsonReq.status == 200){
                $('#modal_bar').modal('hide');// закрываем модалку с прогрессом
                delModal(); // очищаем тело модалки с предыдущих результатов 
                let data = JSON.parse(jsonReq.response);
                createModal(data); // создаем новую модалку с данными
                //показать модалку
                $('#myModal').modal('show'); // показываем модалку
            }
        });
    }


    /**
     * Создаем модалку
     */
    function createModal(data){
        let divModal = document.createElement("div"),
            divModalDialog = document.createElement("div"),
            divModalContent = document.createElement("div"),
            divModalHeader  = document.createElement("div"),
            divModalBody    = document.createElement("div"),
            divModalFouter  = document.createElement("div"),
            btnCloseModal   = document.createElement("button"),
            btnX            = document.createElement("button")
            h5              = document.createElement('h5');

        /**
         * То что будем изменять
         */
        //title modal
        h5.classList.add("modal-title");
        h5.textContent = "Кол-во звонков за: " + data.dt;

        //Modal Body
        divModalBody.classList.add("modal-body");
        let help = document.createElement('p');
        help.textContent = "666: 78/8 - номер : всего набрано номеров / не пустые звонки";
        divModalBody.appendChild(help);
        divModalBody.appendChild(table(data.data));


        /**
         * Внизу та часть модалки которая не меняеется
         */

        //button X close
        btnX.classList.add("close");
        btnX.setAttribute("data-dismiss", "modal");
        btnX.setAttribute("aria-label", "Close");
        btnX.type = "button";
        btnX.innerHTML = '<span aria-hidden="true">&times;</span>';

        //Button Cloce Modal
        btnCloseModal.classList.add("btn", "btn-secondary");
        btnCloseModal.setAttribute("data-dismiss","modal");
        btnCloseModal.type = "button";
        btnCloseModal.textContent = "Close";

        //Modal Header
        divModalHeader.classList.add("modal-header");
        divModalHeader.appendChild(h5);
        divModalHeader.appendChild(btnX);

        //divModalHeader.appendChild(help);

        //Modal Footer
        divModalFouter.classList.add("modal-footer");
        divModalFouter.appendChild(btnCloseModal);
        
        //Modal Content
        divModalContent.classList.add("modal-content");
        divModalContent.appendChild(divModalHeader);
        divModalContent.appendChild(divModalBody);
        divModalContent.appendChild(divModalFouter);

        //Modal Dialog
        divModalDialog.classList.add("modal-dialog", "modal-dialog-scrollable", "modal-lg", "modal-dialog-centered");
        divModalDialog.appendChild(divModalContent);

        //END MODAL
        divModal.classList.add("modal","fade");
        divModal.setAttribute("id","myModal");
        divModal.setAttribute("role","dialog");
        divModal.setAttribute("tabindex","-1");
        divModal.appendChild(divModalDialog);

        //Добавляем модалку на страницу
        document.body.appendChild(divModal);
    }

    /**
     * таблица с статистикой 
     */
    function table(data){
        let table = document.createElement('table'),
            tbody = document.createElement('tbody');
        table.classList.add("table","table-sm");
        let kol = Object.keys(data).length,
            row = kol / 7;
        let arr = obj_in_array(data);
        for(let i = 0; i<row; i++){
            let tr = document.createElement('tr');
            for(let k = 0; k < 7; k++ ){
                let td = document.createElement('td');
                if( kol > 0){
                    let user = arr.pop(), //CallerID
                        all  = (user.data.all)?user.data.all:"0", //ALL CALLS
                        ans  = (user.data.ANS)?user.data.ANS:"0"; //ANSWER CALLS

                    td.textContent = user.user + ": " + all + " / " + ans;
                    tr.appendChild(td);
                    kol--;
                }else{
                    td.textContent = "";
                    tr.appendChild(td);
                }
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        return table;
            
    }

    // Перезаписываем объект в массив 
    function obj_in_array(data){
        let arr = new Array();
        for (let code in data){
            arr.push({
              user: code,
              data:data[code]
              });
        }
        return arr;
    }
});