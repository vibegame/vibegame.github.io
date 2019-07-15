function buildWrapper(tag) {
    function createElement(tag) {
        let element = {};
        element.firstTag =  `<${tag}>`;
        element.secondTag = `<\/${tag}>`;
        element.text = "";
        return element;
    }
    let element = createElement(tag);
    return function(str) {
        function transpHTML(str) {
            let new_str = '';
            let hashOfSymbols = {
                "\"": "&quot;",
                "\'": "&apos;",
                "&": "&amp;",
                ">": "&gt;",
                "<": "&lt;",
                "-": "&ndash;"
            };
            for(let i = 0;i<str.length;i++) {
                if(str[i] in hashOfSymbols) {
                    new_str+=hashOfSymbols[str[i]];
                    continue;
                }
                new_str+=str[i];
            }
            return new_str;
        }
        let wrap = element;
        wrap.text = transpHTML(str);
        return wrap.firstTag + wrap.text + wrap.secondTag;
    }
}
var wrapP = buildWrapper("P");
console.log( wrapP("Вкусные M&M's") );