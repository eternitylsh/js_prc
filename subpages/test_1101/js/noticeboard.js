const board = {
    bstate: {
        l_board: document.querySelector('main #l_board'),
        p_board: document.querySelector('main #postboard'),
        d_board: document.querySelector('main #d_board'),
    },
    data: {
        h_key: 'pdata-',
        keys: ["num", "title", "creator", "date", "info", "file"],
        t_idx: {
            date: 3,
            file: this.data.keys.length - 1,
            l_board_e: 1,
        },
        main_viewlen: 4,
        now_date: '',
        b_count: 0,
    },
    control: {
        now_board: -1,
        is_mod: false,
    },
    OnEditboard() { // 2번째 활성화
        Object.values(this.bstate).forEach( _t => {
            if( this.bstate.p_board === _t )
                _t.style.display = 'block'
            else
                _t.style.display = 'none'
        } )

        this.OnEditboard_Init()
    },

    // Edit Init.
    OnEditboard_Init() {
        this.OnEditboard_Reset()

        // 2: 들어가려는 데이터의 날짜 인덱스.(리셋대비;;)
        this.bstate.p_board.querySelector('#cp_date span').innerHTML = this.GetNowDate()
    },

    // Edit func >> Reset func.
    OnEditboard_Reset() {
        const getDatas = this.bstate.p_board.getElementsByClassName('in_data')
        
        for( let i = 0; i < getDatas.length; i++)
            getDatas[i].value = ''
    },

    // 글 게시.
    OnUploadBoard() {

        if(  this.control.is_mod ) {
            if(-1 === this.control.now_board ) {
                console.error( `can\'t load board idx.. ${this.control.now_board}` )
                this.control.is_mod = false
                return -1
            }
        }

        const getDatas = this.bstate.p_board.getElementsByClassName('in_data')

        const obj = this.control.is_mod ? { "num":`${this.control.now_board}` } : { "num":`${this.data.b_count}` }
        for( let i = 1; i < this.data.keys.length; i++ ) {
            
            // 파일 실질적인 업로드 파트
            if( this.data.t_idx.file === i ) {
                try {
                    const file = obj[this.data.keys[i]].files[0]
                    // const reader = ...
                    
                }catch(e) {
                    console.error(e)
                }
                
                continue
            }
            
            obj[this.data.keys[i]] = ( this.data.t_idx.date !== i ) ? getDatas[i - 1].value : getDatas[i - 1].innerHTML
        }        

        const json_obj = JSON.stringify(obj)

        if( this.control.is_mod ) {

            window.localStorage.setItem( `${this.data.h_key}${this.control.now_board}`, json_obj )
            this.control.is_mod = false
        } else {
            window.localStorage.setItem( `${this.data.h_key}${this.data.b_count}`, json_obj )
            this.data.b_count++
        }
    },

    OnDetailboard(target) { // 3번째 활성화
        //보이기
        Object.values(this.bstate).forEach( _t => {
            if( this.bstate.d_board === _t )
                _t.style.display = 'block'
            else
                _t.style.display = 'none'
        } )

        // 보였으면.. 해당글 보이기
        // 다만 보이게 할려면 해당 인덱스에 따라 로컬스토리지에서 가져와야함.
        this.OnDetailInfoView(target.parentNode.firstChild)
    },
    OnDetailInfoView(target_id) { // OnDetailboard 내부실행함수.
        const d_title = this.bstate.d_board.querySelector('#d_title')
        const d_creator = this.bstate.d_board.querySelector('#d_creator')
        const d_date = this.bstate.d_board.querySelector('#d_date')
        const d_info = this.bstate.d_board.querySelector('#d_info')

        board.control.now_board = target_id.innerHTML - 1

        // read json.
        let d_item = window.localStorage.getItem( `${board.data.h_key}${board.control.now_board}` )

        try {
            d_item = JSON.parse(d_item)
        } catch (e) {
            console.error(e)
            // re init.
            board.control.now_board = -1
            this.OnHomeboard()
            return false
        }

        d_title.textContent = d_item.title
        d_creator.textContent = d_item.creator
        d_date.textContent = d_item.date
        d_info.textContent = d_item.info

        return true
    },
    OnModifyBoard() {
        const ed_title = this.bstate.p_board.querySelector('#post_title')
        const ed_creator = this.bstate.p_board.querySelector('#post_creator')
        const ed_info = this.bstate.p_board.querySelector('#post_info')

        // 편집화면으로 이동.
        this.OnEditboard()

        // 불러오기.
        let d_item = window.localStorage.getItem( `${board.data.h_key}${board.control.now_board}` )
        try {
            d_item = JSON.parse(d_item)
        } catch (e) {
            console.error(e)
            // re init.
            board.control.now_board = -1
            this.OnHomeboard()
            return false
        }

        ed_title.value = d_item.title
        ed_creator.value = d_item.creator
        ed_info.value = d_item.info
        
        this.control.is_mod = true
    },
    OnRemoveBoard() {
        // delete..
        window.localStorage.removeItem(`${board.data.h_key}${board.control.now_board}`)
        this.OnHomeboard()
    },
    OnHomeboard() { // 1번째 활성화
        Object.values(this.bstate).forEach( _t => {
            if( this.bstate.l_board === _t )
                _t.style.display = 'block'
            else
                _t.style.display = 'none'
        } )

        // 여기서도 리스트 띄우도록 실행해야..
        this.OnBoardListLoad()
    },
    
    OnBoardListLoad() {

        const ul = this.bstate.l_board.querySelector('ul')
        ul.innerHTML = ""
        
        for( let i = 0; i < window.localStorage.length; i++ ) {
            item = window.localStorage.getItem( `${board.data.h_key}${i}` )
            item = JSON.parse(item)

            ul.appendChild(this.OnCreateBoardList( item.num, item.title, item.creator, item.date ))
        }
    },

    // 헤더 게시판 글 하나 그리기.
    OnCreateBoardList( idx, title, creator, date ) {
        const n_list = document.createElement('li')
        const in_div = document.createElement('div')
        in_div.classList.add("postlist", "plistele")

        const d_arr = [ idx, title, creator, date ]

        let item
        for( let i = 0; i < board.data.main_viewlen; i++) {
            item = document.createElement('div')
            item.classList.add('postele')
            item.innerHTML = ( 0 === i ) ? +d_arr[i] + 1 : d_arr[i]
            in_div.appendChild(item)
        }
        n_list.appendChild(in_div)

        // 이벤트 추가.
        in_div.querySelectorAll('.postele')[this.data.t_idx.l_board_e].addEventListener('click', e => board.OnDetailboard(e.target))

        return n_list
    },

    // 최근 날짜 데이터 얻기.
    GetNowDate() {
        const date = new Date()
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    },

    // init.
    OnInit() {
        // 카운트 읽어서 초기화.
        this.OnloadDataLength()

        // 리스트 동기화.
        this.OnBoardListLoad()

        // 편집게시글 초기화.
        this.OnEditboard_Init()

        // 여기서 홈보드 콜은 실행안함. 이유는 그러지 않아도 자동으로 초기화 되기에..
    },

    // 초기화시 길이 받아오기.
    OnloadDataLength() { this.data.b_count = window.localStorage.length },
}

