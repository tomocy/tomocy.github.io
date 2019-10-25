$(function () {
    const bgImg = new BGImage('#img')
    const slicker = new Slicker('#title-container', '.title', {
        arrows: false,
        autoplay: true,
        vertical: true,
    })
    const titleCarousel = new Carousel(new Slider(slicker))
    const noContentEvent = new TitleEvent({
        html: '204 <br>Sorry for <br class="sp-only">No Content',
    }, {
        classNames: ['img-204'],
    })
    const titleClickedCounter = new TitleClickedCounter([
        {
            cond: (cnt) => {
                return cnt % 5 == 0
            },
            run: () => {
                noContentEvent.trigger(titleCarousel.current(), bgImg.target())
            },
        },
    ])

    titleCarousel.beforeChange(() => {
        if (noContentEvent.isTriggered) {
            noContentEvent.restore()
        }
    })
    titleCarousel.onClick(() => {
        titleClickedCounter.countUp()
        titleCarousel.slideNext()
        titleClickedCounter.trigger()
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

    current() {
        return this.slider.current()
    }

    beforeChange(f) {
        this.slider.beforeChange(f)
    }

    onClick(f) {
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

    beforeChange(f) {
        this.slider.beforeChange(f)
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

    beforeChange(f) {
        this.target.on('beforeChange', f)
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

class TitleEvent {
    constructor(titleProp, imgProp) {
        this.drop()
        
        this.titleProp = titleProp
        this.imgProp = imgProp
        this.isTriggered = false
    }

    trigger(title, img) {
        this.store(title, img)

        this.title.html(this.titleProp.html)
        for (const imgClassName of this.imgProp.classNames) {
            this.img.addClass(imgClassName)
        }
        this.isTriggered = true
    }

    restore() {
        this.title.html(this.originalTitle.html())
        for (const imgClassName of this.imgProp.classNames) {
            this.img.removeClass(imgClassName)
        }
        this.isTriggered = false

        this.drop()
    }

    drop() {
        this.store(null, null)
    }

    store(title, img) {
        this.title = title
        this.originalTitle = (title != null) ? title.clone() : null
        this.img = img
        this.originalImg = (img != null) ? img.clone() : null
    }
}

class TitleClickedCounter {
    constructor(fns) {
        this.cnt = 0
        this.fns = fns
    }

    countUp() {
        this.cnt++
    }

    countDown() {
        this.cnt--
    }

    trigger() {
        for (const fn of this.fns) {
            if (fn.cond(this.cnt)) {
                fn.run()
            }
        }
    }
}