$(document).ready(function () {

    // ===== inventory filter pills =====
    if ($('.tl-filter').length) {
        $('.tl-filter').on('click', function () {
            $('.tl-filter').removeClass('is-active');
            $(this).addClass('is-active');
        });
    }

    // ===== mobile nav toggle =====
    if ($('.tl-nav-toggle').length) {
        $('.tl-nav-toggle').on('click', function () {
            $('.tl-nav-menu').slideToggle(200).css('display', function (i, v) {
                return v === 'block' ? 'flex' : v;
            });
        });
    }

    // ===== service faq accordion =====
    if ($('.tl-svc-faq-item').length) {
        $('.tl-svc-faq-q').on('click', function () {
            var item = $(this).closest('.tl-svc-faq-item');
            $('.tl-svc-faq-item').not(item).removeClass('is-open');
            item.toggleClass('is-open');
        });
    }

});
