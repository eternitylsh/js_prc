// const op_aside = document.querySelector('#aside')

const CountI = {
    obj: null,
    
    OnInit(__id) {
        const __objarea = op_aside.querySelectorAll(__id)
        this.obj = __objarea[__objarea.length - 1]
    },
    OnCountView(__c) {
        this.obj.innerText = __c
    },
}