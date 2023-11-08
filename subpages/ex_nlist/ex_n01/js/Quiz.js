const op_html = document.querySelector('#ex')

const QuizInv_State = [false, false, false]
const turn = ["off", "on"]

const OnLampSwitch = (obj, idx) => {
    const _idx = idx - 1
    const n_flag = flag_check(_idx) 
    obj.src = `./res/lamp_${turn[Number(n_flag)]}.png`
    QuizInv_State[Number(_idx)] = n_flag
    console.log( QuizInv_State, _idx, n_flag )
}

const OnInitLampSwitch = (obj) => {
    obj.src = `./res/lamp_${turn[0]}.png`
}

// 켜지면 안된다면 false. 가능하면 true.
const flag_check = t_idx => { // bool
    let flag = true
    QuizInv_State.forEach( (e, idx) => {
        if( t_idx !== idx ) {
            if( e ) {
                flag = false // 혹여나 모르니..
                return false // for each 에서 break.
            }
        }
    } )

    return flag
}

const OnInit = ( initobjs ) => {
    QuizInv_State.forEach( (e, idx) => {
        QuizInv_State[idx] = false
        OnInitLampSwitch(initobjs[idx])
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const Lamps = document.querySelectorAll('#lamps img')
    const switches = document.querySelectorAll('#lamps button')
    const Initbtn = document.querySelector('#init button')

    switches.forEach( e => {
        e.addEventListener('click', _e => {
            const _p = _e.target.parentNode
            const idx = _p.id[_p.id.length - 1]
            OnLampSwitch(_p.childNodes[1], idx)
        })
    } )

    Initbtn.addEventListener('click', () => {
        OnInit(Lamps)
    })
})