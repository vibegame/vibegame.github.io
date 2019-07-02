let solution = 0,
    instance = "1+2+3+4",
    inst_obj = [],
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
                if(obj[obj.length - 1])
                    obj.push(instance[i]);
                else
                    obj[obj.length - 1] = instance[i];
                obj.push("");
            } else {
                obj[obj.length - 1]+=instance[i];
            }
            if(k == 0) {
                d--;
                return obj;
            }
        }
        return obj;
    }
    console.log(splitInstance(0));



