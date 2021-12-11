jQuery(document).ready(function ($) {

    //get the suggestions object
    const suggested_links = typeof window.suggested_links_obj != 'undefined' ? Object.entries(window.suggested_links_obj) : {}

    const suggested_links_keys = [] //returned keys of suggestion_link
    for (let i = 0; i < suggested_links.length; i++) {
        const suggestion = suggested_links[i];
        suggested_links_keys.push(suggestion[0])
    }

    var suggestions = []
    for (let i = 0; i < suggested_links.length; i++) {
        const element = suggested_links[i];
        suggestions.push(element[1]);
    }

    var videos_in_page = $('video')
    videos_in_page.each(function (index) {

        var this_video = document.getElementsByTagName('video')[index]
        var this_video_parent = $(this).parent()
        var this_video_suggested_links_box

        rednerHTMLelement()

        function rednerHTMLelement() {
            $(`
            <div class="suggested-links-box">
            <span><?xml version="1.0"?><svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"/></svg></span>
            </div>
            `).appendTo(this_video_parent)
            this_video_suggested_links_box = $(this_video_parent).find('.suggested-links-box')
            suggestions.forEach(element => {
                element = Object.entries(element)
                element.forEach(suggestion => {
                    if (suggestion[1].video_link == $(this_video).attr('src')) {

                        $(`
                <div class="suggestion-item" data-time="${suggestion[1].time}">
                    <a href="${suggestion[1].url}">${suggestion[1].title}</a>
                </div>
            `).appendTo($(this_video_suggested_links_box))
                    }
                })
            })
        }

        this_video.addEventListener('timeupdate', function () {
            suggestions.forEach(element => {
                element = Object.entries(element)
                element.forEach(suggestion => {
                    if (suggestion[1].video_link == this_video.getAttribute('src')) {
                        var suggestion_time = suggestion[1].time
                        var this_video_c_time = this_video.currentTime.toString().split('.')[0]
                        var video_time = new Date(this_video_c_time * 1000).toISOString().substr(11,8)
                        if(suggestion_time == video_time){
                            ShowSuggestion(video_time,suggestion_time)
                        }
                    }
                })

                function ShowSuggestion(video_c_time) {
                    var get_suggestions_item = $(this_video_suggested_links_box).find('.suggestion-item')
                    $.each(get_suggestions_item, function (indexInArray, valueOfElement) {
                        if ($(valueOfElement).data('time') == video_c_time && !$(valueOfElement).parent().hasClass('suggestion-click-active') && $(valueOfElement).data('is-showed') != true) {
                            $(valueOfElement).addClass('suggestion-item-active')
                            $(valueOfElement).data('is-showed',true)
                            setTimeout(() => {
                                $(valueOfElement).removeClass('suggestion-item-active')
                            }, 5000);
                        }
                    });
                }
            });
        })


        //handle show suggestions list when user click on suggestion icon
        var info_click = $(this_video_suggested_links_box).find('span')

        $(info_click).on('click', function () {
            if ($(this_video_suggested_links_box).hasClass('suggestion-click-active')) {
                $(this_video_suggested_links_box).removeClass('suggestion-click-active')
            } else {
                $(this_video_suggested_links_box).addClass('suggestion-click-active')
            }
        })
        //hide info icon box when on click video if info icon has active class
        $('video').each(function(){
            $(this).on('click',function(){
                if($(this).parent().find('.suggested-links-box').hasClass('suggestion-click-active')){
                    $(this).parent().find('.suggested-links-box').removeClass('suggestion-click-active')
                }
            })
        })
    })
})