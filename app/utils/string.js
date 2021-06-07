export function fill_code(str, char='_', width=16){
    return new Array(width-str.length).join(char) + str;
}
