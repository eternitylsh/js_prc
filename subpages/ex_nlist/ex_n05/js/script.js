const op_html = document.querySelector('#ex')



const OnInit = () => {
    Water.OnInit([
        document.querySelector('.tank .wave'),
        document.querySelector('.tank .water')
    ])
    
}

document.addEventListener('DOMContentLoaded', () => {


    OnInit()
})