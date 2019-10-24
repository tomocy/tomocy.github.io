$(function () {
    const bgImg = new BGImage('#img')
    const titleCarousel = new Carousel(new Slider(new Slicker('#title-container', '.title', {
        arrows: false,
        autoplay: true,
        vertical: true,
    })))

    titleCarousel.onClick(() => {
        titleCarousel.slideNext()
    })
    $(document).ready(() => {
        bgImg.decide()
    })
    let onResized;
    $(window).resize(() => {
        clearTimeout(onResized)
        onResized = setTimeout(() => {
            bgImg.decide()
            titleCarousel.refresh()
        }, 200)
    })
    // disable scroll also in iOS safari
    $(window).on('touchmove', function () {
        e.preventDefault()
    })
})

class Carousel {
    constructor(slider) {
        this.slider = slider
    }

    slideNext() {
        this.slider.slideNext()
    }

    refresh() {
        this.slider.refresh()
    }

    onClick(f = () => {}) {
        this.slider.onClick(f)
    }
}

class Slider {
    constructor(slider) {
        this.slider = slider
    }

    slideNext() {
        this.slider.slideNext()
    }

    refresh() {
        this.slider.refresh()
    }

    current() {
        return this.slider.current()
    }

    onClick(f) {
        this.slider.onClick(f)
    }
}

class Slicker {
    constructor(name, itemName, opts) {
        this.itemName = itemName
        this.adjustHeight()

        this.target = $(name).slick(opts)
    }

    slideNext() {
        this.target.slick('slickNext')
    }

    refresh() {
        this.adjustHeight()
        this.target.slick('setPosition')
    }

    adjustHeight() {
        $(this.itemName).css('height', 'auto')
        const height = this.maxHeightOfItem()
        $(this.itemName).css('height', parseInt(height, 10) + 'px')
    }

    maxHeightOfItem() {
        const items = $(this.itemName)
        let max = 0
        for (const item of items) {
            const height = $(item).height()
            if (max < height) {
                max = height
            }
        }

        return max
    }

    current() {
        return $('.slick-slide.slick-current')
    }

    onClick(f) {
        this.target.click(f)
    }
}

class BGImage {
    constructor(name) {
        this.name = name
    }

    decide() {
        const [width, height] = [$(window).innerWidth(), $(window).innerHeight()]
        if (height < width) {
            this.target().removeClass('img-higher').addClass('img-wider')
            return
        }

        this.target().removeClass('img-wider').addClass('img-higher')
    }

    target() {
        return $(this.name)
    }
}