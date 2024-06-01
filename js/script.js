const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const score = document.querySelector('.score--value')
const finalScore = document.querySelector('.final-score > span')
const menu = document.querySelector('.menu-screen')
const buttonPlay = document.querySelector('.btn-play')
const rainbow = document.querySelectorAll('.rainbow')

const audio = new Audio('../assets/assets_audio.mp3')
const rainbowItems = document.querySelectorAll('.rainbow')

const size = 30

let snake = [{ x: 270, y: 270 }, { x: 300, y: 270 }, { x: 330, y: 270 }, { x: 360, y: 270 }, { x: 390, y: 270 }]


const IncrementScore = () => {
    score.innerText = +score.innerText + 10
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red} ${green}, ${blue})`
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction
let loopId

const drawFood = () => {


    const { x, y, color} = food

    ctx.shadowColor = color
    ctx.shadowBlur = 20
    ctx.fillStyle = color
    ctx.fillRect(x, y, size , size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = '#3B6632'

    snake.forEach((position, index) => {

        if (index == snake.length -1) {
            ctx.fillStyle = '#30432C'
        }

        ctx.fillRect(position.x, position.y, size, size)
    })


}

const moveSnake = () => {
   if (!direction) return
     
    const head = snake[snake.length -1]

    if (direction == 'right') {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == 'left') {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == 'down') {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == 'up') {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()

}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30) {
    ctx.beginPath()        
    ctx.lineTo(i, 0)
    ctx.lineTo(i, 600)
    ctx.stroke()

    ctx.beginPath()        
    ctx.lineTo(0, i)
    ctx.lineTo(600, i)
    ctx.stroke()
    }

}

const checkEat = () => {
    const head = snake[snake.length -1]

    if (head.x == food.x && head.y == food.y) {
        IncrementScore()
        snake.push(head)
        audio.play()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)){ 
            x = randomPosition()
            y = randomPosition()
        }
        food.x = x
        food.y = y
        food.color = randomColor()
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2
    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit


    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if (wallCollision || selfCollision) {
        gameOver()
        controllersColors()
    }
}

const controllersColors = () => {
    rainbowItems.forEach(item => {
        item.style.backgroundColor = randomColor();
    });
}

controllersColors()

const gameOver = () => {
    direction = undefined

    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(3px)"
}

const gameLoop = () => {
    clearInterval(loopId)

    
    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    drawSnake()
    moveSnake()
    checkEat()
    checkCollision()


   loopId = setTimeout(() => {
       gameLoop() 
    }, 490);
}

function verificaDirecao(guide) {
    if (guide == "direita" && direction != "left") {
        return direction = "right"
    }
    if (guide == "esquerda" && direction != "right") {
        return direction = "left"
    }
    if (guide == "sobe" && direction != "down") {
        return direction = "up"
    }
    if (guide == "para baixo" && direction != "up") {
        return direction = "down"
    }
}


buttonPlay.addEventListener('click', () =>{
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    snake = [{ x: 270, y: 270 }, { x: 300, y: 270 }, { x: 330, y: 270 }, { x: 360, y: 270 }, { x: 390, y: 270 }]
})

gameLoop()
