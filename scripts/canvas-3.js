(function () {
    const config = {
        lineLong: 25
    };

    class Dragon{
        constructor(){
            this.cnv = document.getElementById('canvas');
            this.ctx = this.cnv.getContext('2d');
            this.path = new Path2D();
        }

        init(){
            this.drawFractal();
            window.addEventListener('resize', ()=> this.setResize())
        }
        drawFractal(){

            this.path.rect(10, 10, 100,100);



            this.ctx.stroke(this.path);

        }
        setResize(){
            this.cnv.width = innerWidth;
            this.cnv.height = innerHeight;
        }
    }

    new Dragon().init();

})()


