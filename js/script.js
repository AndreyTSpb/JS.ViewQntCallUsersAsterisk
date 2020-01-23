document.addEventListener('DOMContentLoaded', function(){

let input_rub = document.getElementById('rub'),
    input_usd = document.getElementById('usd');

    input_rub.addEventListener("input",()=>{
        let jsonReq = new XMLHttpRequest();
        jsonReq.open('GET','curs.json');
        jsonReq.setRequestHeader('Content-type', 'application/json; chartset=utf-8');
        jsonReq.send();
        jsonReq.addEventListener('readystatechange', function(){
            if(jsonReq.readyState === 4 && jsonReq.status == 200){
                let data = JSON.parse(jsonReq.response);
                console.log(data.usd);

                input_usd.value = input_rub.value / data.usd;
            }else{
                input_usd.value = "Чтото пошло не так";
            }
        });
    });
    
});
