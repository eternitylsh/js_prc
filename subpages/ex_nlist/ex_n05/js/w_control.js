// OnWaterMove에서 찰때는 0px, 바닥일때는 350px로 보자.
// 100분율로 높아지고 낮아지는식으로 애니메이션 설정.
// 애니메이션이 너무 느릴경우 water에서 조정.



const W_control = {
    w_obj: null,
    height: {
        max: 0,
        min: 350,
        n_height: 0, // %단위.
    },
    loop: {
        d: 500, // base.
        state_up: true,
        obj: null,
    },
    states: {
        arr: [
            'wait',
            'play',
            'stop',
        ],
        now: 'stop',
    },

    OnInit() {
        this.w_obj = Water;
        this.states.now = 'stop'

        this.height.n_height = 100
    },

/*
        state 모음.
        'wait',
        'play',
        'stop',
*/

    OnWaterPlay() {

        this.states.now = 'play'
        this.OnWaterMoveUpdate()
    },

    OnWaterStop() {
        this.states.now = 'stop'
        this.OnWaterMoveUpdate()
    },

    OnWaterWait() {
        this.states.now = 'wait'
        this.OnWaterMoveUpdate()
    },

    // % > px 해당 함수에 넣어 실행.
    OnWaterMoveUpdate() {

        if('play' === this.states.now ) {
            this.loop.obj = window.setInterval(() => {
             
                // 일단 임시로 작성한거..
                // 추후.. 물빼기 물 주입 등 인터페이스 추가와 더불어서..
                // 연동해보아야..
                if( 100 <= this.height.n_height ) {
                    this.loop.state_up = false
                } else if ( 0 >= this.height.n_height ) {
                    this.loop.state_up = true;
                } else {}
    
                // console.log( this.height.n_height, this.loop.state_up )

                this.w_obj.OnWaterMove( this.GetTargetHeight(this.height.n_height) )
                this.height.n_height = this.loop.state_up ? ++this.height.n_height : --this.height.n_height
    
            }, this.loop.d)
        }

        if('wait' === this.states.now || 'stop' === this.states.now) {
            window.clearInterval(this.loop.obj)
        }
    },

    OnSetSpeed(__s) { // 짧을수록 빨라짐.
        this.loop.d = __s
    },

    GetTargetHeight(__p) {
        const hper = (this.height.min - this.height.max) / 100
        return ( this.height.min - (hper * __p) )
    }
}