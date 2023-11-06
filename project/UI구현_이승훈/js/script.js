
const html_todo = document.querySelector('section #todo')
const todoinput = html_todo.querySelector('input')
const todoAddbtn = html_todo.querySelector('button')
const todolist = html_todo.querySelector('#list')

const Todo = {
    key: {
        list_idx: 0,
        id: "todo-id",
        comp: "comp-id",
    },
    del: {
        text: "제거",
    },
    
    Add () {

        if ( 0 < todoinput.value.length ) {
            // key update.
            const key = ++Todo.key.list_idx

            // add todolist element.
            const n_item = document.createElement('div')
            n_item.setAttribute( Todo.key.id, key )

            const cb = document.createElement('input')
            cb.type = "checkbox"
            
            const span = document.createElement('span')
            span.textContent = todoinput.value

            const delbtn = document.createElement('button')
            delbtn.textContent = Todo.del.text

            n_item.append( cb, span, delbtn )
            todolist.appendChild(n_item)

            // todo add event.

            // todo item: checkbox.
            let comp
            const OnCB = e => {
                if( e.target.checked ) {
                    n_item.style.textDecoration = "line-through"

                    comp = document.createElement('span')
                    comp.textContent = "완료"
                    comp.setAttribute( Todo.key.comp, key )
                    comp.setAttribute( 'class', 'btn btn-success comp' )

                    n_item.appendChild( comp )
                } else {
                    n_item.style.textDecoration = ""

                    comp = todolist.querySelector(`[${Todo.key.comp}="${key}"]`)
                    n_item.removeChild(comp)
                }
            }

            
            cb.addEventListener('change', OnCB)

            // todo item: del btn.
            const OnDel = () => {
                const t_item = todolist.querySelector(`[${Todo.key.id}="${key}"]`)
                todolist.removeChild(t_item)
            }
            delbtn.addEventListener('click', () => {
                OnDel()
            })
            

            // init.
            todoinput.value = ''
        } else {
            alert( '일과 내용을 입력해주세요.' )
        }
    },
}



document.addEventListener('DOMContentLoaded', () => {
    
    todoAddbtn.addEventListener('click', Todo.Add)
    todoinput.addEventListener('keyup', e => {
        if( 'Enter' === e.key ) Todo.Add()
    })
})