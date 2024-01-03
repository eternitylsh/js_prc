const motor1 = {
  obj: null,
  act_obj: null,
  OnInit(__id) {
    this.obj = document.querySelectorAll(__id)[0];
    if ("undefine" === this.obj) {
      console.error("none obj : " + this.obj);
    }

    // childNode > text div.m_active text
    this.act_obj = this.obj.childNodes[1];
    if ("undefine" === this.act_obj) {
      console.error("none obj : " + this.act_obj);
    }
  },

  OnPlay() {
    this.act_obj.style.display = "inline-block";
  },

  OnStop() {
    this.act_obj.style.display = "none";
  },
};

const motor2 = {
  obj: null,
  act_obj: null,
  OnInit(__id) {
    this.obj = document.querySelectorAll(__id)[1];
    if ("undefine" === this.obj) {
      console.error("none obj : " + this.obj);
    }

    // childNode > text div.m_active text
    this.act_obj = this.obj.childNodes[1];
    if ("undefine" === this.act_obj) {
      console.error("none obj : " + this.act_obj);
    }
  },

  OnPlay() {
    this.act_obj.style.display = "inline-block";
  },

  OnStop() {
    this.act_obj.style.display = "none";
  },
};

const Lamp = {
  obj: null,
  OnInit(__id) {
    this.obj = document.querySelector(__id);
    if ("undefine" === this.obj) {
      console.error("none obj : " + this.obj);
    }
  },
  OnLight() {
    this.obj.style.backgroundImage = "url(res/ton_redlight.png)";
  },
  OffLight() {
    this.obj.style.backgroundImage = "url(res/toff_redlight.png)";
  },
};

const Booser = {
  obj: null,
  OnInit(__id) {
    this.obj = document.querySelector(__id);
    if ("undefine" === this.obj) {
      console.error("none obj : " + this.obj);
    }
  },
  OnAct() {
    this.obj.style.backgroundImage = "url(res/act_sound.png)";
  },
  OnNoneAct() {
    this.obj.style.backgroundImage = "url(res/non_sound.png)";
  },
};

const If_Manager = {
  ids: {
    Lamp: {
      loopid: null,
      time: 1000,
      state: false,
    },
    Booser: {
      loopid: null,
      time: 2000,
      state: false,
    },
  },
  OnInit() {
    motor1.OnInit(".motor");
    motor2.OnInit(".motor");
    Lamp.OnInit("#redlamp");
    Booser.OnInit("#sound");
  },

  // motor1, motor2, booser! 2sec
  OnLowAct() {
    this.AllInit();

    if ("play" === W_control.GetOnWControlState()) {
      console.log("low state motor 1,2 play.")
      motor1.OnPlay();
      motor2.OnPlay();
    }

    this.OnBooser();
  },

  // motor1, Lamp 1sec
  OnMidAct() {
    this.AllInit();

    if ("play" === W_control.GetOnWControlState()) motor1.OnPlay();

    this.OnOSLL();
  },

  // OnLamp.
  OnHighAct() {
    this.AllInit();

    Lamp.OnLight();
  },

  // 일단 모두 정지.
  AllInit() {
    motor1.OnStop();
    motor2.OnStop();
    Lamp.OffLight();

    this.OnBooserStop();
    this.OnOSLLStop();
  },

  // On One Sec Lamp Loop.
  OnOSLL() {
    this.ids.Lamp.loopid = setInterval(() => {
      this.ids.Lamp.state = !this.ids.Lamp.state;
      if (this.ids.Lamp.state) Lamp.OnLight();
      else Lamp.OffLight();
    }, this.ids.Lamp.time);
  },

  OnOSLLStop() {
    if (null !== this.ids.Lamp.loopid) {
      clearInterval(this.ids.Lamp.loopid);
      this.ids.Lamp.loopid = null;
      Lamp.OffLight();
    }
  },

  // On Two Sec Booser Loop.
  OnBooser() {
    this.ids.Booser.loopid = setInterval(() => {
      this.ids.Booser.state = !this.ids.Booser.state;
      if (this.ids.Booser.state) Booser.OnAct();
      else Booser.OnNoneAct();
    }, this.ids.Booser.time);
  },

  OnBooserStop() {
    if (null !== this.ids.Booser.loopid) {
      clearInterval(this.ids.Booser.loopid);
      this.ids.Booser.loopid = null;
      Booser.OnNoneAct();
    }
  },
};
