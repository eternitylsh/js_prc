const op_html = document.querySelector('#ex')

const Lamps = {
    flags: [false, false, false, false],
    turn: ['off', 'on'],

    OnLampSwitch (obj, idx) {
        const n_flag = !this.flags[Number(idx)] 
        obj.src = `./res/lamp_${this.turn[Number(n_flag)]}.png`
        this.flags[Number(idx)] = n_flag
    },

    OnLampInit(obj, idx) {
        this.flags[idx] = false
        obj.src = `./res/lamp_${this.turn[Number( this.flags[idx] )]}.png`
    },
}

// 어떻게 불이 켜질지 정하는 객체.
const Lamp_architect = {
    lamps: document.querySelectorAll('#lamps img'),
    t_ids: [null, null, null, null],
    t_count: 0,

    OnLamp (idx) {
        console.log( this.lamps[idx] )
        Lamps.OnLampSwitch(this.lamps[idx], idx)
    },

    OnLampTrigger () {
        const la = Lamp_architect // 별칭용.
        la.OnLamp(la.t_count)
        la.t_count++

        if( la.t_ids.length > la.t_count )
            la.t_ids[la.t_count] = window.setTimeout(la.OnLampTrigger, 1000)
    },

    OnLampInit() {
        for( let i = 0; i < this.lamps.length; i++ )
            Lamps.OnLampInit( this.lamps[i], i)
    },

    // 아래 이벤트 호출함수. 전역으로 보고..
    OnStart (e) {
        // 0 에서 부터 시작.
        const la = Lamp_architect // 별칭용.
        
        la.t_ids[la.t_count] = window.setTimeout(la.OnLampTrigger, 1000)
    },
    OnStop (e) {
        Lamp_architect.t_ids.forEach( e_id => {
            if( null !== e_id )
                window.clearTimeout( e_id )
        });

        Lamp_architect.OnInit()
    },
    OnInit (e) {
        const la = Lamp_architect // 별칭용.
        la.t_count = 0
        la.t_ids = la.t_ids.fill(null)
        la.OnLampInit()
    },
}



document.addEventListener('DOMContentLoaded', () => {
    
    const menu_btns = document.querySelectorAll('#menu button')

    // start btn.
    menu_btns[0].addEventListener('click', Lamp_architect.OnStart)
    // stop btn.
    menu_btns[1].addEventListener('click', Lamp_architect.OnStop)
    // Init btn.
    menu_btns[2].addEventListener('click', Lamp_architect.OnInit)
})