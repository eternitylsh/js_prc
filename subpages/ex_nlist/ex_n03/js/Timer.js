const op_aside = document.querySelector('#aside')

const Timer = {
    obj: null,
    interval: 10, // ms 단위
    id: null,
    time: {
        ms: 0,
        sec: 0,
        min: 0,
    },
    OnInit(__obj) {
        const __objarea = op_aside.querySelectorAll(__obj)
        this.obj = __objarea[__objarea.length - 1]

        this.time.ms = 0
        this.time.sec = 0
        this.time.min = 0

        this.id = null
    },
    OnStart() {
        this.id = window.setInterval( () => {
            this.OnUpdate()
            this.OnTimeView()
        }, this.interval )
    },
    OnUpdate() {
        this.time.ms += this.interval
    },
    OnTimeView() {
        
        if( 1000 <= this.time.ms ) {
            this.time.sec += 1
            this.time.ms = 0
        }

        if( 60 <= this.time.sec ) {
            this.time.min += 1
            this.time.sec = 0
        }

        if( 60 <= this.time.min ) {
            this.time.min = 0
        }

        let ms = this.time.ms / this.interval 
        ms = 10 > ms ? `0${ms}` : ms
        const sec = 10 > this.time.sec ? `0${this.time.sec}` : this.time.sec
        const min = 10 > this.time.min ? `0${this.time.min}` : this.time.min

        this.obj.innerText = `${min}:${sec}:${ms}`
    },
    OnStop() {
        if( null !== this.id ) {
            window.clearInterval(this.id)
            this.id = null
        }
        
        this.time.ms = 0
        this.time.sec = 0
        this.time.min = 0

        this.OnTimeView()
    },
}