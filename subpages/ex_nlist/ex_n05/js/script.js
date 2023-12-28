const op_html = document.querySelector('content')
const undermenu = document.querySelector('undermenu')

// 원래 이 데이터는 xml이나 json등으로 읽어서 대처할 데이터이나 그냥 이렇게 정의.
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

    // Undermenu interface.
    UnderMenu.OnInit()
}

document.addEventListener('DOMContentLoaded', () => {

    OnInit()
})