/*顾客状态值有5个：possible，waiting，ready，eating，impossible*/
let customer = {
        0: {
            name: "ZHAO",
            status: "possible",
            img: "./resources/customer0.png"
        },
        1: {
            name: "QIAN",
            status: "possible",
            img: "./resources/customer1.png"
        },
        2: {
            name: "SUN",
            status: "possible",
            img: "./resources/customer2.png"
        },
        3: {
            name: "LI",
            status: "possible",
            img: "./resources/customer3.png"
        },
        4: {
            name: "ZHOU",
            status: "possible",
            img: "./resources/customer4.png"
        },
        5: {
            name: "WANG",
            status: "possible",
            img: "./resources/customer5.png"
        },
        6: {
            name: "JING",
            status: "possible",
            img: "./resources/customer6.png"
        },
    }
    /*有四张桌子*/
let table = {
    0: {
        list: [],
        total: 0,
        canUse: true,
        userID: 0,
        money: 0,
        dealCount: 0
    },
    1: {
        list: [],
        total: 0,
        canUse: true,
        userID: 0,
        money: 0,
        dealCount: 0
    },
    2: {
        list: [],
        total: 0,
        canUse: true,
        userID: 0,
        money: 0,
        dealCount: 0
    },
    3: {
        list: [],
        total: 0,
        canUse: true,
        userID: 0,
        money: 0,
        dealCount: 0
    }
};
/*菜品*/
let dishes = {
    0: {
        name: "凉拌SAN",
        type: "liangCai",
        price: 6
    },
    1: {
        name: "冷切DOM",
        type: "liangCai",
        price: 4
    },
    2: {
        name: "UL抄LI",
        type: "zhuCai",
        price: 12
    },
    3: {
        name: "红烧HEAD",
        type: "zhuCai",
        price: 15
    },
    4: {
        name: "酥炸Table",
        type: "zhuCai",
        price: 18
    },
    5: {
        name: "炙烤CSS",
        type: "zhuCai",
        price: 16
    },
    6: {
        name: "清蒸DIV",
        type: "zhuCai",
        price: 12
    },
    7: {
        name: "鲜榨flex",
        type: "yinPin",
        price: 5
    },
    8: {
        name: "小程序奶茶",
        type: "yinPin",
        price: 6
    }
};
/*设置四种颜色*/
let color = [
    { color1: "b20000", color2: "ff2020", status: true },
    { color1: "00af00", color2: "80ff00", status: true },
    { color1: "d96d00", color2: "ff9122", status: true },
    { color1: "7a4dff", color2: "ac91ff", status: true }
];
/*厨师列表*/
let chef = {
    0: {
        status: "free" //free和busy两种状态
    },
    1: {
        status: "free" //free和busy两种状态
    }
}
let cookingList = [];
let finishCookList = [];
let startPadding = 100;
const changePadding = 20;
const cookingTime = 5000;
const eatingTime = 5000;
const cusWaitingTime = 10000;
const cookingChange = 20;
const cusWaitingChange = 5;
const eatingChange = 20;
let eatingNumber = 0;
let cookCount = 0;
let weekendCount = 1;
let dayCount = 1;
let waitingList = [];
let chefNumber = 2;
let submitButtonListener = null;
let quitButtonListener = null;
let delChefButtonListener = null;
let fireChefButtonListener = null;
let removeWaitingListListener = null;
let date = new Date();
let zz = 0; //指针
let cssNode = document.createElement("style");
cssNode.id = "HTT_Style";
cssNode.setAttribute("type", "text/css");
cssNode.innerHTML = "* {\n" +
    "    font-family: Arial, Helvetica, sans-serif;\n" +
    "}";
document.body.appendChild(cssNode);

/*初始化*/
let start = document.getElementById("start");
let add_Chef = document.getElementById("add-chef-icon");
let addChefPage = document.getElementById("addChef");
let fireDiv = document.getElementById("fire");
let weekend = document.getElementById("weekend");
let day = document.getElementById("day");
let income = document.getElementById("income");

