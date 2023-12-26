
const motor1 = {
    obj: null,
    act_obj: null,
    OnInit(__id) {
        this.obj = document.querySelectorAll( __id )[0]
        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }

        // childNode > text div.m_active text
        this.act_obj = this.obj.childNodes[1]
        if( 'undefine' === this.act_obj )    {
            console.error("none obj : " + this.act_obj)
        }
    },

    OnPlay() {
        this.act_obj.style.display = 'inline-block'
    },

    OnStop() {
        this.act_obj.style.display = 'none'
    },
}

const motor2 = {
    obj: null,
    act_obj: null,
    OnInit(__id) {
        this.obj = document.querySelectorAll( __id )[1]
        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }

        // childNode > text div.m_active text
        this.act_obj = this.obj.childNodes[1]
        if( 'undefine' === this.act_obj )    {
            console.error("none obj : " + this.act_obj)
        }
    },

    OnPlay() {
        this.act_obj.style.display = 'inline-block'
    },

    OnStop() {
        this.act_obj.style.display = 'none'
    },
}

const Lamp = {
    obj: null,
    OnInit(__id) {
        this.obj = document.querySelector( __id )
        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }
    },
    OnLight() {
        this.obj.style.backgroundImage = "url(res/ton_redlight.png)"
    },
    OffLight() {
        this.obj.style.backgroundImage = "url(res/toff_redlight.png)"
    },
}

const Booser = {
    obj: null,
    OnInit(__id) {
        this.obj = document.querySelector( __id )
        if( 'undefine' === this.obj )    {
            console.error("none obj : " + this.obj)
        }
    },
    OnAct() {
        this.obj.style.backgroundImage = "url(res/act_sound.png)"
    },
    OnNoneAct() {
        this.obj.style.backgroundImage = "url(res/non_sound.png)"
    },
}

const If_Manager = {
    ids: {
        Lamp: {
            loopid: null,
            time: 1000,
            state: false,
        },
    },
    OnInit() {
        motor1.OnInit('.motor')
        motor2.OnInit('.motor')
        Lamp.OnInit('#redlamp')
        Booser.OnInit('#sound')
    },

    

    // On One Sec Lamp Loop.
    OnOSLL() {
        this.ids.Lamp.loopid = setInterval( () => {
            if ( this.ids.Lamp.state )
                Lamp.OnLight()
            else
                Lamp.OffLight()

            this.ids.Lamp.state = !this.ids.Lamp.state
        }, this.ids.Lamp.time )
    },
}