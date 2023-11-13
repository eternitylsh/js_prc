const op_html = document.querySelector('#ex')

const cylinder = {
    active_obj: op_html.querySelector('#sbox1'),
    ani: {
        tumbling:  [
            { transform: 'translateX(0rem)' },
            { transform: 'translateX(15rem)' },
        ],
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
    loop: {
        id: null,
        repeat: 0,
        n_count: 0,
    },
    front_d_ids: [null, null],
    play_obj: null,
    cylinder() {
        this.OnInit()
    },
    OnInit() {
        this.loop.n_count = 0
        this.loop.repeat = 0
        this.loop.id = null
        this.front_d_ids = this.front_d_ids.fill(null)
        this.play_obj = null
    },
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
        this.front_d_ids[0] = window.setTimeout( () => {
            this.ani.timing.fill = "forwards"
            this.play_obj = this.active_obj.animate(this.ani.tumbling, this.ani.timing)
            this.play_obj.play()

            this.play_obj.addEventListener('finish', () => {
                // 0 : front settime id..
                if( null !== this.front_d_ids[0] ) {
                    this.front_d_ids[1] = window.setTimeout( () => {
                        this.ani.timing.fill = "backwards"
                        this.play_obj = this.active_obj.animate(this.ani.tumbling, this.ani.timing)
                        this.play_obj.reverse()
                    }, Number(this.ani.delay.after) )
                }
            })
        }, Number(this.ani.delay.front) ) 
    },
    OnCon_Play(repeat) { // -1 이면 무한.
        if( null !== this.loop.id ) {
            console.warn( '정지 후 실행.', this.loop.id )
            return -1
        }
            
        if( 0 < repeat ) {
            console.log( this.ani.delay.front + this.ani.delay.after + this.ani.timing.duration )
            this.loop.id = window.setInterval( () => {
                this.loop.n_count++;
                this.OnPlay()
                

                console.log( this.loop.n_count, repeat, repeat <= this.loop.n_count )
                if( repeat <= this.loop.n_count ) {
                    window.clearInterval( this.loop.id )
                    this.loop.id = null
                    this.loop.n_count = 0
                    
                    this.OnStop()
                }
            }, Number(this.ani.delay.front) + Number(this.ani.delay.after) + Number(this.ani.timing.duration) * 2 ) 
        } else if ( -1 === repeat ) {
            console.log("무한루프..")
            this.loop.id = window.setInterval( () => {
                this.OnPlay()
            }, Number(this.ani.delay.front) + Number(this.ani.delay.after) + Number(this.ani.timing.duration) * 2 ) 
        } else {
            console.error( 'wrong input repeat', repeat )
            return -1
        }

        this.OnPlay()
    },
    OnStop() {
        this.play_obj.cancel()

        this.front_d_ids.forEach( (e, idx) => {
            if( null !== e )
                window.clearTimeout(e)
            this.front_d_ids[idx] = null
        } )

        if( null !== this.loop.id ) {
            window.clearInterval( this.loop.id )
            this.loop.id = null
        }
        
        this.OnAniInit()
    },
    OnAniInit() {
        this.play_obj = this.active_obj.animate(this.ani.tumbling, this.ani.timing)
        this.play_obj.pause()
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