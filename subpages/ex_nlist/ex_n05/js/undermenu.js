
const StartBtn = {
    obj: null,
    OnInit( __id ) {
        this.obj = document.querySelector(__id)

        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }

        this.obj.addEventListener('click', () => {
            W_control.OnWaterPlay()
        } )
    }
}

const W_ActBtn = {
    obj: null,
    OnInit( __id ) {
        this.obj = document.querySelector(__id)

        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }

        this.obj.addEventListener('click', () => {

        } )
    }
}

const W_NonactBtn = {
    obj: null,
    OnInit( __id ) {
        this.obj = document.querySelector(__id)

        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }

        this.obj.addEventListener('click', () => {
            
        } )
    }
}

const StopBtn = {
    obj: null,
    OnInit( __id ) {
        this.obj = document.querySelector(__id)

        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }

        this.obj.addEventListener('click', () => {
            W_control.OnWaterStop()
        } )
    }
}

const UnderMenu = {
    OnInit() {
        StartBtn.OnInit('#start')
        StartBtn.OnInit('#mact')
        StartBtn.OnInit('#non_mact')
        StartBtn.OnInit('#stop')
    },
}