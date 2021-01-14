class Banner {
    constructor(ele, arr) {
        this.ele = ele;
        this.arr = arr;
        this.oUl = this.ele.querySelector('#banner ul');
        this.oOl = this.ele.querySelector('#banner ol');
        this.oDiv=this.ele.querySelector('#banner div')
        this.ulLiWidth;
        this.index = 1;
        this.timer;
        this.oLis = {};
        this.isRunning = true;
    }
    init() {
        this.setLi(this.arr);
        this.doLoop();
        this.mouseInOut();
        this.setActiveChange();
        this.hid();
    }
    setLi(array) {
        let ulLiStr = '';
        let olLiStr = '';
        array.forEach((v, k) => {
            if (k === 0) {
                olLiStr += `<li num="${k}" name="olli" class="active"></li>`;
            } else {
                olLiStr += `<li num="${k}" name="olli"></li>`;
            }
            ulLiStr += `<li><img src='images/${v.path}'></li>`;
        })

        this.oUl.innerHTML = ulLiStr;
        this.oOl.innerHTML = olLiStr;

        this.oUl.appendChild(this.ele.querySelectorAll('ul li')[0].cloneNode(true));
        this.oUl.insertBefore(this.ele.querySelectorAll('ul li')[array.length - 1].cloneNode(true), this.ele.querySelectorAll(
            'ul li')[0]);


        this.oLis = this.oOl.querySelectorAll('li');
        this.ulLiWidth = this.ele.querySelectorAll('ul li')[0].offsetWidth;


        this.oUl.style.width = this.ulLiWidth * (array.length + 2) + 'px';
        this.oUl.style.left = `-${this.index * this.ulLiWidth}px`;
    }
    doLoop() {
        this.timer = setInterval(() => {
            this.index++;
            this.setLiStyle();
            move(this.oUl, {
                left: -this.index * this.ulLiWidth
            }, this.loopEnd.bind(this));

        }, 3000);
    }
    loopEnd() {
        if (this.index === this.arr.length + 1) {
            this.index = 1;

        } else if (this.index === 0) {
            this.index = this.arr.length;

        }

        this.oUl.style.left = `${-this.index * this.ulLiWidth}px`;
        this.isRunning = true;
    }

    setLiStyle() {
        this.oLis.forEach((v, k) => {
            myRemoveClass(v, 'active');

        })
        //index 0-7  
        //k 0-5
        //imgArr.length 1-6


        if (this.index === this.arr.length + 1) {
            this.oLis[0].className += ' active';
        } else if (this.index === 0) {
            this.oLis[this.arr.length - 1].className += ' active';
        } else {
            this.oLis[this.index - 1].className += ' active';
        }

    }
    mouseInOut() {
        this.ele.addEventListener('mouseenter', (e)=> {
            clearInterval(this.timer); 
            this.oDiv.style.display='flex'  
        });
        this.ele.addEventListener('mouseleave', (e)=> {
            this.doLoop();    
            this.oDiv.style.display='none'  
        })
    }
    setActiveChange() {
        this.ele.addEventListener('click', e => {
            e = e || window.event;
            if (e.target.getAttribute('name') === 'left') {
                if (!this.isRunning) return;
                this.isRunning = false;
                this.index--;
                this.setLiStyle();
                move(this.oUl, { left: -this.index * this.ulLiWidth }, this.loopEnd.bind(this));
            } else if (e.target.getAttribute('name') === 'right') {
                if (!this.isRunning) return;
                this.isRunning = false;
                this.index++;
                this.setLiStyle();
                move(this.oUl, { left: -this.index * this.ulLiWidth }, this.loopEnd.bind(this));
            } else if (e.target.getAttribute('name') === 'olli') {
                if (!this.isRunning) return;
                this.isRunning = false;
                this.index = e.target.getAttribute('num') - 0 + 1;
                this.setLiStyle();
                move(this.oUl, { left: -this.index * this.ulLiWidth }, this.loopEnd.bind(this));
            }
        })
    }

    hid() {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                clearInterval(this.timer);
            } else if (document.visibilityState === 'visible') {
                this.doLoop();
            }
        })
    }
}