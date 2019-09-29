
// // menuclick() 함수는
// // 메뉴 버튼이 클릭되면 price 화면에 함수들(메뉴 수량 가격 총가격) 을 산출한다. 

// function menuclick() {
//     var menuPoint = document.querySelectorAll('.menuBtn');
//     var menuName = document.querySelectorAll('.menuBtn');
//     for (let a=0; a<menuPoint.length; a++){
//         menuPoint[a].onclick = function() {
//             displayData = [];
//             foodData[a]['clickCount'] = foodData[a]['clickCount'] + 1;
//             if (foodData[a]['clickCount'] > 1){
//                 for(n=0; n<accuData.length; n++){
//                     if (accuData[n]['name'] === menuName[a].textContent){
//                         accuData[n]['count']++;
//                         filterRender();
//                     }
//                 }
//             }
//             else {
//                 var menuData = foodData.filter(function(value){
//                     return value['name'] === menuName[a].textContent;
//                 })
//                 accuData.push(menuData[0]);
//                 displayData.push(menuData[0]);
//                 renderMenuName();
//                 renderMenuPrice();
//                 renderMenuCount();
//                 renderTotalPrice(); 
//             }
           
//         }
//     }
// }
// menuclick();

// // -------------------렌더링함수-----------------------------

var targetName = document.querySelector('#orderList1');
var templateName = document.querySelector('#temList1');
var templateName1 = document.querySelector('#temList1-1');

function renderMenuName() {
    for (let i=0; i<displayData.length; i++){
        let newMenu = document.importNode(templateName.content, true); // 
        let menuUl = newMenu.querySelectorAll('.orderMain');
        menuUl[i].textContent = displayData[i]['name']
        targetName.appendChild(newMenu);
    }
}

function renderOptName() {
    for (let j = 0 ; j < displayData2.length ; j++ ) {
        
        // div 을 1개 추가 하고 임포트노드한다
        let createND = document.createElement("div");
        createND.classList.add("orderOpt")
        templateName1.content.appendChild(createND);     
        
        let newOpt = document.importNode(templateName1.content, true); // importNode의 문제
        let menuOpt = newOpt.querySelectorAll('.orderOpt'); 
        menuOpt[j].textContent = displayData2[j]['name'];         // menuOpt에  element가 없는게 문제
        // menuOpt[0] = d2[0]
        // mO[1] = d2[1]
        targetName.appendChild(newOpt) 
    }
}

var targetPrice = document.querySelector('#orderList3');
var templatePrice = document.querySelector('#temList3');
let allSum = [];

function renderMenuPrice() {
    for (let i=0; i<displayData.length; i++){
        let newMenu = document.importNode(templatePrice.content, true);
        let orderPrice1 = newMenu.querySelectorAll('.orderPrice');
        
        // 체크박스의 선택 개수에 따른 옵션코드 (알고리즘을 꼭 확인하세요!)
        if( displayData2.length === 1 ) {
            optSum = displayData2[0]['price'];
        }
        else if (displayData2.length > 1) {
            optSum = displayData2.reduce(function(acc, curr){
                return acc["price"] + curr["price"];
            }); 
        }
        else if (displayData2.length === 0) {
            optSum = 0;
        }

        let totalPrice = displayData[i]['price'] * displayData[i]['count'] + optSum;
        allSum.push(totalPrice);
        orderPrice1[i].textContent = totalPrice;
        targetPrice.appendChild(newMenu);
    }
}

var targetCount = document.querySelector('#orderList2');
var templateCount = document.querySelector('#temList2');
function renderMenuCount() {
    for (let i=0; i<displayData.length; i++){
        let newMenu = document.importNode(templateCount.content, true);
        let orderCount1 = newMenu.querySelectorAll('.orderCount');
        orderCount1[i].textContent = displayData[i]['count'];
        targetCount.appendChild(newMenu);
        countUp2();
        countDown2();
    }
}


function totalPrice() {
    var total1 = allSum.reduce(function(accu, curr){
        return accu + curr;
    })
    return total1;
}

var targetTotal = document.querySelector('#orderList4');
var templateTotal = document.querySelector('#temList4');

function renderTotalPrice() {
        targetTotal.innerHTML = '';
        let newMenu = document.importNode(templateTotal.content, true);
        let menuUl = newMenu.querySelector('.totalPrice');
        menuUl.textContent = `${totalPrice()} 원`;
        targetTotal.appendChild(newMenu);
}

function filterRender() {
    targetPrice.innerHTML = '가격';
    targetName.innerHTML = '주문내역';
    targetCount.innerHTML = '수량';
    targetTotal.innerHTML = '총가격';
    newSum = [];
    displayData = [];
     for(i=0; i<accuData.length; i++){
        displayData = [];
        displayData.push(accuData[i]);
        renderMenuName();
        renderMenuPrice();
        renderMenuCount();
        renderTotalPrice();           
     }
 }   
 
// ------------------- up & down & clear ------------------
function countUp2() {
    let countUp = document.querySelectorAll('.up1');
    for (let a=0; a<countUp.length; a++){
    countUp[a].onclick = function() {
            targetPrice.innerHTML = '가격';
            targetName.innerHTML = '주문내역';
            targetCount.innerHTML = '수량';
            targetTotal.innerHTML = '총가격';
            newSum = [];
            displayData = [];
            accuData[a]['count'] = accuData[a]['count'] + 1;
            for (i=0; i<accuData.length; i++){
                displayData = [];
                displayData.push(accuData[i]);
                renderMenuName();
                renderMenuPrice();
                renderMenuCount();
                renderTotalPrice()                 
            }

        }
    }
    }


    function countDown2() {
        let countDown = document.querySelectorAll('.down1');
        for (let a=0; a<countDown.length; a++){
        countDown[a].onclick = function() {
                targetPrice.innerHTML = '가격';
                targetName.innerHTML = '주문내역';
                targetCount.innerHTML = '수량';
                targetTotal.innerHTML = '총가격';
                newSum = [];
                displayData = [];
                accuData[a]['count'] = accuData[a]['count'] - 1;
                for (i=0; i<accuData.length; i++){
                    if (accuData[i]['count']<=0){
                        accuData[i]['clickCount'] = 0;
                        accuData[i]['count'] = 1; // 기존에 기록되었던 count가 다시 나타나는 것을 방지하기 위해 count값을 초기화함
                        accuData.splice(i,1);
                        filterRender();
                        menuclick();
                    }
                    else{
                    displayData = [];
                    displayData.push(accuData[i]);
                    renderMenuName();
                    renderMenuPrice();
                    renderMenuCount();
                    renderTotalPrice()
                    }                 
                }
    
            }
        }
    }

    function clear() {
        let deleteButton = document.querySelector('.deleteBtn');
        deleteButton.onclick = function() {
            location.reload();
            menuclick();
        }
    }
    clear();





