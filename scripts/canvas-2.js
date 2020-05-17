(function () {
    const config = {
        waveSpeed: 1,
        waveToBlends: 4,
        curvesNum : 10
    }
     class WaveNoise{
         constructor() {
             this.waveSet = [];
         }
         addWaves(requiredWaves){
            for (let i = 0; i < requiredWaves; i++){
                let randomAngle = Math.random() * 360;
                this.waveSet.push(randomAngle);
            }
         }
         getWave(){
             let blendedWave = 0;
             for (let e of this.waveSet){
                 blendedWave += Math.sin(e / 180 * Math.PI);
             }
             return (blendedWave / this.waveSet.length + 1) / 2;
         }
         update(){
             this.waveSet.forEach((e,i)=>{
                 let r = Math.random() * (i+1) * config.waveSpeed;
                 this.waveSet[i] = (r + e) % 360;
             })
         }
     }

     class Animation{
      constructor() {
         this.cnv = document.getElementById('canvas');
         this.ctx = this.cnv.getContext('2d');
         this.size = {w: 0, h: 0, cx: 0, cy: 0};
         this.controls = [];
         this.controlsNum = 3;
      }

      init(){
          this.setCanvasSize();
          this.createControls();
          console.log(this.controls)
          this.updateAnimation();
          window.addEventListener('resize', ()=>this.setCanvasSize())
      }
      setCanvasSize(){
       this.size.w = this.cnv.width = innerWidth;
       this.size.h = this.cnv.height =  innerHeight;
       this.size.cx = this.size.w / 2;
       this.size.cy = this.size.h / 2;
      }
      createControls(){
          for (let i = 0; i < this.controlsNum + config.curvesNum; i++){
            let control = new WaveNoise();
            control.addWaves(config.waveToBlends);
            this.controls.push(control);
          }
      }
      driveCurve({startX, startY, controlX1, controlY1, controlX2, controlY2, endX, endY}){
        this.ctx.strokeStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
        this.ctx.stroke();
      }
      drawDotControl(x1, y1){
          this.ctx.beginPath();
          this.ctx.fillStyle = '#fff';
          this.ctx.arc(x1, y1, 4, 0, Math.PI * 2);
          this.ctx.fill();

      }
      updateCurves(){
          let c = this.controls;
          let _controlX1 = c[0].getWave() * this.size.w;
          let _controlY1 = c[1].getWave() * this.size.h;
          let _controlX2 = c[2].getWave() * this.size.w;
          for (let i = 0; i < config.curvesNum; i++){
              let _controlY2 = c[3+i].getWave() * this.size.h;
              let curveParam = {
                  startX: 0,
                  startY: 0,
                  controlX1: _controlX1,
                  controlY1: _controlY1,
                  controlX2: _controlX2,
                  controlY2: _controlY2,
                  endX: this.size.w,
                  endY: this.size.h
              };
              this.driveCurve(curveParam);
              //this.drawDotControl(_controlX1, _controlY1);
              //this.drawDotControl(_controlX2, _controlY2);
          }
      }
      updateCanvas(){
          this.ctx.fillStyle = '#000';
          this.ctx.fillRect(0,0,this.size.w, this.size.h);
      }
      updateControls(){
          for (let e of this.controls){
              e.update();
          }
      }
      updateAnimation(){
          this.updateCanvas();
          this.updateCurves();
          this.updateControls();
          window.requestAnimationFrame(()=>this.updateAnimation());
      }
     }

    window.onload = ()=> new Animation().init();
})()


