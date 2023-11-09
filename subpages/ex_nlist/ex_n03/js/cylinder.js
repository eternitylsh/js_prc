const op_html = document.querySelector('#ex')

const cylinder = {
    active_obj: op_html.querySelector('#sbox1'),
    ani: {
        tumbling: [
            { transform: 'translateX(0rem)' },
            { transform: 'translateX(15rem)' },
            { transform: 'translateX(0rem)' },
        ],
        timing: {
            duration: 2000,
            iterations: 1,
        }
    },
    play_obj: null,
    OnPlay() {
        cylinder.ani.timing.iterations = 1
        this.play_obj = this.active_obj.animate(this.ani.tumbling, this.ani.timing)
        this.play_obj.play()
    },
    OnCon_Play(repeat) { // -1 이면 무한.
        if( 0 < repeat ) {
            cylinder.ani.timing.iterations = repeat
        } else if ( -1 === repeat ) {
            cylinder.ani.timing.iterations = -1
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
    const btns = {
        start: menu.querySelector('#start'),
        con_start: menu.querySelector('#cstart'),
        stop: menu.querySelector('#stop')
    }

    btns.start.addEventListener('click', () => {
        cylinder.OnPlay()
    } )

    btns.con_start.addEventListener('click', () => {
        
    } )

    btns.stop.addEventListener('click', () => {
        cylinder.OnStop()
    } )
})