start.addEventListener("click", init);
add_Chef.addEventListener("click", addChef);

function init() {
    let welcome = document.getElementById("welcome");
    welcome.style.display = "none";
    let id = 0;
    const waitingTime = 2000; //等待时间是2秒钟
    const comingCustomer = 3000; //三秒钟来一个客人
    showAlert("warning", "餐厅目前有空位，赶紧点击等位客人头像让客人入座点餐吧", 2000);
    waitingList.push(id);
    customer[id].status = "possible";
    newCustomerComing(id, waitingTime);
    let timer = setInterval(() => { //3秒钟来一个顾客
        if (id < 6) {
            id++;
            waitingList.push(id);
            customer[id].status = "possible";
            newCustomerComing(id, waitingTime);
        } else {
            clearInterval(timer);
        }
    }, comingCustomer);
}

/*消息提示*/
function showAlert(type, text, time) {
    let center_alert = document.getElementById("center_alert");
    let remindText = document.getElementById("center_alert_p");
    let backgroundColor;
    if (type === "warning") {
        backgroundColor = "background-color: #ffb399;";
    } else if (type === "remind") {
        backgroundColor = "background-color: #d9e67d;";
    }
    if (text) {
        remindText.innerHTML = text;
    }
    center_alert.setAttribute("style", "display:block;" + backgroundColor);
    setTimeout(() => {
        center_alert.setAttribute("style", "display:none;" + backgroundColor);
    }, time);
}

/*顾客到来*/
function newCustomerComing(id, waitingTime) {
    const change = 20;
    let firstColor = 0;
    let secondColor = 120;
    const id_temp = id;
    let parentElement = document.getElementById("wait-box");
    startPadding -= changePadding;
    let paddingLeft = "padding-left:" + startPadding + "vw";
    let div_waiting = document.createElement("div");
    div_waiting.innerHTML = "<div class=\"customer-icon\">\n" +
        "                    <img src=\"./resources/customer" + id_temp + ".png\">\n" +
        "                </div>\n" +
        "                <div class=\"waiting-text\" id=\"waiting-text" + id_temp + "\">\n" +
        "                    等位中\n" +
        "                </div>";
    div_waiting.className = "waiting";
    div_waiting.id = "waiting" + id_temp;
    parentElement.appendChild(div_waiting);
    parentElement.setAttribute("style", paddingLeft);
    let waitingTimeBox = document.getElementById("waiting-text" + id_temp);
    let waitingBox = document.getElementById("waiting" + id_temp);

    const newWaitingListener = () => {
        if (eatingNumber < 4) {
            let readyCustomer = waitingList.shift();
            arrangeSeat(readyCustomer);
            let delEle = document.getElementById("waiting" + readyCustomer);
            //同时要删除等待队列中的该元素
            delWaitCustomer(parentElement, delEle, "ready", readyCustomer);
        } else {
            showAlert("warning", "餐厅目前没有空位，请耐心等待", 1500);
        }
    }
    waitingBox.addEventListener("click", newWaitingListener); //点击等待顾客点击事件
    let timer = setInterval(() => {
        firstColor += change;
        secondColor -= change;
        let background = "background: linear-gradient(-90deg, #2693ff " + firstColor + "%, #006dd9 0" + ", #006dd9 " + secondColor + "%);";
        waitingTimeBox.setAttribute("style", background);
        if (firstColor === 100) { //等待了5秒，要删去一个
            clearInterval(timer);
            if (waitingList.indexOf(id_temp) !== -1) {
                //删除该元素
                delWaitCustomer(parentElement, waitingBox, "impossible", id_temp);
                waitingList.shift();
            }
        }
    }, waitingTime);
}

