function buildWrapper(tag) {
    function createElement(tag, obj) {
        let element = {};
        element.tag =  tag;
        if(obj) {
            element.properties = obj;
        }
        element.text = "";
        return element;
    }
    return function(str, obj) {
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
                    new_str += hashOfSymbols[str[i]];
                    continue;
                }
                new_str+=str[i];
            }
            return new_str;
        }

        let wrap = createElement(tag, obj),
            properties = ``;

        wrap.text = transpHTML(str);
        for(let key in wrap.properties) {
            properties += ` ${key}="${wrap.properties[key]}"`;
        }

        return `<${wrap.tag}${properties}>${wrap.text}</${wrap.tag}>`;
    }
}
var wrapP = buildWrapper("P");
console.log( wrapP("Вкусные M&M's") );