var resultData, currentArray;

async function getData(){

    var res = await fetch('https://json.bselivefeeds.indiatimes.com/ET_Community/Gain?pagesize=100');
    var data = await res.json();
    return data.searchresult;
}



getData().then((arr)=>{
resultData = arr;
renderData(resultData);
});



function giveMargin(obj){
    var value =  (parseFloat(obj.current)-parseFloat(obj.low))/(parseFloat(obj.high)-parseFloat(obj.low))*100;
    return (value)?value:0;
}



function renderData(arr){

    currentArray = arr.slice();
    clearSection();
    arr.forEach((data)=>{

        var html= `<div class="stock-item">
        <div class="name">
        ${data.companyShortName}
        </div>
        
        <div class="description">
            <div class="price">
                <div class="label">price</div>
                <div class="value">${data.current}</div>
            </div>
        
            <div class="change">
                <div class="label">change<i class="fas fa-arrow-up"></i></div><!--<i class="fas fa-arrow-down"></i>-->
                <div class="value">+${data.absolutechange}<span class="percentage">(+${data.percentagechange}%)</span></div>
            </div>
        
            <div class="position">
                <div class="label">position on 52wk</div> 
               <div class="progress">
                    <div class="progress-bar" style="margin-left:${giveMargin(data)}%"></div>
                </div>
                <div class="min-max">
                    <div class="min-value">${data.low}</div>
                    <div class="max-value">${data.high}</div>
                </div>
            </div>
        </div>
        </div>`;


        document.querySelector('.data-container').insertAdjacentHTML('beforeend',html);
    });
    }


function clearSection(){
    document.querySelector('.data-container').innerHTML="";
}



function search(){

    document.querySelector('.filter').classList.remove('selected');
    document.querySelector('.sort').classList.remove('selected');

    var query = document.querySelector('.query').value;
    document.querySelector('.query').value="";
        if(query){
        

            var obj = resultData.filter((cur)=>{
                return cur['companyShortName'].toLowerCase().includes(query.toLowerCase());
            });

            renderData(obj);
        }
        else renderData(resultData);
}



function sortByCurrent(){

    document.querySelector('.sort').classList.add('selected');
    var arr = currentArray.slice();

    arr.sort(function(a,b){

        if(parseInt(a.current) < parseInt(b.current)){
            return -1;
        }
        else if(a.current > b.current){
            return 1;
        }
        else return 0;

    });


renderData(arr);
   
}


function filterByCurrent(){

    document.querySelector('.filter').classList.add('selected');
    var value = prompt('enter required current value');

    if(value){

        var arr=currentArray.slice();

      var result =   arr.filter((cur)=>{
            return parseInt(cur.current) >= parseInt(value);
        });

        renderData(result);
    }

}


//event listeners
document.querySelector('.filter').addEventListener('click',filterByCurrent);

document.querySelector('.sort').addEventListener('click',sortByCurrent);

document.querySelector('.fa-search').addEventListener('click',search);

document.addEventListener('keypress',function(e){

    if(e.keyCode===13 || e.which===13) search();
});
    