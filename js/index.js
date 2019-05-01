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

    slicker.on('beforeChange', function (_, slick, _, _) {
        adjustTitleContainerHeight()
        slicker.slick('setPosition')
    })

    $(document).ready(function () {
        adjustTitleContainerHeight()
        slicker.slick(slickOpts)
    })

    let onResizeCompleted;
    $(window).resize(function () {
        clearTimeout(onResizeCompleted)
        onResizeCompleted = setTimeout(function () {
            slicker.slick('slickNext')
        }, 200)
    })

    slicker.click(function () {
        slicker.slick('slickNext')
    })
})