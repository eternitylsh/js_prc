const op_html = document.querySelector('content')
const undermenu = document.querySelector('undermenu')



const OnInit = () => {
    // WaterTank.
    Water.OnInit([
        document.querySelector('.tank .wave'),
        document.querySelector('.tank .water')
    ])
    W_control.OnInit()

    // state interface.
    If_Manager.OnInit()
}

document.addEventListener('DOMContentLoaded', () => {



    OnInit()
})