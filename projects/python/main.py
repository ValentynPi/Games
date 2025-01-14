<!DOCTYPE html>
<html>
<head>
    <style>
        #man {
            position: absolute;
            left: 100px;
            top: 100px;
        }
        
        /* Body parts */
        .head {
            width: 30px;
            height: 30px;
            background-color: black;
            border-radius: 50%;
            position: relative;
        }
        
        .body {
            width: 4px;
            height: 40px;
            background-color: black;
            position: relative;
            left: 13px;
        }
        
        .arms {
            width: 40px;
            height: 4px;
            background-color: black;
            position: relative;
            top: -30px;
            left: -5px;
        }
        
        .legs {
            position: relative;
            top: -15px;
            left: 13px;
        }
        
        .leg {
            width: 4px;
            height: 30px;
            background-color: black;
            position: absolute;
            transform-origin: top;
        }
        
        .leg.left {
            transform: rotate(-20deg);
            left: -8px;
        }
        
        .leg.right {
            transform: rotate(20deg);
            left: 8px;
        }
    </style>
</head>
<body>
    <div id="man">
        <div class="head"></div>
        <div class="body"></div>
        <div class="arms"></div>
        <div class="legs">
            <div class="leg left"></div>
            <div class="leg right"></div>
        </div>
    </div>
    <script>
        const man = document.getElementById('man');
        let posY = 100;
        const speed = 5;

        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'w':
                    posY -= speed;
                    break;
                case 's':
                    posY += speed;
                    break;
            }
            man.style.top = posY + 'px';
        });
    </script>
</body>
</html>

