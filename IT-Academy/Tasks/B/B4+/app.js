function findShortestWayToWord(dic, start, end) {
    function isNextWord(main_word, next_word) { // Функция на проверку 2 данных слов: являются ли они соседями?
        let number = 0;
        for(let i = 0;i<main_word.length;i++) {
                if(main_word[i] != next_word[i]) { // Если буква не равна соответствующей букве на этой позиции, то считаем сколько таких букв
                    number++;
                }
                if(number > 1) // если таких букв больше, чем 1, то слова не являются соседями
                    return false;
        }
        if(number == 0) // если нет таких букв, то слова одинаковые, возвращаем False
            return false;
        return true;
    }
    function createGraph(dic) { // создаем граф на основе словаря и "слов-соседей"
        dic.push(start, end); // добавляем начальное слово и конечное в наш словарь
        let graph = {};
        for(let i = 0; i < dic.length; i++) {
            graph[dic[i]] = [];
            for(let j = 0; j < dic.length; j++) {
                if(isNextWord(dic[i], dic[j])) // если слова являются соседями, то добавляем соседа
                    graph[dic[i]].push(dic[j]);
            }        
        }
        return graph;
    }
    function addQueue(queue, array) { // создание очереди. В JS она отсутствует, и нужно создавать свою
        function howToNextWord(word) {
            let number = 0;
            for(let i = 0; i < word.length; i++) {
                if(word[i] == end[i]) { // Если буква равна соответствующей букве на этой позиции, то считаем сколько таких букв
                    number++;
                }
            }
            return number;
        }
        array.sort(function(a, b) {
            return howToNextWord(b) - howToNextWord(a); // сначала берем ближайшие к целевому слову, а только потом другие
        });
        
        for(let i = 0;i<array.length;i++) {
            queue.push(array[i]);  // добавляем массив в очередь
        }
        return queue;
    }
    function breadthFirstSearch(graph) { // Реализация идет через поиск в ширину. Ребра все равны, поэтому этот алгоритм самый подходящий.
        let searched = new Set(), // коллекция, которая будет хранить значения слов, которые мы уже проверили
                                  // она также будет хранить наш конечный результат, который мы в конце превратим в массив
            search_queue = [], // сама очередь  
            result = [], // конечный массив-результат
            word; // текущее слово
        search_queue = addQueue(search_queue, graph[start]); // добавляем массив соседей слова start
        searched.add(start); // start уже проверено, поэтому закидываем в нашу коллекцию
        while(search_queue.length) { // пока очередь полна, выполняем
            word = search_queue.shift(); // берем первый элемент из очереди
            if(!searched.has(word)) { // если слово уже проверялось, то идем дальше по очереди
                if(word == end) {
                    searched.add(word); // добавляем наше конечное слово в конец для результата
                    searched.forEach((value) => { // образуем нашу коллекцию в конечный массив-результат
                        result.push(value); 
                      });
                    return result;
                }
                else {
                    search_queue = addQueue(search_queue, graph[word]); // добавляем массив соседей слова word
                    searched.add(word); // кидаем word в нашу коллекцию
                }    
            }
        }
        return false;
    }
    let graph = createGraph(dic, start, end);
    return breadthFirstSearch(graph, start, end);
}

let dic = ["ТАРА","ЛИПА","ТУРА","ЛУЖА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];
let start = "МУХА";
let end = "СЛОН";
console.time();
findShortestWayToWord(dic, start, end);

console.timeEnd();