$(function () {
    const titleContainer = $('#title-container')
    const slickOpts = {
        arrows: false,
        autoplay: true,
        vertical: true,
    }

    const adjustTitleContainerHeight = () => {
        $('.title').css('height', 'auto')
        const height = maxHeightOfTitle()
        $('.title').css('height', parseInt(height, 10) + 'px')
    }

    const maxHeightOfTitle = () => {
        const titles = $('.title')
        let max = 0
        for (const title of titles) {
            const height = $(title).height()
            if (max < height) {
                max = height
            }
        }

        return max
    }

    const decideBGImageOnWindowRatio = () => {
        const [width, height] = [$(window).innerWidth(), $(window).innerHeight()]
        const img = $('#img')
        if (height < width) {
            img.removeClass('img-higher').addClass('img-wider')
        } else {
            img.removeClass('img-wider').addClass('img-higher')
        }
    }

    const noContentHandler = {
        handle: function(title) {
            this.title = title
            this.originalHTML = title.html()
            title.html('204 Sorry for<br>No Content website')
            this.didHandle = true
        },
        restore: function() {
            this.title.html(this.originalHTML)
            this.didHandle = false
        },
    }

    const currentTitle = () => {
        return $('.title.slick-current')
    }

    const titleClickCounter = {
        cnt: 0,
        count: function() {
            this.cnt++
        },
        reset: function() {
            this.cnt = 0
        },
    }

    titleContainer.on('beforeChange', function (_, slick, _, _) {
        adjustTitleContainerHeight()
        titleContainer.slick('setPosition')
        if (noContentHandler.didHandle) {
            noContentHandler.restore()
        }
    })

    $(document).ready(function () {
        decideBGImageOnWindowRatio()
        adjustTitleContainerHeight()
        titleContainer.slick(slickOpts)
    })

    let onResizeCompleted;
    $(window).resize(function () {
        clearTimeout(onResizeCompleted)
        onResizeCompleted = setTimeout(function () {
            decideBGImageOnWindowRatio()
            titleContainer.slick('slickNext')
        }, 200)
    })

    titleContainer.click(function () {
        titleContainer.slick('slickNext')
        console.log(titleClickCounter.cnt)
        titleClickCounter.count()
        if (5 <= titleClickCounter.cnt) {
            const title = currentTitle()
            NoContentHandler.handle(title)
            titleClickCounter.reset()
        }
    })

    // disable scroll also in iOS safari
    $(window).on('touchmove', function () {
        e.preventDefault()
    })
})