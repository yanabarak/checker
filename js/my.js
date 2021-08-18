jQuery(document).ready(function($) {

    // initial for menu 
    var myCarousel = document.querySelector('#carouselMenu')
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: false,
        touch: false,
        wrap: false
    })


    if ($(window).width() < 768) {
        (function init100vh() {
            function setHeight() {
                var vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }
            setHeight();
            window.addEventListener('resize', setHeight);
        })();
    };

    //switch off preloader
    function spinerOff() {
        $("#spinerWrap").addClass("d-none").removeClass("d-flex");
        $(document.body).removeClass("overflow-hidden");
    }
    // initial for toggle menu
    function drawStuff() {
        if ($(window).width() < 768) {
            $('.asidebar').addClass('collapse').removeClass('fliph left sidebar');
            $('.asidebar').attr('id', 'navigation');
            $('.animated-hamburger').removeClass('open');
        } else if ($(window).width() >= 768) {
            $('.asidebar').removeClass('collapse');
            $('.asidebar').removeClass('fliph');
            $('.asidebar').addClass('sidebar left');
            $('.asidebar').attr('id', '');
        }
        $('.navbar-toggler-button').on('click', function() {
            if ($(window).width() >= 768) {
                $('.asidebar').toggleClass('fliph');
            }
            $('.animated-hamburger').toggleClass('open');


            if ($('#map').length) {
                setTimeout(function() {
                    $(".form-applied").attr('style', `width: ${ $(".listWrap").innerWidth()}px`);
                }, 500);
            }
        });
    }

    function mobileAccordion() {
        if ($(window).width() < 768) {
            $('#headingOne').attr("data-bs-toggle", "collapse");
        }

    }

    // drawing graph1 on Main page
    function drawDonut1() {
        let datawork = $("#donut1 .donut").attr("data-work").split(",");
        if (datawork[0] == 0 && datawork[1] == 0) {
            $("#donut1 svg").addClass("d-none");
            $("#legenddonut1").addClass("hidden");
            let legend = $("#donut1 h5").addClass("fs-4");
            legend[1].append("Oops! Nothing here... (>_<)")

        } else {
            if (datawork[0] == 0) {
                $("#donut1 .donut-segment-white").addClass("d-none");
                $("#donut1 .donut-segment-jobs").addClass("d-none");
            } else {
                datawork[1] == 0 ? $("#donut1 .donut-segment-white").addClass("d-none") : false;
                let valuework = 99 / (Number.parseInt(datawork[0]) + Number.parseInt(datawork[1])) * datawork[0];
                $("#donut1 .donut-segment-white").attr("stroke-dasharray", `${valuework+0.5} ${100-valuework-0.5}`).attr("stroke-dashoffset", `${(valuework+0.5)/2}`);
                $("#donut1 .donut-segment-jobs").attr("stroke-dasharray", `${valuework} ${100-valuework}`).attr("stroke-dashoffset", `${valuework/2}`);
            }

            let legend = $("#donut1 h5");
            datawork[1] == 0 ? false : legend[0].append(datawork[1]);
            datawork[0] == 0 ? false : legend[1].append(datawork[0]);
        }
        $("#donut1").removeClass("invisible");
    }

    // drawing graph2 on Main page
    function drawDonut2() {
        let datawork = $("#donut2 .donut").attr("data-work").split(",");
        if (datawork[0] == 0 && datawork[1] == 0) {
            $("#donut2 svg").addClass("d-none");
            $("#legenddonut2").addClass("hidden");
            let legend = $("#donut2 h5").addClass("fs-4");
            legend[1].append("Oops! Nothing here... (>_<)")

        } else {
            if (datawork[0] == 0) {
                justify - content - center
                $("#donut2 .donut-segment-white").addClass("d-none");
                $("#donut2 .donut-segment-jobs").addClass("d-none");
            } else {
                datawork[1] == 0 ? $("#donut2 .donut-segment-white").addClass("d-none") : false;
                let valuework = 29.5 / (Number.parseInt(datawork[0]) + Number.parseInt(datawork[1])) * datawork[0];
                $("#donut2 .donut-segment-white").attr("stroke-dasharray", `${valuework} ${100-valuework}`);
                $("#donut2 .donut-segment-jobs").attr("stroke-dasharray", `${valuework} ${100-valuework}`);
            }

            let legend = $("#donut2 h5 span");
            datawork[1] == 0 ? $("#donut2 h5").addClass("justify-content-center").removeClass("justify-content-between") : legend[1].append(datawork[1]);
            datawork[0] == 0 ? $("#donut2 h5").addClass("justify-content-center").removeClass("justify-content-between") : legend[0].append(datawork[0]);
        }
        $("#donut2").removeClass("invisible");

    }



    // toggle map and list on My Jobs Page
    function togglerMap() {
        if (($(window).width() < 1025)) {
            $("#map iframe").attr("height", $(window).height() - $('#infoJob').height() + 'px');
            $("#map").attr("style", `height: ${$(window).height() - $('#infoJob').height()}px`);
            document.querySelector('#navbarSideCollapse').classList.toggle('button-open');
            $('.button-open').removeAttr('id');
            document.querySelector('.button-open').addEventListener('click', function() {
                checkJob();
                $('#infoJob').addClass('mini-menu')

                if ($('#map .offcanvas-collapse div').length != 0) {
                    $("#map").attr("style", `height: ${$(window).height() - $('#infoJob').height()}px`);
                }
                if ($(".button-open").length) {
                    document.querySelector('.listWrap').classList.toggle('w-100');
                    document.querySelector('.listWrap').classList.toggle('h-100');
                    document.querySelector('.offcanvas-collapse').classList.toggle('open');
                    document.querySelector('.offcanvas-collapse').classList.toggle('open-w100');
                    $("#maptoggler").attr('style', `right: ${($(window).width() / 2) - ($("#maptoggler").innerWidth() / 2)}px `);
                    document.querySelector('#maptoggler').classList.toggle('show');

                    document.querySelector('#map').classList.toggle('list');
                    $("#map iframe").attr("height", $(window).height() - $('#infoJob').height() + 'px');
                    $(".form-applied").attr('style', `width: ${ $(".listWrap").innerWidth()}px`);
                } else {
                    document.querySelector('.listWrap').classList.toggle('w-100');
                    document.querySelector('.listWrap').classList.toggle('h-100');
                    document.querySelector('.offcanvas-collapse').classList.toggle('open');
                    document.querySelector('#navbarSideCollapse').classList.toggle('button-open');
                    $('.offcanvas-collapse').removeClass('open-w100');
                    $("#map iframe").attr("height", $(window).height() - $('#infoJob').height() + 'px');
                    $(".form-applied").attr('style', `width: ${ $(".listWrap").innerWidth()}px`);

                }
            });

            document.querySelector('#maptoggler').addEventListener('click', function() {
                document.querySelector('.offcanvas-collapse').classList.toggle('open-w100');
                document.querySelector('.listWrap').classList.toggle('w-100');
                document.querySelector('.listWrap').classList.toggle('h-100');
                document.querySelector('.offcanvas-collapse').classList.toggle('open');
                document.querySelector('.offcanvas-collapse').classList.toggle('w-100');
                $("#maptoggler").attr('style', `right: ${ $("#map").innerWidth() / 2 - ($("#maptoggler").innerWidth()) / 2 }px`);
                document.querySelector('#maptoggler').classList.toggle('show');
                document.querySelector('#map').classList.toggle('list');
                if ($('#map .offcanvas-collapse div').length == 0) {
                    $("#map").attr("style", `height: ${$(window).height() - $('#infoJob').height()}px`);
                }
                if ($('.emptyList') != 0) {
                    $('#map').removeClass('emptyList');

                }
            });
        } else {
            document.querySelector('#navbarSideCollapse').addEventListener('click', function() {

                checkJob();
                if ($(".button-open").length) {
                    $('.button-open').removeAttr('id');
                    document.querySelector('.offcanvas-collapse').classList.toggle('open-w100');
                    document.querySelector('.listWrap').classList.toggle('w-50');
                    document.querySelector('.listWrap').classList.toggle('w-100');

                    $(".form-applied").attr('style', `width: ${ $(".listWrap").innerWidth()}px`);
                    $("#maptoggler").attr('style', `right: ${ $("#map").innerWidth() / 2 - ($("#maptoggler").innerWidth()) / 2 }px`);
                    document.querySelector('#maptoggler').classList.toggle('show');
                } else {
                    document.querySelector('.listWrap').classList.toggle('w-50');
                    document.querySelector('.offcanvas-collapse').classList.toggle('open');
                    document.querySelector('.offcanvas-collapse').classList.toggle('w-100');
                    document.querySelector('#navbarSideCollapse').classList.toggle('button-open');
                    $(".form-applied").attr('style', `width: ${ $(".listWrap").innerWidth()}px`);
                    $('.offcanvas-collapse').removeClass('open-w100');

                }
            });
            document.querySelector('#maptoggler').addEventListener('click', function() {
                $(".form-applied").attr('style', `width: ${ $(".listWrap").innerWidth()}px`);
                $('.button-open').attr('id', 'navbarSideCollapse');
                document.querySelector('#navbarSideCollapse').classList.toggle('button-open');
                document.querySelector('.offcanvas-collapse').classList.toggle('open-w100');
                document.querySelector('.listWrap').classList.toggle('w-100');
                document.querySelector('.offcanvas-collapse').classList.toggle('open');
                document.querySelector('.offcanvas-collapse').classList.toggle('w-100');
                $("#maptoggler").attr('style', `right: ${ $("#map").innerWidth() - ($("#maptoggler").innerWidth()) / 2 }px`);
                document.querySelector('#maptoggler').classList.toggle('show');
                $("#hideshow").toggleClass('d-none');
                if ($('.emptyList') != 0) {
                    $('#map').removeClass('emptyList');

                }
            });
        }

    }

    function hideInfoJob() {
        var lastScrollTop = 0;
        var $window = $(window);
        var heightBlock = $("#infoJob").innerHeight();
        var heightBlock2;

        var scrolld = true;
        $(window).scroll(function() {
            var top = $window.scrollTop();
            if (lastScrollTop > top) {
                if (top == 0) {
                    console.log("rem - " + top);
                    $('#infoJob').removeClass('mini-menu');
                    scrolld = false;
                }
            } else if (lastScrollTop < top && lastScrollTop >= 20) {
                if (top <= $("#infoJob").innerHeight() && top >= 10) {
                    console.log("add - " + top);
                    $('#infoJob').addClass('mini-menu');
                    $(window).scrollTop(top + 25);
                }
                scrolld = true;

            }
            lastScrollTop = top;


        });
        // $("#map iframe").attr("height", $("#navbarsExampleDefault>div").length * 145 + "px");
        // // $("#map").attr("height", $("#navbarsExampleDefault>div").length * 145 + "px");
        // document.querySelector('#hideshow').addEventListener('click', function() {
        //     if ($('#hideshow').hasClass("hide")) {
        //         $("#infoJob").attr("style", "padding: 0px !important;height: 0px;");
        //         $("#map iframe").attr("height", $(window).height());
        //         $('#hideshow').html('<i class="fas fa-chevron-down d-none d-md-inline-block"></i> Show')
        //     } else {
        //         $("#infoJob").attr("style", "");
        //         $("#map iframe").attr("height", $("#navbarsExampleDefault>div").length * 145 + "px");
        //         // $("#map").attr("height", $("#navbarsExampleDefault>div").length * 145 + "px");
        //         $('#hideshow').html('<i class="fas fa-chevron-up d-none d-md-inline-block"></i> Hide')
        //     }

        //     $('#hideshow').toggleClass("show hide");
        // });
    }

    // added design and necessary classes if job list is empty
    function checkJob() {

        if ($('#map .offcanvas-collapse div').length == 0) {
            $('#map').addClass('emptyList');
            // $("#map").attr('style', `max-height: ${ $(window).innerHeight() - ($("#infoJob").innerHeight())}px`);
            $('#map .offcanvas-collapse').html('<img src="img/no_jobs.png" alt="No jobs image" class="no-job"><h1>Sorry, you have no jobs</h1>')
        }
    }

    //changing date on modal window 
    function formatDate(date) {
        if (date != "") {
            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [day, month, year].join('.');
        } else {
            return date;
        }
    }

    function infoJobSvgDraw() {
        $("#infoJob .cert-elem svg").each(function() {
            let datawork = $(this).attr("data-work");
            if (datawork == 100) {
                $(this).find(".donut-ring-main").attr("stroke-dasharray", `${ datawork } 0`).attr("stroke-dashoffset", `${ datawork / 2 }`);
            } else if (datawork < 10) {
                $(this).find(".donut-ring-main").attr("stroke-dasharray", ` ${ datawork } 120 `).attr("stroke-dashoffset", `32 `);
            } else {
                $(this).find(".donut-ring-main").attr("stroke-dasharray", `${ datawork } ${ 110 - datawork }`).attr("stroke-dashoffset", `20`);
            }
            $(this).closest('.result').find('.result-text').append(datawork);
            $(this).closest('.result').removeClass("invisible");

        })

    }
    // function pickDate2() {
    //     document.querySelector('#savedatefrom').addEventListener('click', function() {
    //         let newDate = formatDate($("#pick-date-from-modal .pick-date").val());
    //         $("#pick-date-from").val(newDate);
    //         $(".showdatefrom").html(newDate);
    //         $('#pick-date-from-modal').modal('hide')
    //     });
    //     document.querySelector('#savedateto').addEventListener('click', function() {
    //         let newDate = formatDate($("#pick-date-to-modal .pick-date").val());
    //         $("#pick-date-to").val(newDate);
    //         $(".showdateto").html(newDate);
    //         $('#pick-date-to-modal').modal('hide')
    //     });

    // }

    // function updateDateModal() {
    //     if ($("#pick-date-from").val() == true) {
    //         let newDate = formatDate($("#pick-date-from").val());
    //         $("#pick-date-from-modal .pick-date").val(newDate);
    //         $(".showdatefrom").html(newDate);
    //     }
    //     if ($("#pick-date-to").val() == true) {
    //         let newDate = formatDate($("#pick-date-to").val());
    //         $("#pick-date-to-modal .pick-date").val(newDate);
    //         $(".showdateto").html(newDate);
    //     }
    // }


    function pickDate2() {
        var target;
        $('.pick-date-modal').on('click', function(e) {
            $('#pick-date-modal').modal('show')
            console.log(e.target);
            target = $(this);
            let newDate = $(this).html();
            $(".showdatefrom").html(newDate);
        });
        document.querySelector('#savedatefrom').addEventListener('click', function() {
            let newDate = formatDate($("#pick-date-modal .pick-date").val());
            if (newDate != "") {
                target.html(newDate);
            }
            $('#pick-date-modal').modal('hide')
        });

    }

    function pickBranch() {
        var target;
        $('.pick-branch-modal').on('click', function(e) {
            $('#pick-branch-modal').modal('show')
            target = $(this);
            let newBranch = $(this).html();
            $(".showBranchfrom").html(newBranch);
        });
        document.querySelector('#savebranchfrom').addEventListener('click', function() {
            let newBranch = $("div#pick-branch-modal select.form-select").val();
            if (newBranch != "") {
                target.html(newBranch);
            }
            $('#pick-branch-modal').modal('hide')
        });

    }

    //initial all function on load page
    $(window).resize(function() {
        drawStuff();
        if ($("#accordionFormJob").length) { mobileAccordion() };
    });

    $(document).ready(function() {
        spinerOff();

        drawStuff();
        if ($("#donut1").length) { drawDonut1() };
        if ($("#donut2").length) { drawDonut2() };
        if ($(".pick-date").length) {
            $('.pick-date').pickadate();
            pickDate2();
            pickBranch();
        };
        if ($("#accordionFormJob").length) { mobileAccordion() };
        if ($('#map').length) {
            togglerMap();

            if (($(window).width() >= 1025)) {
                hideInfoJob();
            }
        };
        if ($("#infoJob .cert-elem svg").length) { infoJobSvgDraw() }


    });

});