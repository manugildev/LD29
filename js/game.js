(function() {
    'use strict';

    function Game() {
        this.player = null;
        this.enemie = null;
        this.points = [];
        this.numOfPoints = 100;
        this.actualPoint;
        this.changePoint = 0;
        this.enemies = [];
        this.numOfEnemies = 13;

        this.starfield;
        this.starfield2;
    }

    Game.prototype = {

        create: function() {
            this.player = new Worm(this.game);
            this.enemie = new Enemie(this.game);
            this.game.world.setBounds(-20, -20, 440, 540);
            this.starfield2 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background1');
            this.starfield2.fixedToCamera = true;
            this.starfield = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
            this.starfield.fixedToCamera = true;

            var tween2 = this.game.add.tween(this.starfield2);
            tween2.to({
                alpha: 0
            }, 15000, Phaser.Easing.Linear.Out, true, 0, 10000000000, true);
            var tween1 = this.game.add.tween(this.starfield);
            tween1.to({
                alpha: 0
            }, 4000, Phaser.Easing.Linear.Out, true, 0, 10000000000, true);
            this.player.create();
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.game.time.advancedTiming = true;
            this.game.stage.backgroundColor = "#B8D0DE";

            for (var i = 0; i < this.numOfPoints; i++) {
                this.points[i] = new Phaser.Point(Math.random() * 20 + this.game.world.width, i * 10);
            }

            for (var i = 0; i < this.numOfEnemies; i++) {
                this.enemies[i] = new Enemie(this.game);
                //console.log(this.points[i])
                this.enemies[i].create(this.points[Math.floor(Math.random() * this.numOfPoints)], Math.random() + 0.5);
            }

        },

        update: function() {

            if (this.game.time.now > this.changePoint) {
                this.changePoint = this.game.time.now + 10;
                this.actualPoint = this.points[Math.floor(Math.random() * this.numOfPoints)];
                //console.log(this.actualPoint);

            }
            this.player.update(this.cursors);
            //this.enemie.update(this.actualPoint);

            for (var i = 0; i < this.numOfEnemies; i++) {
                this.enemies[i].update(this.actualPoint);
                this.game.physics.arcade.collide(this.player.sprite, this.enemies[i].sprite, this.collisionHandler, null, this);
                for (var j = 0; j < this.player.numSnakeSections; j++) {
                    this.game.physics.arcade.collide(this.player.snakeSection[j], this.enemies[i].sprite, this.collisionHandler, null,
                        this);
                }

            }

        },

        onInputDown: function() {

        },
        collisionHandler: function() {
            this.player.life -= 2;
            console.log(this.player.life);
        },
        render: function() {
            /*for (var i = 0; i < this.numOfPoints; i++) {
                this.game.context.fillStyle = 'rgb(255,255,0)';
                this.game.context.fillRect(this.points[i].x, this.points[i].y, 4, 4);
            }*/

            this.game.debug.text(this.time.fps, 32, 32);
            //this.game.debug.spriteInfo(this.enemie.sprite, 32, 50);
        }

    };

    window['ld29'] = window['ld29'] || {};
    window['ld29'].Game = Game;

}());