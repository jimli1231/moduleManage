     // 创建Pixi应用
     const pixiApp = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true, // 设置透明背景
    });
    const pixiContainer = document.getElementById('pixi-container');
    // 将Pixi应用的渲染器添加到文档中
    pixiContainer.appendChild(pixiApp.view);

    // 监听 canvas 的 "pointerclick" 事件
    pixiApp.view.addEventListener("click", (event) => {
        // 获取鼠标相对于 canvas 的坐标
        const rect = pixiApp.view.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        let metaData= event.metaData 
        // 创建一个Graphics对象
        const graphics = new PIXI.Graphics();

        // 设置填充颜色为白色
        graphics.beginFill(0xffffff);

        // 绘制一个圆
        graphics.drawCircle(mouseX, mouseY, 5);

        // 结束填充并渲染圆
        graphics.endFill();

        // 绘制一条以35度角向上延伸长度为10的直线
        const angle = (35 * Math.PI) / 180;
        const dx = Math.cos(angle) * 40;
        const dy = -Math.sin(angle) * 40;
        graphics.lineStyle(1, 0xffffff);
        graphics.moveTo(mouseX, mouseY);
        graphics.lineTo(mouseX + dx, mouseY + dy);

        graphics.moveTo(mouseX + dx, mouseY + dy);
        graphics.lineTo(mouseX + dx + 40, mouseY + dy);
        // 将Graphics对象添加到舞台上
        pixiApp.stage.addChild(graphics);

        // 创建文本对象
        const text = new PIXI.Text('', {
            fontFamily: 'Arial',
            fontSize: 15,
            fill: 0xffffff
        });
        text.x = mouseX + dx + 40 + 10;
        text.y = mouseY + dy - 10;

        // 将文本对象添加到舞台上
        pixiApp.stage.addChild(text);
        const textContent =metaData.title;
        
        let textProgress = 0;

        function animateText() {
            text.text = textContent.slice(0, textProgress);
            textProgress++;

            if (textProgress <= textContent.length) {
                setTimeout(() => {
                    requestAnimationFrame(animateText);
                }, 80);
            }
        }

        animateText();
    });