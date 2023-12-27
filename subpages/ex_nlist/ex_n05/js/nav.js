
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
        this.display.innerText = `${__data}L`
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
        this.display.innerText = `${__data}m`
    },
}

const WSpeed = {

    obj: null,

    OnInit( __id ) {

        this.obj = document.querySelector(__id)
        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }
    },

    OnUpdate() {

    },
}

const Wstate = {

    obj: null,

    OnInit( __id ) {

        this.obj = document.querySelector(__id)
        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }
    },

    OnUpdate() {

    },
}

const nav = {
    OnInit( __wamount, __wheight ) { 
        Wamount.OnInit('#wamount', __wamount.max, __wamount.min)
        Wheight.OnInit('#wheight', __wheight.max, __wheight.min)

    }
}