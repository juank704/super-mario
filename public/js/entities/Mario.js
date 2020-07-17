import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Stomper from '../traits/Stomper.js';
import {loadAudioBoard} from '../loaders/audio.js';
import {loadSpriteSheet} from '../loaders/sprite.js';
import Downblow from '../traits/Downblow.js';

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

export function loadMario(audioContext) {
    return Promise.all([
        loadSpriteSheet('mario'),
        loadAudioBoard('mario', audioContext),
    ])
    .then(([sprite, audio]) => {
        return createMarioFactory(sprite, audio);
    });
}

function createMarioFactory(sprite, audio) {
    const runAnim = sprite.animations.get('run');

    function routeFrame(mario) {
        
        console.log(mario.vel.y);

        if (mario.traits.get(Jump).rise && mario.vel.y < 0 ) {
            return 'jump';  
        }

        if (mario.traits.get(Downblow).falling && mario.vel.y > 0 && mario.traits.get(Downblow).attack > 0 ) {
            return 'downblow';  
        }

        if (mario.traits.get(Go).distance > 0) {
            if ((mario.vel.x > 0 && mario.traits.get(Go).dir < 0) || (mario.vel.x < 0 && mario.traits.get(Go).dir > 0)) {
                return 'break';
            }

            return runAnim(mario.traits.get(Go).distance);
        }

        return 'idle';
    }

    function setTurboState(turboOn) {
        this.traits.get(Go).dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function setDownblowState(downblowOn){
        this.traits.get(Downblow).attack = downblowOn ? 1 : 0;
    }

    function drawMario(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.traits.get(Go).heading < 0);
    }

    return function createMario() {
        const mario = new Entity();
        mario.audio = audio;
        mario.size.set(22, 47);

        mario.addTrait(new Physics());
        mario.addTrait(new Solid());
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Downblow());
        mario.addTrait(new Killable());
        mario.addTrait(new Stomper());
        mario.traits.get(Killable).removeAfter = 0;

        mario.turbo = setTurboState;
        mario.downblow = setDownblowState;
        mario.draw = drawMario;

        mario.turbo(false);
        mario.downblow(false);
        

        return mario;
    }
}
