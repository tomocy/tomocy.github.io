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

    titleContainer.on('beforeChange', function (_, slick, _, _) {
        adjustTitleContainerHeight()
        titleContainer.slick('setPosition')
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
    })

    // disable scroll also in iOS safari
    $(window).on('touchmove', function () {
        e.preventDefault()
    })
})