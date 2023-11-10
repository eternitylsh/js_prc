const op_html = document.querySelector('#ex')

const cylinder = {
    active_obj: op_html.querySelector('#sbox1'),
    ani: {
        tumbling:  {
            front: [
                { transform: 'translateX(0rem)' },
                { transform: 'translateX(15rem)' },
            ],
            back: [
                { transform: 'translateX(15rem)' },
                { transform: 'translateX(0rem)' },
            ]
        },
        timing: {
            duration: 1000,
            iterations: 1,
            fill: "forwards",
        },
        delay: {
            front: 0,
            after: 0,
        },
    },
    play_obj: null,
    // set 순서 : delay(front, after), duration(play time), 등등..
    // 여기서 단일변수의 경우 공통으로 적용.
    OnSetConfig( __d, __ptime = 1000) {
        if( 'object' === typeof(__d) ) {
            if( 2 >= __d.length) {
                cylinder.ani.timing.delay = __d[0]
                cylinder.ani.delay.after = __d[1]
            } else 
            console.error( "duration type error", typeof(__d), __d )
        } else if ( 'number' === typeof(__d) ) {
            cylinder.ani.timing.delay = __d
            cylinder.ani.delay.after = __d
        } else
            console.error( "duration type error", typeof(__d), __d )
        
        cylinder.ani.timing.duration = __ptime
    },
    OnPlay() {
        window.setTimeout( () => {
            this.play_obj = this.active_obj.animate(this.ani.tumbling.front, this.ani.timing)
            this.play_obj.play()
            window.setTimeout( () => {
                this.play_obj = this.active_obj.animate(this.ani.tumbling.back, this.ani.timing)
                this.play_obj.play()
            }, Number(this.ani.delay.after) + Number(this.ani.timing.duration) )
        }, Number(this.ani.delay.front) ) 
    },
    OnCon_Play(repeat) { // -1 이면 무한.
        if( 0 < repeat ) {
            cylinder.ani.timing.iterations = repeat
        } else if ( -1 === repeat ) {
            cylinder.ani.timing.iterations = Infinity
        } else {
            console.error( 'wrong input repeat', repeat )
            return -1;
        }

        this.OnPlay()
    },
    OnStop() {
        this.play_obj.cancel()
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('#menu')
    const id_btns = menu.querySelector('#btns')
    const sets = menu.querySelectorAll('#config input')

    const btns = {
        start: id_btns.querySelector('#start'),
        con_start: id_btns.querySelector('#cstart'),
        stop: id_btns.querySelector('#stop')
    }

    btns.start.addEventListener('click', () => {
        const btime = sets[1].value
        const atime = sets[2].value
        if( 0 < btime.length && 0 < atime.length ) {
            // 1: before delay, // 2: after delay.
            cylinder.OnSetConfig([sets[1].value, sets[2].value])
        }
        
        cylinder.OnPlay()
    } )

    btns.con_start.addEventListener('click', () => {
        const _c = sets[0].value // 0 : 반복횟수.

        const btime = sets[1].value
        const atime = sets[2].value
        if( 0 < btime.length && 0 < atime.length ) {
            // 1: before delay, // 2: after delay.
            cylinder.OnSetConfig([sets[1].value, sets[2].value])
        }

        if ( 0 < _c.length )
            cylinder.OnCon_Play(Number(_c))
    } )

    btns.stop.addEventListener('click', () => {
        cylinder.OnStop()
    } )
})