// const op_aside = document.querySelector('#aside')

const CountI = {
    obj: null,
    
    OnInit(__id) {
        const __objarea = op_aside.querySelectorAll(__id)
        this.obj = __objarea[__objarea.length - 1]
        console.log(this.obj, __objarea)
    },
    // callback으로 주로쓰여서 this못씀..
    OnCountView(__c) {
        CountI.obj.innerText = __c
    },
}