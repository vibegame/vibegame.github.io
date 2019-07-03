let solution = 0,
    instance = "1+(3*6*10*9*3)+5",
    inst_obj = splitInstance(0),
    d = 0;
    function splitInstance(pos) {
        let obj = [];
        let k = 1;
        obj[0] = "";
        for(let i = pos;i<instance.length;i++) {
            if(instance[i] == ")") {
                k--;
            }
            else if(instance[i] == "(") {
                k++;
                if(k<3)
                    obj[obj.length - 1] = splitInstance(i+1);
            }
            else if(k >= 2) {
                continue;
            }
            else if(instance[i] == "*" || instance[i] == "/" || instance[i] == "-" || instance[i] == "+") {
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
                return obj;
            }
        }
        return obj;
    }
    function solveInstation(obj) {
        let solution = 0;
        let k = 0;
        if(obj[k] == "-") {
            solution= +obj[k+1];
            solution = -solution;
            k+=2;
        } else {
            solution += +obj[k];
            k++;
        }
            
        console.log(solution); 
        for (let i = k; i < obj.length; i++) {
            if(Array.isArray(obj[i+1])) {
                obj[i+1] = solveInstation(obj[i+1]);                    
            } else if(obj[i] == "*") {
                obj[i] = obj[i-1]*obj[i+1];
                obj[i-1] = obj[i];
                obj[i+1] = obj[i];
                i++; 
            } else if(obj[i] == "/") {
                obj[i-1] = obj[i-1]/obj[i+1];
                obj[i-1] = obj[i];
                obj[i+1] = obj[i];
                i++; 
            }
            console.log(obj);            
        }
        for (let i = k; i < obj.length; i++) {
            if(Array.isArray(obj[i+1])) {
                obj[i+1] = solveInstation(obj[i+1]);                    
            } 
            if(obj[i] == "+") {
                solution += +obj[i+1];
                i++;   
            } else if(obj[i] == "-") {
                solution -= +obj[i+1];
                i++;
            }
            console.log(solution);            
        }
        return solution;
    }
    solveInstation(inst_obj);
    console.log(inst_obj);



