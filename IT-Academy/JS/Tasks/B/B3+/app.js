let instance = prompt("Введите ваш пример:", "2*(-3+1)");


    function solveExample(instance) {
        function splitInstance(pos) {
            let obj = [];
            let k = 1;
            obj[0] = "";
            //Каждый раз, когда мы встречаем скобку, то мы создаем массив, в котором будет лежать новый пример, лежащий внутри этих скобок
            //После чего, мы будем с конца решать пример, то есть сначала внутренние массивы, а только потом внешние
            //Умножение и деление идет отдельным решением, потому их нужно решать первыми по законам математики
            //Элемент окончательного массива могут выглядеть так:
            //12 - число
            //+ или -
            //Array[3] = ["1","+","2"] - скобки
            //2*3/5 - умножение и деление в один элемент
            for(let i = pos;i<instance.length;i++) {
                if(instance[i] == ")") {
                    k--;
                }
                else if(instance[i] == "(") {
                    k++;
                    if(k<3) {
                        obj[obj.length - 1] += splitInstance(i+1);
                    }      
                }
                else if(k >= 2) {
                    continue;
                }
                else if(instance[i] == "-" || instance[i] == "+") {
                    if(obj[obj.length - 1]) {
                        obj.push(instance[i]);
                    } 
                    else
                        obj[obj.length - 1] = instance[i];
                    obj.push("");
                } else {
                    obj[obj.length - 1]+=instance[i];
                }
                if(k == 0) {
                    obj = solveInstance(obj) + "";
                    return obj;
                }
            }
            obj = solveInstance(obj); 
            return obj;
        }
        function solveInstance(obj) {
            let result = 1;
            let solution = 0;
            for (let i = 0; i < obj.length; i++) {
                if(isNaN(+obj[i])) { // Здесь мы проверяем строку на умножение или деление
                    result = 1;
                    let nums, split = []; // массивы чисел и знаков умножения и деления
                    if((obj[i][0] == "-" || obj[i][0] == "+") && obj[i].length == 1) { // если встречаем + или -, то пропускаем
                        continue;
                    }
                    for(let j = 0; j < obj[i].length; j++) { // запихиваем в массив split знаки и меняем деление на умножение
                        if(obj[i][j] == "/" || obj[i][j] == "*") {
                            split.push(obj[i][j]);
                            obj[i] = obj[i].substr(0, j) + '*' + obj[i].substr(j + 1);
                        }
                    }
                    nums = obj[i].split('*'); // запихиваем в массив nums все числа, данные в строке
                    result = +nums[0]; // результат изначально равен первому числу, так как будущий массив не будет умножать на его
                    for (let j = 1; j < nums.length; j++) {
                        const e = nums[j];
                        if(split[j-1] == "/") {
                            result /= +e;
                        } else {
                            result *= +e;
                        } 
                    }
                    obj[i] = result;          
                }
                else
                    obj[i] = +obj[i];  
            }
            let k = 0; 
            if(obj[0] == "-") { //если - на первом месте, то в первый элемент нужно записать отрицательное число
                solution = -obj[1];
                k+=2;               
            } else { //иначе положительное число
                solution = obj[0];
                k++;
            }
             // первый элемент не просматривается, поэтому в результат запихиваем первый элемент
            for (let i = k; i < obj.length; i++) {
                if(obj[i] == "+") {
                    solution+=obj[i+1]; // при + складываем
                }
                if(obj[i] == "-") {
                    solution-=obj[i+1]; // при - отнимаем
                }
            }
            return solution;
        }
        return splitInstance(0);
    }

    
    alert(solveExample(instance));



