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
        count: 0,
    },
    front_d_ids: [null, null],
    play_obj: null,
    cylinder(__id) {
        this.active_obj = op_html.querySelector(__id)
        this.OnInit()
    },
    cylinder() {
        this.OnInit()
    },
    OnInit() {
        this.loop.n_count = 0
        this.loop.count = 0
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
                this.ani.delay.front = __d[0]
                this.ani.delay.after = __d[1]
            } else 
                console.error( "duration type error", typeof(__d), __d )
        } else if ( 'number' === typeof(__d) ) {
            this.ani.delay.front = __d
            this.ani.delay.after = __d
        } else
            console.error( "duration type error", typeof(__d), __d )
        
        this.ani.timing.duration = __ptime
    },
    OnPlay(inc_cb, t_play) {
        this.loop.count++
        inc_cb(this.loop.count)
        if( 0 < this.ani.delay.front ) {
            t_play.OnReInit()
            t_play.OnStart()
        }
            
        this.front_d_ids[0] = window.setTimeout( () => {
            t_play.OnStop()
            this.ani.timing.fill = "forwards"
            this.play_obj = this.active_obj.animate(this.ani.tumbling, this.ani.timing)
            this.play_obj.play()

            this.play_obj.addEventListener('finish', () => {
                // 0 : front settime id..
                if( 0 < this.ani.delay.front ) {
                    t_play.OnReInit()
                    t_play.OnStart()
                }
                if( null !== this.front_d_ids[0] ) {
                    this.front_d_ids[1] = window.setTimeout( () => {
                        t_play.OnStop()
                        this.ani.timing.fill = "backwards"
                        this.play_obj = this.active_obj.animate(this.ani.tumbling, this.ani.timing)
                        this.play_obj.reverse()
                    }, Number(this.ani.delay.after) )
                }
            })
        }, Number(this.ani.delay.front) ) 
    },
    OnCon_Play(repeat, inc_cb, t_play) { // -1 이면 무한.
        if( null !== this.loop.id ) {
            console.warn( '정지 후 실행.', this.loop.id )
            return -1
        }

        const i_time = Number(this.ani.delay.front) + Number(this.ani.delay.after) + ( Number(this.ani.timing.duration) * 2 )
            
        if( 0 < repeat ) {
            // console.log( this.ani.delay.front, this.ani.delay.after, Number(this.ani.delay.front) + Number(this.ani.delay.after) + ( Number(this.ani.timing.duration) * 2 ) )

            this.loop.id = window.setInterval( () => {
                // console.log( this.loop.n_count, repeat, repeat <= this.loop.n_count )
                if( repeat <= this.loop.n_count ) {
                    window.clearInterval( this.loop.id )
                    this.loop.id = null
                    this.loop.n_count = 0
                    
                    this.OnStop()
                } else {
                    this.loop.n_count++
                    // console.log( "call on play", this.loop.n_count, repeat )
                    this.OnPlay(inc_cb, t_play)
                }
            }, i_time ) 
        } else if ( -1 === repeat ) {
            this.loop.id = window.setInterval( () => {
                this.OnPlay(inc_cb, t_play)
            }, i_time ) 
        } else {
            console.error( 'wrong input repeat', repeat )
            return -1
        }

        this.loop.n_count++
        this.OnPlay(inc_cb, t_play)
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
    },

    GetNCount() { return this.loop.n_count },
}