/*删除等待列表中的顾客,修改顾客状态值*/
function delWaitCustomer(parentElement, waitingBox, status, id) {
    if (typeof waitingBox === 'object') {
        if (parentElement.children.length > 0) {
            parentElement.removeChild(waitingBox);
        }
        startPadding += changePadding;
        paddingLeft = "padding-left:" + startPadding + "vw";
        parentElement.setAttribute("style", paddingLeft);
        customer[id].status = status;
    }
}

/*处理顾客入座*/
function arrangeSeat(id) {
    for (let i in table) {
        if (table[i].canUse === true) { //代表桌子可用
            table[i].id = id;
            eatingNumber++;
            //打开菜单
            showMenu(id, i);
            break;
        }
    }
}

/*打开菜单*/
function showMenu(id, seatNumber) {
    let menu = document.getElementById("menu");
    menu.style.display = "block";
    const menuImg = document.getElementById("menu_pic");
    const list = document.getElementsByName("menu");
    const order = document.getElementById("order");
    const quit = document.getElementById("quit");
    let menuId = document.getElementById("menu_title");
    menuImg.src = customer[id].img;
    let text = customer[id].name + "正在点菜，已点0元的菜";
    menuId.innerHTML = text;
    order.setAttribute("style", "background: linear-gradient(180deg, #ded3ba 50%, #d3c6a5 50%);border: 3px solid #938867;color: #938867;");
    //所有选项开始时均置为未选状态
    list.forEach((item) => {
        item.checked = false;
    })
    list.forEach((item) => {
        item.addEventListener("change", () => {
            handleMenu(id);
        })
    })

    const newQuitButtonListener = () => {
        updateCustomerStatus(id, menu);
    }

    quit.removeEventListener("click", quitButtonListener);
    quit.addEventListener("click", newQuitButtonListener);
    quitButtonListener = newQuitButtonListener;

    const newSubmitButtonListener = () => {
        renderTable(seatNumber, id, menu);
    }
    order.removeEventListener("click", submitButtonListener);
    order.addEventListener("click", newSubmitButtonListener);
    submitButtonListener = newSubmitButtonListener;
}

/*渲染桌子*/
function renderTable(seatNumber, id, menu) {
    if (menuCanUse() === true) {
        finishOrder(seatNumber, id);
        //修改桌子颜色和菜品的颜色
        let tableID = judgeTable(seatNumber);
        let parentEleFirst = document.getElementById(tableID).firstChild;
        let parentEleLast = document.getElementById(tableID).lastChild;
        let foodDiv = parentEleLast.childNodes;
        let background = "background: linear-gradient(-90deg, #" + color[seatNumber].color1 + " 50%, #" + color[seatNumber].color2 + " 50%);";
        let backgroundColor = "background-color:#" + color[seatNumber].color2 + ";";
        parentEleFirst.setAttribute("style", background); //渲染桌子
        for (let j in foodDiv) {
            if ((typeof foodDiv[j]) === 'object') {
                foodDiv[j].setAttribute("style", backgroundColor); //渲染菜品
                let firstColor = 0;
                let secondColor = 100;
                let eatingFood = false;
                let background = "";
                let foodName = foodDiv[j].innerHTML;
                let foodPrice = singleFoodPrice(foodName);
                let timer = setInterval(() => {
                    firstColor += cusWaitingChange;
                    secondColor -= cusWaitingChange;
                    background = "background: linear-gradient(-90deg, #" + color[seatNumber].color2 + " " + secondColor + "%, #" + color[seatNumber].color1 + " " + "0,#" + color[seatNumber].color1 + " " + firstColor + "%)";
                    foodDiv[j].setAttribute("style", background);
                    if (finishCookList.length > 0) {
                        for (let k in finishCookList) {
                            if (finishCookList[k].tableID === seatNumber) { //表示是这桌的菜
                                let foodId = finishCookList[k].foodID;
                                //修改菜品对应的颜色
                                if (foodDiv[j].innerHTML === dishes[foodId].name) {
                                    secondColor = 0;
                                    firstColor = 100;
                                    eatingFood = true;
                                    clearInterval(timer);
                                    //然后重新计时吃饭时间
                                    eatFood(seatNumber, foodDiv[j], seatNumber, background, foodPrice);
                                    finishCookList.shift(); //上的菜里删除这道菜,先进先出
                                }
                            }
                            break;
                        }
                    }
                    if (eatingFood === false && secondColor <= 0) { //等待时间已到
                        clearInterval(timer);
                        table[seatNumber].dealCount += 1;
                        getMoney(seatNumber);
                        foodDiv[j].setAttribute("style", "text-decoration:line-through;background-color:#505060;");
                    }
                }, cusWaitingTime / 10);
            } else {
                break;
            }
        }
        getCookList(seatNumber); //生成厨房菜单
        kitchenOpe(); //开始厨房操作
        let renderText = customer[id].name + "完成点餐，等候用餐\n疯狂点击厨师头像可以加速做菜";
        showAlert("remind", renderText, 2000);
        menu.style.display = "none";
    }
}

