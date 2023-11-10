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

        console.log(cylinder.ani.timing)
        this.OnPlay()
    },
    OnStop() {
        this.play_obj.cancel()
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('#menu')
    const id_btns = menu.querySelector('#btns')
    const icount = menu.querySelector('#count input')

    const btns = {
        start: id_btns.querySelector('#start'),
        con_start: id_btns.querySelector('#cstart'),
        stop: id_btns.querySelector('#stop')
    }

    btns.start.addEventListener('click', () => {
        cylinder.OnPlay()
    } )

    btns.con_start.addEventListener('click', () => {
        const _c = icount.value

        if ( 0 < icount.value.length )
            cylinder.OnCon_Play(Number(_c))
    } )

    btns.stop.addEventListener('click', () => {
        cylinder.OnStop()
    } )
})