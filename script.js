let menuItems = document.querySelectorAll('.menu-item');
const arrowDown = document.querySelector('.arrow-down');
const arrowUp = document.querySelector('.arrow-up');
const arrowDownArea = document.querySelector('.arrow-down-area');
let selectedMenusList = document.getElementById("selected-menus");

let flipStat = true
Kakao.init('2d677bf97c3745cd49e61c31d554a4ab');
Kakao.Channel.createAddChannelButton({
  container: '#add-channel-button',
  channelPublicId: '_xjhWRG' // 카카오톡 채널 홈 URL에 명시된 id로 설정합니다.
});



var menuData = [
    {name: "떡볶이", price: 6500, image: "메뉴1.jpg"},
    {name: "김밥", price: 3000, image: "메뉴2.jpg"},
    {name: "라면", price: 3500, image: "메뉴3.jpg"},
    {name: "모듬튀김", price: 5000, image: "메뉴4.jpg"},
    {name: "우동", price: 7000, image: "메뉴5.jpg"},
    {name: "쫄면", price: 7000, image: "메뉴6.jpg"},
    // 더 많은 메뉴 데이터...
];

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
}

var container = document.querySelector('.row');  // 카드를 추가할 컨테이너 선택

menuData.forEach(function(menu, index) {
    var col = document.createElement('div');
    col.className = 'col-6';

    var card = document.createElement('div');
    card.className = 'card';
    card.id = 'card' + (index + 1);

    // 카드 클릭 이벤트 추가
    card.addEventListener('click', function(event) {
        if (event.target === this) {
            this.classList.toggle('checked');
        }
    });

    var img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = menu.image;
    img.alt = menu.name;

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    var title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = menu.name;

    var text = document.createElement('p');
    text.className = 'card-text';
    text.textContent = formatPrice(menu.price);

    cardBody.appendChild(title);
    cardBody.appendChild(text);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    container.appendChild(col);
    card.onclick = (e) => handleCardClick(e, menu);
});

let total = 0;
let selectedMenus = {};



function handleCardClick(e, menu) {
    const priceDisplay = document.getElementById("price-display");
    const totalPrice = document.getElementById("total-price");
    

    e.currentTarget.classList.toggle("selected");

    if (e.currentTarget.classList.contains("selected")) {
        selectedMenus[menu.name] = { price: menu.price, quantity: 1 }; // 새로운 메뉴일 경우 추가
        total += menu.price;
    } else {
        if (selectedMenus[menu.name]) {
            total -= menu.price * selectedMenus[menu.name].quantity;
            selectedMenus[menu.name].quantity = 0 
            delete selectedMenus[menu.name]; // 수량이 0이 되면 선택 목록에서 삭제
        }
    }

    if (total > 0) {

        if (flipStat == true){
            let listItems = "";
            for (let name in selectedMenus) {
                const menuItem = selectedMenus[name];
                listItems += `
                <div class="menu-item">
                <span>${name}</span>
                <div class="quantity-btn-area">
                    <button class="quantity-btn" onclick="decreaseQuantity('${name}')">
                    <i class="fa fa-minus"></i>
                    </button>
                    <span>${menuItem.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity('${name}')">
                    <i class="fa fa-plus"></i>
                    </button>
                </div>
                <span>${(menuItem.price * menuItem.quantity).toLocaleString()}원</span>
                </div>
                
                `;
                     }
                selectedMenusList.innerHTML = listItems;
                priceDisplay.classList.remove("hidden");
            }
            else{
                let listItems = "";
                for (let name in selectedMenus) {
                    const menuItem = selectedMenus[name];
                    listItems += `
                    <div class="menu-item collapsed">
                    <span>${name}</span>
                    <div class="quantity-btn-area">
                        <button class="quantity-btn" onclick="decreaseQuantity('${name}')">
                        <i class="fa fa-minus"></i>
                        </button>
                        <span>${menuItem.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity('${name}')">
                        <i class="fa fa-plus"></i>
                        </button>
                    </div>
                    <span>${(menuItem.price * menuItem.quantity).toLocaleString()}원</span>
                    </div>
                    
                    `;
                         }
                    selectedMenusList.innerHTML = listItems;
                    priceDisplay.classList.remove("hidden");
            }
            totalPrice.textContent = "총 가격 : " + total.toLocaleString()+"원";
    } else {
        selectedMenusList.innerHTML = "";
        priceDisplay.classList.add("hidden");
    }
}

function increaseQuantity(name) {
    selectedMenus[name].quantity += 1;
    total += selectedMenus[name].price;
    updatePriceDisplay();
}

function decreaseQuantity(name) {
    if (selectedMenus[name].quantity >1) {
        selectedMenus[name].quantity -= 1;
        total -= selectedMenus[name].price;
    }
    
    
    updatePriceDisplay();
}

function updatePriceDisplay() {
    const totalPrice = document.getElementById("total-price");
    const selectedMenusList = document.getElementById("selected-menus");

    let listItems = "";
    for (let name in selectedMenus) {
        const menuItem = selectedMenus[name];
        listItems += `
                <div class="menu-item">
                <span>${name}</span>
                <div class="quantity-btn-area">
                <button class="quantity-btn" onclick="decreaseQuantity('${name}')">
                    <i class="fa fa-minus"></i>
                </button>
                <span>${menuItem.quantity}</span>
                <button class="quantity-btn" onclick="increaseQuantity('${name}')">
                    <i class="fa fa-plus"></i>
                </button>
                </div>
                <span>${(menuItem.price * menuItem.quantity).toLocaleString()}원</span>
            </div>
        `;
    }
    selectedMenusList.innerHTML = listItems;
    totalPrice.textContent = "총 가격 : " + total.toLocaleString()+"원";
}




function flip() {
    const header = document.getElementById('header');
    const front = header.getElementsByClassName('front')[0];
    const back = header.getElementsByClassName('back')[0];

    if (front.style.display === "none") {
        front.style.display = "block";
        back.style.display = "none";
    } else {
        front.style.display = "none";
        back.style.display = "block";
    }
}

// 아래쪽 화살표를 누를 때 메뉴 숨기기
function fn_arrowDown() {
    flipStat=false;
    menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.classList.add('collapsed');
    });
    arrowDownArea.classList.add('collapsed');
    arrowDown.classList.add('hidden');
    arrowUp.classList.remove('hidden');
  }
  
  // 위쪽 화살표를 누를 때 메뉴 보이기
  function fn_arrowUp() {    
    flipStat=true;
    menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.classList.remove('collapsed');
    });
    arrowDownArea.classList.remove('collapsed');
    arrowDown.classList.remove('hidden');
    arrowUp.classList.add('hidden');
  }
  
  // 아래쪽 화살표를 클릭할 때 메뉴 숨기기 이벤트 등록
  arrowDown.addEventListener('click', fn_arrowDown);
  
  // 위쪽 화살표를 클릭할 때 메뉴 보이기 이벤트 등록
  arrowUp.addEventListener('click', fn_arrowUp);
  