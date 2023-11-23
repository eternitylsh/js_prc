const op_html = document.querySelector('#ex')



const OnInit = () => {
    Water.OnInit([
        document.querySelector('.tank .wave'),
        document.querySelector('.tank .water')
    ])
    W_control.OnInit()
}

document.addEventListener('DOMContentLoaded', () => {


    OnInit()
})