/*厨房操作*/
function kitchenOpe() {
    for (let i = zz; i < cookingList.length; i++) {
        if (cookingList[i].status !== "wait") { //表示正在做或者已完成
            continue;
        }
        let foodID = cookingList[i].foodID;
        let foodName = dishes[foodID].name;
        let colorID = cookingList[i].colorID;
        // 找到空闲的厨师
        for (let j in chef) {
            if (chef[j].status === "free") {
                cookingList[i].status = "ing";
                let firstColor = 0;
                let secondColor = 120;
                if (j > 1) { // 隐藏厨师的解雇按钮。厨师做菜时不能解雇&&第一个、第二个厨师不能解雇
                    let broEle = document.getElementsByClassName("fireCooker")[j - 1];
                    broEle.style.display = "none";
                }
                let parEle = document.getElementsByClassName("chef")[j];
                let curEle = document.getElementsByClassName("chef-icon")[j];
                let background = "background: linear-gradient(-90deg, #" + color[colorID].color1 + " 50%, #" + color[colorID].color2 + " 50%);";
                curEle.setAttribute("style", background);
                let foodNameDiv = document.createElement("div");
                let id = "cookFood" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds() + "" + i;
                foodNameDiv.className = "cookFood";
                foodNameDiv.id = id;
                foodNameDiv.innerHTML = foodName;
                let backgroundColor = "background-color:#" + color[colorID].color2 + ";";
                foodNameDiv.setAttribute("style", backgroundColor);
                parEle.appendChild(foodNameDiv);
                chef[j].status = "busy";
                if (cookCount > 0) { //如果还有未做的菜
                    kitchenOpe();
                }
                let timer = setInterval(() => { //厨师做菜时间
                    firstColor += cookingChange;
                    secondColor -= cookingChange;
                    let ele = document.getElementById(id);
                    let background = "background: linear-gradient(-90deg, #" + color[colorID].color2 + " " + secondColor + "%, #" + color[colorID].color1 + " " + "0,#" + color[colorID].color1 + " " + firstColor + "%)";
                    ele.setAttribute("style", background);
                    if (firstColor === 120) { //菜做好了
                        cookCount--; //未做数量减少一个
                        zz++; //指针前进一步
                        cookingList[i].status = "finish";
                        finishCookList.push(cookingList[i]); //先进先出
                        chef[j].status = "free";
                        background = "background: linear-gradient(-90deg, #aaa 50%, #ddd 50%);";
                        curEle.setAttribute("style", background);
                        if (j > 1) { // 隐藏厨师的解雇按钮。厨师做菜时不能解雇&&第一个厨师不能解雇
                            let broEle = document.getElementsByClassName("fireCooker")[j - 1];
                            broEle.style.display = "block";
                        }
                        let foodDiv = document.getElementById(id);
                        foodDiv.setAttribute("style", "display:none;");
                        clearInterval(timer);
                    }
                }, cookingTime / 5);
                break;
            }
        }
    }
}

