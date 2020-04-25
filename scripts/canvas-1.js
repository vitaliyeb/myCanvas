(function () {
    let canvas      = document.getElementById('canvas'),
        ctx         = canvas.getContext('2d'),
        w           = canvas.width = innerWidth,
        h           = canvas.height =innerHeight,
        particles   = [],
        properties  = {
            bgColor: 'rgba(39,37,34,1)',
            particleColor: 'rgb(205,23,23)',
            particleRadius: 3,
            particleCount: 150,
            particleMaxVelocity: 0.5,
            maxLength: 150
        }

    window.addEventListener('resize', function () {
        w           = canvas.width = innerWidth;
        h           = canvas.height =innerHeight;
    })

    class particle{
        constructor() {
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
        }
        position(){
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ?this.velocityX*=-1:this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ?this.velocityY*=-1:this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reDraw(){
            this.position();
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
    }
    function drawLines() {
        let x1, x2, y1, y2, length, opacity;
        for (let i in particles){
            for(let j in particles){
                x1 = particles[i]['x'];
                y1 = particles[i]['y'];
                x2 = particles[j]['x'];
                y2 = particles[j]['y'];
                length = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2))
                if(length < properties.maxLength){
                    opacity = 1 - length/properties.maxLength;
                    ctx.lineWidth = '0,5';
                    ctx.strokeStyle = `rgba(250,40,40,${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(x1,y1);
                    ctx.lineTo(x2,y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    function reDrawParticles (){
        for (let i in particles){
            particles[i].reDraw();
        }
    }

    function reDrawBg() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h)
    }
    
    function loop() {
        reDrawBg();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init(){
        for(let i = 0; i < properties.particleCount; i++){
            particles.push(new particle);
        }
        loop()
    }

    init()
})()