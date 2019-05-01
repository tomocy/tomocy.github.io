$(function () {
    const slicker = $('#title-container')
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

    slicker.on('beforeChange', function (_, slick, _, _) {
        adjustTitleContainerHeight()
        slicker.slick('setPosition')
    })

    $(document).ready(function () {
        decideBGImageOnWindowRatio()
        adjustTitleContainerHeight()
        slicker.slick(slickOpts)
    })

    let onResizeCompleted;
    $(window).resize(function () {
        clearTimeout(onResizeCompleted)
        onResizeCompleted = setTimeout(function () {
            decideBGImageOnWindowRatio()
            slicker.slick('slickNext')
        }, 200)
    })

    slicker.click(function () {
        slicker.slick('slickNext')
    })
})