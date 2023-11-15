// const op_aside = document.querySelector('#aside')

const CountI = {
    obj: null,
    
    CountI() {
        this.OnInit('')
    },
    CountI(__id) {
        this.OnInit(__id)
    },
    OnInit(__id) {
        const __objarea = op_aside.querySelectorAll(__id)
        this.obj = __objarea[__objarea.length - 1]
        console.log(this.obj, __objarea)
    },
    // callback으로 주로쓰여서 this못씀..
    // 다수 객체에서는 실행되는 자신의 객체를 받아야;;
    OnCountView(__obj, __c) {
        __obj.innerText = __c
    },
}