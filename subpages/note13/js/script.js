const todoBox = document.querySelector('section input')
const todo = document.querySelector('#todo')
const add_btn = document.querySelector('section button')
const list = document.querySelector('#list')

let id_count = 0

// 추가기능
const AddTodo = () => {

    if( 0 < todoBox.value.length ) {
        // id 부여
        const key = ++id_count

            // 요소 추가 및 설정
        const item = document.createElement('div')
        item.setAttribute( 'todo-id', key )

        const cb = document.createElement('input')
        cb.type = 'checkbox'

        const text = document.createElement('span')
        text.textContent = todoBox.value
        const del = document.createElement('button')
        del.textContent = "제거"

        list.appendChild(item).append( cb, text, del )

        // 이벤트 추가
        cb.addEventListener( 'change', e => {
            item.style.textDecoration = e.target.checked ? 'line-through' : ''
        } )

        del.addEventListener( 'click', () => {
            removeitem(key)
        } )

        const removeitem = key => {
            const t_item = list.querySelector(`[todo-id="${key}"]`)
            list.removeChild(t_item)
        }

        // 추가 마무리.
        todoBox.value = ''
    }
    
}

document.addEventListener('DOMContentLoaded', () => {

    // 입력시 생성 이벤트 등록
    add_btn.addEventListener('click', () => AddTodo())

    todoBox.addEventListener( 'keyup', e => {
        if( 'Enter' === e.key ) AddTodo()
    } )
})