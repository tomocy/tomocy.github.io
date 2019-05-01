$(function () {
    const slicker = $('#title-container')
    const slickOpts = {
        arrows: false,
        autoplay: true,
        vertical: true,
    }

    const adjustTopTitleContainerHeight = () => {
        $('.title').css('height', 'auto')
        const height = maxHeightOfTopTitle()
        $('.title').css('height', parseInt(height, 10) + 'px')
    }

    const maxHeightOfTopTitle = () => {
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
        adjustTopTitleContainerHeight()
        slicker.slick('setPosition')
    })

    $(document).ready(function () {
        adjustTopTitleContainerHeight()
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