setInterval(() => {
    if (cookingList.length > 0) {
        kitchenOpe();
    }
}, 500);

setInterval(() => {
    let nextDay = true;
    for (let i in customer) {
        if (customer[i].status !== "impossible") {
            nextDay = false;
        }
    }
    if (nextDay) {
        startPadding = 100;
        let clearWaitArea = document.getElementById("wait-box");
        clearWaitArea.innerHTML = "";
        dayCount++;
        day.innerHTML = "D" + dayCount;
        init(); //重新初始化
        if (dayCount % 7 === 0) {
            weekendCount++;
            weekend.innerHTML = "W" + weekendCount;
            let updateMoney = parseInt(income.innerHTML) - (chefNumber * 100);
            income.innerHTML = updateMoney;
        }
    } else if (nextDay) {
        showAlert("warning", "餐厅因经营不善倒闭，请刷新页面重新开始！", 3000);
    }
}, 3000);

/*生成厨房菜单*/
function getCookList(seatNumber) {
    const list = document.getElementsByName("menu");
    for (let i in list) {
        if (list[i].checked === true) {
            cookCount++;
            let cookMsg = {
                tableID: seatNumber,
                foodID: i,
                colorID: seatNumber,
                status: "wait"
            };
            cookingList.push(cookMsg); //将菜号和桌号加入厨房列表
        }
    }
}

/*吃饭*/
function eatFood(seatNumber, foodDivIndex, seatNumber, background, foodPrice) {
    let firstColor = 0;
    let secondColor = 100;
    table[seatNumber].money = parseInt(table[seatNumber].money) + parseInt(foodPrice);
    let timer = setInterval(() => {
        firstColor += eatingChange;
        secondColor -= eatingChange;
        background = "background: linear-gradient(-90deg, #" + color[seatNumber].color2 + " " + firstColor + "%, #" + color[seatNumber].color1 + " " + "0,#" + color[seatNumber].color1 + " " + secondColor + "%)";
        foodDivIndex.setAttribute("style", background);
        if (secondColor <= 0) { //等待时间已到
            //收钱
            table[seatNumber].dealCount += 1;
            getMoney(seatNumber);
            clearInterval(timer);
        }
    }, eatingTime / 5);
}

/*单品收银*/
function singleFoodPrice(foodName) {
    for (let i in dishes) {
        if (dishes[i].name === foodName) {
            return dishes[i].price;
        }
    }
}

/*收银*/
function getMoney(seatNumber) {
    if ((table[seatNumber].dealCount) === (table[seatNumber].list.length)) { //表示吃完了
        let text = "";
        let customerID = table[seatNumber].userID;
        let customerName = customer[customerID].name;
        let income = table[seatNumber].money;
        customer[customerID].status = "impossible";
        if (income > 0) {
            text = customerName + "完成用餐，收获$" + income;
            let totalIncome = document.getElementById("income");
            let totalIncomeT = parseInt(totalIncome.innerHTML);
            totalIncomeT += parseInt(income);
            totalIncome.innerHTML = "" + totalIncomeT;
            let alertDiv = document.getElementById("center_alert_p");
            alertDiv.setAttribute("style", "text-align:center;");
            showAlert("remind", text, 1500);
        } else {
            text = customerName + "失望而归，别再让客人挨饿了";
            showAlert("warning", text, 1500);
        }
        //清理桌子
        cleanTable(seatNumber);
    }
}


/*清理桌子*/
function cleanTable(seatNumber) {
    let tableID = judgeTable(seatNumber);
    let ele = document.getElementById(tableID);
    let renderHtml = "<div></div>"
    ele.innerHTML = renderHtml;
    table[seatNumber] = {
        list: [],
        total: 0,
        canUse: true,
        userID: 0,
        money: 0,
        dealCount: 0
    };
    if (eatingNumber > 0) {
        eatingNumber--; //正在使用的桌子减少1
    }
}

