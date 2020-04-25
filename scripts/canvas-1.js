(function () {
    let canvas      = document.getElementById('canvas'),
        ctx         = canvas.getContext('2d'),
        w           = canvas.width = innerWidth,
        h           = canvas.height =innerHeight,
        particles   = [],
        properties  = {
            bgColor: 'rgba(39,37,34,1)',
            particleColors: [
                'rgba(205,23,23,1)',
                'rgba(217, 35, 205, 1)',
                'rgba(111, 35, 217, 1)',
                'rgba(35, 108, 217, 1)',
                'rgba(35, 168, 217, 1)',
                'rgba(35, 217, 217, 1)',
                'rgba(35, 217, 111, 1)',
                'rgba(35, 217, 62, 1)',
                'rgba(147,217,35, 1)',
                'rgba(148,217,36, 1)',
                'rgba(189, 217, 35, 1)',
                'rgba(205, 217, 35, 1)',
                'rgba(217, 208, 35, 1)',
                'rgba(217, 165, 35, 1)',
                'rgba(217, 138, 35, 1)',
                'rgba(217, 104, 35, 1)',
                'rgba(217, 89, 35, 1)',
                'rgba(217, 53, 35, 1)',
                'rgba(217, 35, 35, 1)'
            ],
            particleRadius: 3,
            particleCount: 100,
            particleMaxVelocity: 0.5,
            maxLength: 150,
            particleLife: 60
        }

    window.addEventListener('resize', function () {
        w           = canvas.width = innerWidth;
        h           = canvas.height =innerHeight;
    })

    class particle{
        constructor() {
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.color = properties.particleColors[Math.floor(Math.random()*properties.particleColors.length)];
            this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.life = Math.floor(properties.particleLife*Math.random())*60;
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
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        reCalculateLife(){
            if(this.life < 1){
                this.x = Math.random()*w;
                this.y = Math.random()*h;
                this.color = properties.particleColors[Math.floor(Math.random()*properties.particleColors.length)];
                this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.life = Math.floor(properties.particleLife*Math.random())*60;
            }
            this.life--;
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
                    let gradient = ctx.createLinearGradient(x1,y1,x2,y2);
                    gradient.addColorStop(0, particles[i]['color'].replace(/1\)$/, `${opacity})`));
                    gradient.addColorStop(1, particles[j]['color'].replace(/1\)$/, `${opacity})`));
                    ctx.strokeStyle = gradient;
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
            particles[i].reCalculateLife();
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
        console.log(particles)
        loop()
    }

    init()
})()