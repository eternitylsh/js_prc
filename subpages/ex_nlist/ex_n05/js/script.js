const op_html = document.querySelector('content')
const undermenu = document.querySelector('undermenu')

const nav_data = {
    Wamount: {
        max: 100,
        min: 0,
    },

    Wheight: {
        max: 350,
        min: 0,
    },


}

const OnInit = () => {
    // WaterTank.
    Water.OnInit([
        document.querySelector('.tank .wave'),
        document.querySelector('.tank .water')
    ])
    W_control.OnInit()

    // state interface.
    If_Manager.OnInit()

    // nav interface.
    nav.OnInit(nav_data.Wamount, nav_data.Wheight)
}

document.addEventListener('DOMContentLoaded', () => {



    OnInit()
})