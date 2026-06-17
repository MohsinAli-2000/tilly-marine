$(document).ready(function () {

    // ===== inventory filter pills =====
    if ($('.tl-filter').length) {
        $('.tl-filter').on('click', function () {
            $('.tl-filter').removeClass('is-active');
            $(this).addClass('is-active');
        });
    }

    // ===== "life on the water" hero carousel =====
    if ($('.tl-life-carousel').length) {
        $('.tl-life-carousel').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            dots: true,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 700,
            navText: [
                '<span class="tl-life-arrow">&#8594;</span>',
                '<span class="tl-life-arrow">&#8594;</span>'
            ]
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

    // ===== how-to videos category filter =====
    if ($('.tl-htv-filter').length) {
        $('.tl-htv-filter').on('click', function () {
            var filter = $.trim($(this).text());
            $('.tl-htv-filter').removeClass('is-active');
            $(this).addClass('is-active');

            $('.tl-htv-card').each(function () {
                var cat = $.trim($(this).find('.tl-htv-cat').text());
                $(this).css('display', (filter === 'All' || cat === filter) ? '' : 'none');
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

    // ===== financing payment calculator =====
    if ($('.tl-fin-calc-grid').length) {
        var $price = $('#finPrice');
        var $down = $('#finDown');
        var $apr = $('#finApr');
        var $term = $('#finTerm');

        // strip non-numeric chars, keep a decimal point for APR
        function num(val, allowDecimal) {
            var cleaned = String(val).replace(allowDecimal ? /[^0-9.]/g : /[^0-9]/g, '');
            var n = parseFloat(cleaned);
            return isNaN(n) ? 0 : n;
        }

        function money(n) {
            return '$' + Math.round(n).toLocaleString('en-US');
        }

        function calc() {
            var price = num($price.val(), false);
            var down = Math.min(num($down.val(), false), price);
            var apr = num($apr.val(), true);
            var months = num($term.val(), false) || 0;

            var financed = Math.max(price - down, 0);
            var monthly, totalPaid;

            if (months > 0) {
                var r = (apr / 100) / 12;
                if (r > 0) {
                    monthly = financed * r / (1 - Math.pow(1 + r, -months));
                } else {
                    monthly = financed / months;
                }
                totalPaid = monthly * months;
            } else {
                monthly = 0;
                totalPaid = financed;
            }

            var interest = Math.max(totalPaid - financed, 0);
            var totalCost = totalPaid + down;

            $('#finMonthly').text(money(monthly));
            $('#finFinanced').text(money(financed));
            $('#finInterest').text(money(interest));
            $('#finTotal').text(money(totalCost));
        }

        // re-format the dollar inputs with thousands separators on blur
        function formatDollar($el) {
            var n = num($el.val(), false);
            $el.val(n ? n.toLocaleString('en-US') : '');
        }

        $price.add($down).add($apr).add($term).on('input change', calc);
        $price.add($down).on('blur', function () {
            formatDollar($(this));
            calc();
        });

        calc();
    }

});
