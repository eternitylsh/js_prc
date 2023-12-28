
const Wamount = {
    now: 100,// %
    max: null,
    min: null,

    obj: null,
    display: null,

    OnInit( __id, __max, __min ) {
        this.max = __max
        this.min = __min

        this.obj = document.querySelector(__id)
        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }

        this.display = this.obj.childNodes[3]
        if( 'undefine' === this.display )    {
            console.error("none obj : " + this.display)
        }
    },

    OnUpdate( __data ) {
        this.display.innerText = `${(__data * ( this.max / 100) )}L`
    },
}

const Wheight = {
    now: 100, // %
    max: 350, // base..
    min: 0,

    obj: null,
    display: null,

    OnInit( __id, __max, __min ) {
        this.max = __max
        this.min = __min

        this.obj = document.querySelector(__id)
        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }

        this.display = this.obj.childNodes[3]
        if( 'undefine' === this.display )    {
            console.error("none obj : " + this.display)
        }
    },

    OnUpdate( __data ) {
        this.display.innerText = `${__data * ( this.max / 100)}m`
    },
}

const WSpeed = {

    obj: null,
    display: null,

    OnInit( __id ) {

        this.obj = document.querySelector(__id)
        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }

        this.display = this.obj.childNodes[3]
        if( 'undefine' === this.display )    {
            console.error("none obj : " + this.display)
        }
    },

    OnUpdate( __data ) {
        this.display.innerText = `${__data}m/s`
    },
}

const Wstate = {

    obj: null,
    display: null,

    state: ['저수위', '중수위', '고수위'],

    OnInit( __id ) {

        this.obj = document.querySelector(__id)
        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }

        this.display = this.obj.childNodes[3]
        if( 'undefine' === this.display )    {
            console.error("none obj : " + this.display)
        }
    },

    OnUpdate(__data) {
        // 이 3가지 뿐.. 그래서 0: 저, 1: 중, 2: 고; 로 받아야함.
        this.display.innerText = `${state[__data]}`
    },
}

const nav = {
    OnInit( __wamount, __wheight ) { 
        Wamount.OnInit('#wamount', __wamount.max, __wamount.min)
        Wheight.OnInit('#wheight', __wheight.max, __wheight.min)
        WSpeed.OnInit('#wspeed')
        Wstate.OnInit('#wstate')
    },

    WamountUpdate( __data ) {
        
    },

    WheightUpdate( __data ) {

    },

    WspeedUpdate( __data ) {

    },

    // __data << 0, 1, 2
    WstateUpdate( __data ) {

    },
}