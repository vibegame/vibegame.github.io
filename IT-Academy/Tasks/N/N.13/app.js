class HashStorage {
    constructor() {
        this.mainHash = {};
    }
    addValue(key, value) {
        this.mainHash[key] = value;
    }
    getValue(key) {
        return this.mainHash[key];
    }
    deleteValue(key) {
        if(key in this.mainHash) {
            delete this.mainHash[key];
            return true;
        }
        return false;
    }
    getKeys() {
        let arrKeys = [];
        for(let key in this.mainHash) {
            arrKeys.push(key);
        }
        return arrKeys;
    }
}

var drinkStorage = new HashStorage;

document.querySelector(".btn.add-value").addEventListener("click", function() {
    let key = prompt("Какое название напитка?");
    let alco = confirm("Он алкогольный?");
    let description = prompt("Опишите напиток");
    let hash = {alco: alco,
                description: description};
    drinkStorage.addValue(key, hash);
    return false;
});
document.querySelector(".btn.get-value").addEventListener("click", function() {
    let key = prompt("О каком напитке хотите узнать?");
    let hash = drinkStorage.getValue(key);
    if(hash) {
        alert(`Название напитка: ${key}
Алкогольный: ${hash.alco? "Да" : "Нет"}
Описание: ${hash.description}`);
    } else {
        alert("Такого напитка не существует!");
    }
    return false;
});
document.querySelector(".btn.delete-key").addEventListener("click", function() {
    let key = prompt("Какой напиток хотите удалить?");
    let deleted = drinkStorage.deleteValue(key);
    if(deleted)
        alert("Напиток успешно удален!");
    else
        alert("Не удалось удалить напиток! Его не существует :)");
    return false;
});
document.querySelector(".btn.get-keys").addEventListener("click", function() {
    let keys = drinkStorage.getKeys().join(", ");
    if(!keys) {
        alert("Нет напитков!");
        return false;
    }
    console.log(keys);
    alert(keys);
    return false;
});