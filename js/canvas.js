window.addEventListener("load", () => {

    console.log("hello");

    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext("2d");

    // Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.lineTo(200, 150);
    ctx.stroke();

    // Variables
    let painting = false;

    function startPosition(e) {
        console.log('start drawing')
        painting = true;
    }

    function finishPosition() {
        console.log('end drawing')
        painting = false;
        ctx.beginPath();
    }

    function draw(e){
        console.log('drawing')
        if(!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'blue';

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    //EventListeners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishPosition);
    canvas.addEventListener("mousemove", draw);

});