// Init Events define.
document.addEventListener('DOMContentLoaded', () => {

    // board object init.
    board.OnInit()


    // board func init.
    // nav 글 작성 이동 이벤트
    const toEditBoard = document.querySelector('#navmenu #toEditBoard')
    toEditBoard.addEventListener('click', () => board.OnEditboard())

    // 뒤로 기능.
    document.querySelector('#upload #upl_back').addEventListener('click', () => {
        // 리셋을 실행시키고 보낸다.
        board.OnEditboard_Init()
        board.OnHomeboard()
    })

    // 리셋 기능
    document.querySelector('#upload #reset').addEventListener('click', () => {
        board.OnEditboard_Reset()
    })

    // 게시글 업로드 기능
    document.querySelector('#upload #uploadbtn').addEventListener('click', () => {
        // 업로드 이벤트.
        board.OnUploadBoard() // 업로드 진행.
        board.OnEditboard_Init() // 초기화.
        board.OnHomeboard() // 메인게시판으로.
    })

    // detail board addevent.
    
    // btn three.
    const d_board = board.bstate.d_board

    const d_btns = d_board.querySelectorAll('#d_edit button')

    // 각기 다른 이벤트라 어쩔수 없이;;
    d_btns[0].addEventListener('click', () => {
        board.OnHomeboard()
    })

    d_btns[1].addEventListener('click', () => {
        board.OnModifyBoard()
    })

    d_btns[2].addEventListener('click', () => {
        board.OnRemoveBoard()
    })
})