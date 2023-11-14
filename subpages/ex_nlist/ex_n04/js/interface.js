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