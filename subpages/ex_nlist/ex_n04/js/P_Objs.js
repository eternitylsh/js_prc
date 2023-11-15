// Control 객체 관리

let managed_id = 0

const C_Obj = {
    name: "",
    id: null,
    obj: {
        cylinder: null,
        Timer: null,
        CountI: null,
    },
    C_Obj(__name, __cy_id, __t_id, __ci_id) {
        this.name = __name
        this.id = managed_id
        managed_id++

        if(null !== this.obj.cylinder )
            this.obj.cylinder = new cylinder(__cy_id)

        if(null !== this.obj.Timer )
            this.obj.Timer = new Timer(__t_id)

        if(null !== this.obj.CountI)
            this.obj.CountI = new CountI(__ci_id)
    },
    OnCreateHTML_Cylinder() {
        
    }
}   