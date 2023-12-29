// OnWaterMove에서 찰때는 0px, 바닥일때는 350px로 보자.
// 100분율로 높아지고 낮아지는식으로 애니메이션 설정.
// 애니메이션이 너무 느릴경우 water에서 조정.



const W_control = {
    w_obj: null,
    height: {
        max: 0,
        min: 350,
        n_height: 0, // %단위.
        ch_amount: 0, // 1frame당 변화할 양. (%기준..)
        base_decrease: -1,
    },
    loop: {
        d: 500, // base. 0.5s
        obj: null,
    },
    states: {
        arr: [
            'wait',
            'play',
            'stop',
        ],
        now: 'stop',
        warr: [
            'low',
            'mid',
            'high',
        ],
        wnow: 'high',
        wschange: true,
        wcd: [
            10,
            50,
            85,
        ],
        wupdate: [
            1.5,
            1,
            0,
        ],
    },

    OnInit() {
        this.w_obj = Water;
        this.states.now = 'stop'

        // 원래는 감지에 따라...
        this.states.wnow = 'high'
        this.height.n_height = 100

        this.height.ch_amount = 0
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

                // 감지 및 상태 변경.
                // if else 특성 이용...
                for( let i = this.states.warr.length - 1; 0 <= i; i-- ) {
                    if( this.states.wcd[i] < this.height.n_height ) {
                        this.OnSetWstateUpdate(i)
                        break
                    }
                }
                // if( 85 < this.height.n_height ) {
                //     this.OnSetWstateUpdate(2)
                // } else if( 50 < this.height.n_height ) {
                //     this.OnSetWstateUpdate(1)
                // } else if( 10 < this.height.n_height ) {
                //     this.OnSetWstateUpdate(0)
                // } else {}

                // 갱신.
                // 늘 이렇게.
                this.height.ch_amount = this.height.base_decrease

                let target = null
                for( let i = this.states.warr.length - 1; 0 <= i; i-- ) {
                    target = this.states.warr[i]
                    if( target === this.states.wnow ) {
                        this.height.ch_amount = (this.height.ch_amount + this.states.wupdate[i])
                        break
                    }
                }

                // 적용.
                this.height.n_height = this.height.n_height + this.height.ch_amount
                if( 100 >= this.height.n_height ) {
                    if ( 0 <= this.height.n_height ) {
                        // console.log( this.height.n_height, this.loop.state_up )
                        this.w_obj.OnWaterMove( this.GetTargetHeight(this.height.n_height) )
                    }
                }

                // interface 갱신.
                this.OnIF_Update()
            }, this.loop.d)
        }

        if('wait' === this.states.now || 'stop' === this.states.now) {
            window.clearInterval(this.loop.obj)
        }
    },

    // state update.
    OnSetWstateUpdate( __state ) { // 0: low, 1:mid, 2:high로..
        // for if_manage event
        const nval = this.states.warr[__state]
        if( this.states.wnow !== nval )
            this.states.wschange = true

        this.states.wnow = nval
    },

    OnSetSpeed(__s) { // 짧을수록 빨라짐.
        this.loop.d = __s
    },

    GetTargetHeight(__p) {
        const hper = (this.height.min - this.height.max) / 100
        return ( this.height.min - (hper * __p) )
    },

    // __t : this.height.ch_amount // 즉, 변화할 %양을 넣음.
    // min - max 인 이유: 윈도우 룰 처럼 위가 수치가 낮고, 아래가 수치가 높기에..
    GetPerHeightForSpeed( __t ) {
        return ((this.height.min - this.height.max) - this.GetTargetHeight(__t) ) * (1000 / this.loop.d)
    },

    // interface / nav Update.
    OnIF_Update() {
        // interface
        // 아래 실행문은 한 번만 실행되어야 하는데;;;
        if( this.states.wschange ) {
            if( 'low' === this.states.wnow ) 
                If_Manager.OnLowAct()
    
            if( 'mid' === this.states.wnow ) 
                If_Manager.OnMidAct()
            
            if( 'high' === this.states.wnow ) 
                If_Manager.OnHighAct()
            
            this.states.wschange = false
        }
        

        // nav.
        nav.WamountUpdate(this.height.n_height)
        nav.WheightUpdate(this.height.n_height)
        // this.GetTargetHeight(this.height.ch_amount) * 1 / this.loop.d
        nav.WspeedUpdate( this.GetPerHeightForSpeed(this.height.ch_amount) )
        nav.WstateUpdate( this.states.warr.indexOf(this.states.wnow) )
    }
}