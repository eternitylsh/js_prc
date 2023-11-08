const op_html = document.querySelector('#ex')

const Lamps = {
    flags: [false, false, false, false],
    turn: ['off', 'on'],

    OnLampSwitch (obj, idx) {
        const _idx = idx - 1
        const n_flag = !this.flags[Number(_idx)] 
        obj.src = `./res/lamp_${this.turn[Number(n_flag)]}.png`
        this.flags[Number(_idx)] = n_flag
    },
}

// 어떻게 불이 켜질지 정하는 객체.
const Lamp_architect = {
    lamps: document.querySelectorAll('#lamps img'),
    t_ids: [null, null, null, null],
    t_count: 0,
    timer_func: [
        function () { this.OnLamp(t_count); this.t_count++ },
        function () { this.OnLamp(t_count); this.t_count++ },
        function () { this.OnLamp(t_count); this.t_count++ },
        function () { this.OnLamp(t_count); }, // last
    ],
    OnStart (e) {
        // 0 에서 부터 시작.
        this.t_ids[this.t_count] = window.setTimeout(1000, this.timer_func[this.t_count])
    },
    OnStop (e) {
        this.t_ids.forEach( e_id => {
            window.clearTimeout( e_id )
        });

        this.OnInit()
    },
    OnInit (e) {
        this.t_count = 0
        this.t_ids = this.t_ids.fill(null)
    },

    OnLamp (idx) {
        Lamps.OnLampSwitch(this.lamps[idx], idx)
    }
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