/*更新顾客状态--不点了按钮专用*/
function updateCustomerStatus(id, menu) {
    customer[id].status = "impossible";
    menu.style.display = "none";
}

/*处理菜单*/
function handleMenu(id) {
    let totalPrice = 0;
    let order = document.getElementById("order");
    let menuId = document.getElementById("menu_title");
    const list = document.getElementsByName("menu");
    for (let i in list) {
        if (list[i].checked === true) {
            totalPrice += parseInt(list[i].value);
        }
    }
    let text = customer[id].name + "正在点菜，已点" + totalPrice + "元的菜";
    menuId.innerHTML = text;
    if (menuCanUse()) {
        order.setAttribute("style", "background: linear-gradient(180deg, #ffe699 50%, #ffd24d 50%);border: 3px solid #a2811d;color: #a2811d;");
    } else {
        order.setAttribute("style", "background: linear-gradient(180deg, #ded3ba 50%, #d3c6a5 50%);border: 3px solid #938867;color: #938867;");
    }
}

/*菜单校验*/
function menuCanUse() {
    const list = document.getElementsByName("menu");
    let liangCai = 0,
        zhuCai = 0,
        drinking = 0;
    for (let i in list) {
        if (i < 2) { //凉菜
            if (list[i].checked === true) {
                liangCai++;
            }
        } else if (i < 7) { //主菜
            if (list[i].checked === true) {
                zhuCai++;
            }
        } else { //饮品
            if (list[i].checked === true) {
                drinking++;
            }
        }
    }
    if (liangCai <= 1 && zhuCai === 1 && drinking <= 1) {
        return true;
    }
    return false;
}

/*完成点菜*/
function finishOrder(seatNumber, id) {
    const list = document.getElementsByName("menu");
    table[seatNumber].userID = id;
    for (let i in list) {
        if (list[i].checked === true) {
            table[seatNumber].list.push(i); //将菜号加入到菜表
        }
    }
    let tableList = table[seatNumber].list;
    let parentID = judgeTable(seatNumber);
    let parentElement = document.getElementById(parentID);
    let secondDiv = document.createElement("div");
    secondDiv.className = parentID + "-foodList";
    secondDiv.id = parentID + "-foodList";
    parentElement.innerHTML = "<div id='table" + id + "'>\n" +
        "                    <img src=\"./resources/customer" + id + ".png\">\n" +
        "                </div>"; //只有这种办法行的通
    parentElement.appendChild(secondDiv);
    // 渲染菜单
    let foodList = document.getElementById(parentID + "-foodList");
    for (let j in tableList) {
        let food = document.createElement("div");
        food.className = "food";
        food.innerHTML = dishes[tableList[j]].name;
        foodList.appendChild(food);
    }
    //更改用户状态为eating
    customer[id].status = "eating";
    table[seatNumber].canUse = false;
}

/*判断是哪一张桌子*/
function judgeTable(id) {
    switch (id) {
        case "0": //第一排左边的桌子
            return "table-firstRow-left";
            break;
        case "1": //第一排右边的桌子
            return "table-firstRow-right";
            break;
        case "2":
            return "table-secondRow-left";
            break;
        case "3":
            return "table-secondRow-right";
            break;
    }
    return "null";
}

/*添加厨师*/
function addChef() {
    addChefPage.style.display = "flex";
    let newStyle = ".bar div{padding: 0 2em;}";
    addStyle(newStyle);
    let yes_Btn = document.getElementById("yes-btn");
    let no_Btn = document.getElementById("no-btn");
    yes_Btn.addEventListener("click", sureAddBtn);
    no_Btn.addEventListener("click", notAddBtn);
}

