const Wamount = {
  now: 100, // %
  max: null,
  min: null,

  obj: null,
  display: null,

  OnInit(__id, __max, __min) {
    this.max = __max;
    this.min = __min;

    this.obj = document.querySelector(__id);
    if ("undefine" === this.obj) {
      console.error("none obj : " + this.obj);
    }

    this.display = this.obj.childNodes[3];
    if ("undefine" === this.display) {
      console.error("none obj : " + this.display);
    }
  },

  OnUpdate(__data) {
    this.display.innerText = `${__data * (this.max / 100)}L`;
  },
};

const Wheight = {
  now: 100, // %
  max: 350, // base..
  min: 0,

  obj: null,
  display: null,

  OnInit(__id, __max, __min) {
    this.max = __max;
    this.min = __min;

    this.obj = document.querySelector(__id);
    if ("undefine" === this.obj) {
      console.error("none obj : " + this.obj);
    }

    this.display = this.obj.childNodes[3];
    if ("undefine" === this.display) {
      console.error("none obj : " + this.display);
    }
  },

  OnUpdate(__data) {
    this.display.innerText = `${__data * (this.max / 100)}m`;
  },
};

const WSpeed = {
  obj: null,
  display: null,

  OnInit(__id) {
    this.obj = document.querySelector(__id);
    if ("undefine" === this.obj) {
      console.error("none obj : " + this.obj);
    }

    this.display = this.obj.childNodes[3];
    if ("undefine" === this.display) {
      console.error("none obj : " + this.display);
    }
  },

  OnUpdate(__data) {
    this.display.innerText = `${__data}m/s`;
  },
};

const Wstate = {
  obj: null,
  display: null,

  state: ["저수위", "중수위", "고수위"],

  OnInit(__id) {
    this.obj = document.querySelector(__id);
    if ("undefine" === this.obj) {
      console.error("none obj : " + this.obj);
    }

    this.display = this.obj.childNodes[3];
    if ("undefine" === this.display) {
      console.error("none obj : " + this.display);
    }
  },

  OnUpdate(__data) {
    // 이 3가지 뿐.. 그래서 0: 저, 1: 중, 2: 고; 로 받아야함.
    this.display.innerText = `${this.state[__data]}`;
  },
};

const WSetSpeed = {
  obj: null,
  setbox: null,

  OnInit(__id) {
    this.obj = document.querySelector(__id);
    if ("undefine" === this.obj) {
      console.error("none obj : " + this.obj);
    }

    this.setbox = this.obj.childNodes[1].childNodes[1];
    if ("undefine" === this.display) {
      console.error("none obj : " + this.display);
    }

    this.setbox.addEventListener("keydown", (e) => {
      if ("Enter" === e.key) {
        const setval = +this.setbox.value;
        W_control.OnSetSpeed(setval);
        console.log("Set ReactSpeed : ", setval);
      }
    });
  },

  OnSetData() {
    return;
  },
};

const nav = {
  OnInit(__wamount, __wheight) {
    Wamount.OnInit("#wamount", __wamount.max, __wamount.min);
    Wheight.OnInit("#wheight", __wheight.max, __wheight.min);
    WSpeed.OnInit("#wspeed");
    Wstate.OnInit("#wstate");
    WSetSpeed.OnInit("#spcon");
  },

  WamountUpdate(__data) {
    Wamount.OnUpdate(__data);
  },

  WheightUpdate(__data) {
    Wheight.OnUpdate(__data);
  },

  WspeedUpdate(__data) {
    WSpeed.OnUpdate(__data);
  },

  // __data << 0, 1, 2
  WstateUpdate(__data) {
    Wstate.OnUpdate(__data);
  },
};
