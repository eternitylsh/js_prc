
const motor1 = {
    obj: null,
    OnInit(__id) {
        obj = document.querySelectorAll( __id )[0]
        if( 'undefine' === obj )    {
            console.error("none obj : " + obj)
        }
    },

    OnPlay() {
        
    },
}

const motor2 = {
    
}

const If_Manager = {
    OnInit() {
        motor1.OnInit('.motor')
        // motor2.OnInit()
    }
}