/*确定添加*/
function sureAddBtn() {
    let totalIncome = document.getElementById("income");
    let totalIncomeT = parseInt(totalIncome.innerHTML);
    if (chefNumber > 4) {
        showAlert("warning", "已达到招聘上限！", 1500);
        return;
    } else if (totalIncomeT < 100) {
        showAlert("warning", "您的金额不足以招聘厨师！", 1500);
        return;
    } else {
        removeStyle();
        let chefDiv = document.createElement("div");
        chefDiv.innerHTML = "<div class=\"chef-icon\">\n" +
            "                <img src=\"./resources/cooker.png\">\n" +
            "            </div>\n" +
            "            <div id=\"chef_" + chefNumber + "\" class=\"fireCooker\">\n" +
            "                X\n" +
            "            </div>";
        chefDiv.className = "chef";
        let cookDiv = document.getElementById("cook");
        let addChefDiv = document.getElementById("add-chef");
        cookDiv.insertBefore(chefDiv, addChefDiv);
        let style = ".chef {\n" +
            "    height: 25vw;\n" +
            "}\n" +
            "\n" +
            ".cook {\n" +
            "    margin-bottom: 5vh;\n" +
            "}";
        addStyle(style);
        addChefPage.style.display = "none";
        chef[chefNumber] = { status: "free" };
        let delChefDiv = document.getElementById("chef_" + chefNumber);
        const addChefButtonListener = () => {
            delChef("chef_" + (chefNumber - 1));
        };
        delChefDiv.removeEventListener("click", delChefButtonListener);
        delChefDiv.addEventListener("click", addChefButtonListener);
        delChefButtonListener = addChefButtonListener;
        chefNumber++;
        showAlert("remind", "招聘厨师成功！您已经有" + chefNumber + "名厨师", 1500);
        totalIncomeT -= 100;
        totalIncome.innerHTML = "" + totalIncomeT;
        kitchenOpe();
    }
}

/*删除厨师*/
function delChef(chefID) {
    fireDiv.style.display = "flex";
    let newStyle = ".bar div{padding: 0 2em;}";
    addStyle(newStyle);
    let yes_Btn = document.getElementById("sure-fire-btn");
    let no_Btn = document.getElementById("not-fire-btn");
    const fireChefButtonListenerT = () => {
        sureFireBtn(chefID);
    };
    yes_Btn.removeEventListener("click", fireChefButtonListener);
    yes_Btn.addEventListener("click", fireChefButtonListenerT);
    fireChefButtonListener = fireChefButtonListenerT;
    no_Btn.addEventListener("click", notFireBtn);
}

/*不解除*/
function notFireBtn() {
    fireDiv.style.display = "none";
    removeStyle();
}

/*确定解除厨师*/
function sureFireBtn(chefID) {
    let income = document.getElementById("income");
    let remainMoney = parseInt(income.innerHTML);
    if (parseInt(income.innerHTML) < 140) {
        showAlert("warning", "你的金额以及不足支付解约金", 1500);
    } else {
        fireDiv.style.display = "none";
        if (chefNumber === 3) { //两行变一行
            removeStyle();
            removeStyle();
        }
        let cookDiv = document.getElementById("cook");
        let removeChefDiv = document.getElementById(chefID);
        cookDiv.removeChild(removeChefDiv.parentNode);
        showAlert("remind", "解约厨师成功，解约支出￥140", 1500);
        remainMoney -= 140;
        income.innerHTML = remainMoney;
        let chefIndex = chefID.split("_")[1];
        delete chef[chefIndex];
        chefNumber--;
    }
}

/*放弃添加厨师*/
function notAddBtn() {
    addChefPage.style.display = "none";
    removeStyle();
}

/*新增样式*/
function addStyle(newStyle) {
    let style = document.getElementById("HTT_Style");
    style.appendChild(document.createTextNode(newStyle));

}

/*恢复样式*/
function removeStyle() {
    let delStyle = document.getElementById("HTT_Style");
    delStyle.removeChild(delStyle.lastChild);
}