const Water = {
    objs: [
        // 0: wave.
        // 1: water.
    ],
    // 일단 이렇게;;
    i_tops: [
        -20, // 0: wave.
        80,// 1: water.
    ],
    play_objs: [null, null],
    ani: {
        tumbling:  [
            { transform: 'translateY(150px)' },
        ],
        timing: {
            duration: 1000,
            iterations: 1,
            easing: "ease-out",
            fill: "forwards",
        },
    },
    
    // 객체 생성을 한다면.. 반드시 해당되는 오브젝트 등록.
    OnInit(__objs) {
        this.objs = __objs
        // for( let i = 0; i < __objs.length; i++) {
        //     this.i_tops.push( Number(__objs[i].style.top) )
        // }
    },
    // 단위기준 px
    OnWaterMove(__to_dst) {
        this.ani.tumbling[0].transform = `translateY(${__to_dst}px)`
        for( let i = 0; i < this.objs.length; i++ ) {
            // this.objs[i].style.top = `${ this.i_tops[i] + __to_dst }px`
            this.play_objs[i] = this.objs[i].animate(this.ani.tumbling, this.ani.timing)
            this.play_objs[i].play()
        }
    }
}

