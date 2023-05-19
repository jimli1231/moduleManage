// 创建Pixi应用
const pixiApp = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true, // 设置透明背景
});
let isTableVisible = false;
let dx = 0
let dy = 0
const pixiContainer = document.getElementById('pixi-container');
const tableContainer = document.getElementById('table-container');
tableContainer.addEventListener('move',
    (e) => {
        tableContainer.style.left = e.clientX + dx + 40 + 10 + 'px';
        tableContainer.style.top = e.clientY + dy - 80 + 'px';
    })
// 将Pixi应用的渲染器添加到文档中
pixiContainer.appendChild(pixiApp.view);

// 监听 canvas 的 "pointerclick" 事件
pixiApp.view.addEventListener("click", (event) => {
    if (isTableVisible) {
        // 清空表格内容
        while (tableContainer.firstChild) {
            tableContainer.removeChild(tableContainer.firstChild);
        }

    }
    // 获取鼠标相对于 canvas 的坐标
    const rect = pixiApp.view.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let metaData = event.metaData
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
    dx = Math.cos(angle) * 40;
    dy = -Math.sin(angle) * 40;
    graphics.lineStyle(1, 0xffffff);
    graphics.moveTo(mouseX, mouseY);
    graphics.lineTo(mouseX + dx, mouseY + dy);

    graphics.moveTo(mouseX + dx, mouseY + dy);
    graphics.lineTo(mouseX + dx + 40, mouseY + dy);
    // 将Graphics对象添加到舞台上
    pixiApp.stage.addChild(graphics);
    if (event.typeTrigger == 'mouseClick') {
        pixiMouseClick(metaData, mouseX, mouseY, dx, dy)
    } else if (event.typeTrigger == 'mouseON') {
        pixiMouseON(metaData, mouseX, mouseY, dx, dy)
    }
    //

});

const pixiMouseClick = (metaData, mouseX, mouseY, dx, dy) => {
    pixiApp.stage.removeChildren();
    // 创建表格标题
    const title = document.createElement('div');
    title.innerText = `标题:${metaData.title}`;
    title.style.fontFamily = 'Arial';
    title.style.fontSize = '20px';
    title.style.fontWeight = 'bold';
    tableContainer.appendChild(title);

    // 创建表格描述
    const description = document.createElement('div');
    description.innerText = `描述:${metaData.description}`;
    description.style.fontFamily = 'Arial';
    description.style.fontSize = '16px';
    tableContainer.appendChild(description);

    // 创建表格精细模型跳转链接
    const link = document.createElement('a');
    link.innerText = '详情';
    link.style.fontFamily = 'Arial';
    link.style.fontSize = '16px';
    link.style.textDecoration = 'underline';

    link.href = 'https://sandbox.babylonjs.com/';
    link.target = '_blank';
    link.addEventListener('click', (event) => {
        event.preventDefault();
        window.open('https://sandbox.babylonjs.com/?assetUrl=./assets/b-transformed.glb', '_blank');
    });
    tableContainer.appendChild(link);

    tableContainer.style.left = mouseX + dx + 40 + 10 + 'px';
    tableContainer.style.top = mouseY + dy - 80 + 'px';
    tableContainer.style.display = 'block';
    isTableVisible = true;
}

const pixiMouseON = (metaData, mouseX, mouseY, dx, dy) => {
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
    const textContent = metaData.title;
    console.log(textContent);
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
}