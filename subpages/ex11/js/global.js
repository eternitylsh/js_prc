

const strout = {
    html_ln(obj, ...instr) {
        obj.innerHTML += `${instr}<br>`
    },
    html(obj, ...instr) {
        obj.innerHTML += `${instr}<br>`
    },
    clogln: instr => {
        return `${instr}\n`
    }
}

const ArrArange = (min, max) => [...Array(max).keys()].map(key => key + min)



const Gen_rdNumber = (max, min) => {
    let array = new Uint8Array(2);
    crypto.getRandomValues(array);

    // 소금치는 처리. 의미는 없어도..
    return ( ( array[1] + (array[0] * 3)) % max ) + min
}

const ArrRandrange = (len, min, max) => Array(len).fill().map( x => x = Gen_rdNumber(300, 1) )