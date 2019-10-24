$(function () {
    const bgImg = new BGImage('#img')
    const titleCarousel = new Carousel(new Slider(new Slicker('#title-container', '.title', {
        arrows: false,
        autoplay: true,
        vertical: true,
    })))

    titleCarousel.slideNextOnClick()
    bgImg.decideOnReady()
    bgImg.decideOnResize(function() {
        titleCarousel.slideNext()
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

    slideNextOnClick() {
        this.slider.onClick(() => {
            this.slideNext()
            console.log('slide next on click')
        })
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
        this.slider.refres()
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
        this.items = $(itemName)
        this.adjustHeight()

        this.target = $(name).slick(opts)
    }

    adjustHeight() {
        this.items.css('height', 'auto')
        const height = this.maxHeightOfItem()
        this.items.css('height', parseInt(height, 10) + 'px')
    }

    maxHeightOfItem() {
        let max = 0
        for (const item of this.items) {
            const height = $(item).height()
            if (max < height) {
                max = height
            }
        }

        return max
    }

    slideNext() {
        this.target.slick('slickNext')
    }

    refresh() {
        this.target.slick('setPosition')
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
        this.target = $(name)
    }

    decideOnReady(f = () => {}) {
        $(document).ready(() => {
            this.decide()
            f()
        })
    }

    decideOnResize(f = () => {}) {
        let onCompleted;
        $(window).resize(() => {
            clearTimeout(onCompleted)
            onCompleted = setTimeout(() => {
                this.decide()
                f()
            }, 200)
        })
    }

    decide() {
        const [width, height] = [$(window).innerWidth(), $(window).innerHeight()]
        if (height < width) {
            this.target.removeClass('img-higher').addClass('img-wider')
            return
        }

        this.target.removeClass('img-wider').addClass('img-higher')
    }
}