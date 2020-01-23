    /**
     * Вызов модалки
     * @param {*} id_modal 
     * @param {*} length 
     */
    function viewModalProgressBar(id_modal, length){

        createProgress(id_modal, length); // создание модалки в доме
        
        let modal = document.getElementById(id_modal);
        if(modal != null){

            $('#'+ id_modal).modal('show'); // Показываем модалку
            let i = length;

            // запускаем таймер каждую секунду срабатывает
            let timer = setInterval(function(){

                let progress = modal.querySelector(".progress-bar");
                //увеличиваем длинну прогресс линии на 1% в секунду 
                progress.style.width = i +"%";
                i = i + 10;

                if(!modal.classList.contains("show")){
                    //если у модалки пропал клас видимости (скрыли ее)
                    clearInterval(timer); // остоновить счетчик
                    dismissProgress(id_modal);
                }

                if(i > 99){
                    // если значение достигло 99 
                    clearInterval(timer); // остоновить счетчик
                    dismissProgress(id_modal);
                }
            }, 1000);
        }
    }

    function dismissProgress(id_modal){
        $('#'+ id_modal).modal('hide'); // скрыть модалку
        document.body.removeChild(document.getElementById(id_modal)); // удалить модалку из дома
    }

    /**
     * Создание модалки с прогресс баром
     * Два параметра принимаетидентификатор и начальную длинну
     * @param {*} id_modal 
     * @param {*} length 
     */
    function createProgress(id_modal, length){
        let divModal        = document.createElement('div'),
            divModalDialog  = document.createElement('div'),
            divModalContent = document.createElement('div'),
            divModalBody    = document.createElement('div'),
            divProgress     = document.createElement('div'),
            divProgressBar  = document.createElement('div');

        //STYLE
        divModal.classList.add("modal", "fade");
        divModal.setAttribute("id", id_modal);
        divModal.setAttribute("tabindex","-1");
        divModal.setAttribute("role","dialog");
        divModal.setAttribute("aria-labelledby",id_modal);
        divModal.setAttribute("aria-hidden","true");

        divModalDialog.classList.add("modal-dialog", "modal-dialog-centered");
        divModalDialog.setAttribute("role","document");

        divModalContent.classList.add("modal-content");

        divModalBody.classList.add("modal-body");

        divProgress.classList.add("progress");

        divProgressBar.classList.add("progress-bar", "progress-bar-striped", "bg-success");
        divProgressBar.setAttribute("aria-valuenow", length);
        divProgressBar.setAttribute("role","progressbar");
        divProgressBar.setAttribute("aria-valuemin","0");
        divProgressBar.setAttribute("aria-valuemax","100");

        // CREATE MODAL
        divProgress.appendChild(divProgressBar);
        divModalBody.appendChild(divProgress);
        divModalContent.appendChild(divModalBody);
        divModalDialog.appendChild(divModalContent);
        divModal.appendChild(divModalDialog);

        document.body.appendChild(divModal);
    }