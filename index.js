const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

const shapes = () => {
	const baseY = 50

	ctx.strokeStyle = '#000'

	// rect
	ctx.beginPath()
	ctx.strokeRect(50, baseY, 50, 50)
	ctx.closePath()

	// circle
	ctx.beginPath()
	ctx.arc(150, baseY + 25, 25, 0, 2 * Math.PI)
	ctx.stroke()
	ctx.closePath();

	ctx.beginPath()
	ctx.fillStyle = '#000'
	ctx.fillRect(200, baseY, 50, 50)
	ctx.closePath();

	ctx.beginPath()
	ctx.arc(300, baseY + 25, 25, 0, 2 * Math.PI)
	ctx.fill()
	ctx.closePath();

	ctx.beginPath()
	ctx.moveTo(400, baseY + 60)
	ctx.lineTo(400, baseY)
	ctx.lineTo(430, baseY)
	ctx.lineTo(430, baseY + 30)
	ctx.lineTo(400, baseY + 30)

	ctx.lineWidth = 10
	ctx.strokeStyle = '#fb8c00'
	ctx.stroke()
	ctx.closePath();
}
const assets = () => {
	const baseY = 150

	ctx.beginPath()
	ctx.font = '50px Ubuntu'
	ctx.textBaseline = 'bottom'
	ctx.strokeText('Pouch', 50, baseY)
	ctx.closePath()

	ctx.beginPath()
	ctx.font = '50px Ubuntu'
	ctx.textBaseline = 'top'
	ctx.fillText('Pouch', 250, baseY)
	ctx.closePath()

	const image = new Image()
	image.src = 'https://www.w3schools.com/tags/img_the_scream.jpg'
	image.onload = () => {
		ctx.drawImage(image, 430, baseY)
	}
}
const listenClicks = () => {
	class Element {}
	class RectElement extends Element {
		constructor(x1, y1, w, h) {
			super()

			this.x1 = x1
			this.y1 = y1
			this.x2 = x1 + w
			this.y2 = y1 + h
		}

		init() {
			ctx.beginPath()
			this.setStyle()
			this.render()
			ctx.closePath()
		}

		setStyle() {
			ctx.fillStyle = 'green'
		}

		render() {
			ctx.fillRect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1)
		}

		amITarget(x1, y1) {
			if (x1 >= this.x1 && x1 <= this.x2) {
				if (y1 >= this.y1 && y1 <= this.y2) {
					return true
				}
			}
			return false
		}

		clickHandler() {
			console.log(`the click was on rect with x1: ${this.x1} and y1: ${this.y2}`)
		}
	}
	class ArcElement extends Element {
		constructor(x1, y1, r, a) {
			super()
		}
	}

	const Interface = {
		elements: [],
		update(value) {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			this.elements = value
			this.elements.forEach(element => element.init())
		},
		handleClick(e) {
			const x = e.clientX
			const y = e.clientY

			const targetElement = this.elements.find(element => element.amITarget(x, y))
			if (!targetElement) return
			targetElement.clickHandler()
		}
	}

	document.addEventListener('click', (e) => {
		Interface.handleClick(e)
	})

	Interface.update([...Interface.elements, new RectElement(10, 10, 100, 100)])
	Interface.update([...Interface.elements, new RectElement(10, 200, 100, 100)])

	// setTimeout(() => {
	// 	Interface.update([...Interface.elements, new RectElement(10, 200, 100, 100)])
	// }, 2000)
	//
	// setTimeout(() => {
	// 	Interface.update(Interface.elements.splice(0, Interface.elements.length - 1))
	// }, 4000)
}

// shapes()
// assets()
listenClicks()
