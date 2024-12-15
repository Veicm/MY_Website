const app = new PIXI.Application();
const ufoList = []

document.body.appendChild(app.view);

const rocket = PIXI.Sprite.from('assets/rocket.png');
rocket.x = 350;
rocket.y = 520;
rocket.scale.x = 0.05;
rocket.scale.y = 0.05;
app.stage.addChild(rocket);

gameInterval(function() {
    const ufo = PIXI.Sprite.from('assets/ufo' + random(1,2) + '.png');
    ufo.x = random(0, 700);
    ufo.y = -35;
    ufo.scale.x = 0.07;
    ufo.scale.y = 0.07;
    app.stage.addChild(ufo);
    ufoList.push(ufo);
    flyDown(ufo, 1);

    waitForCollision(ufo, rocket).then(function() {
        app.stage.removeChild(rocket);
        stopGame();
    });
}, 300);



function leftKeyPressed() {
    rocket.x -= 5;
}

function rightKeyPressed() {
    rocket.x += 5;
}

function spaceKeyPressed() {
    const bullet = PIXI.Sprite.from('assets/bullet.png');
    bullet.x = rocket.x + 14;
    bullet.y = 500;
    bullet.scale.x = 0.02;
    bullet.scale.y = 0.02;
    app.stage.addChild(bullet);
    flyUp(bullet);

    waitForCollision(bullet, ufoList).then(function([bullet, ufo]) {
        app.stage.removeChild(bullet);
        app.stage.removeChild(ufo);
    });
}


