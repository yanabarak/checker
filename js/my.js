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
        const cookieName = "MenuStyle";
        var cookieValue = "";
        const daysToExpire = new Date(2147483647 * 1000).toUTCString();
        (!getCookie(cookieName)) ? cookieValue = getCookie(cookieName): cookieValue = getCookie(cookieName);
        if ($(window).width() < 768) {
            $('.asidebar').addClass('collapse').removeClass('fliph left sidebar');
            $('.asidebar').attr('id', 'navigation');
            $('.animated-hamburger').removeClass('open');
        } else if ($(window).width() >= 768) {
            $('.asidebar').removeClass('collapse');
            if (cookieValue == "off") {
                $('.asidebar').addClass('fliph');
                $('.animated-hamburger').removeClass('open');
            } else {
                $('.asidebar').removeClass('fliph');
                $('.animated-hamburger').addClass('open');
            }
            $('.asidebar').addClass('sidebar left');
            $('.asidebar').attr('id', '');
        }
        $('.navbar-toggler-button').on('click', function() {
            if ($(window).width() >= 768) {
                $('.asidebar.fliph').length ? cookieValue = "on" : cookieValue = "off";
                document.cookie = cookieName + '=' + cookieValue + ';samesite=strict; expires=' + daysToExpire;
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

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
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
            hideInfoJob();
            $("#map iframe").attr("height", $(window).height() - $('#infoJobMenu').height() + 100 + 'px');
            $("#map").attr("style", `height: ${$(window).height() - $('#infoJobMenu').height()}px`);
            $('#navbarSideCollapse').toggleClass('button-open');
            $('.button-open').removeAttr('id');
            document.querySelector('.button-open').addEventListener('click', function() {
                checkJob();
                // $('#infoJob').addClass('mini-menu')

                if ($('#map .offcanvas-collapse div').length != 0) {
                    $("#map").attr("style", `height: ${$(window).height() - $('#infoJobMenu').height()}px`);
                }
                if ($(".button-open").length) {
                    $('.listWrap').toggleClass('w-100');
                    $('.listWrap').toggleClass('h-100');
                    $('.offcanvas-collapse').toggleClass('open');
                    $('.offcanvas-collapse').toggleClass('open-w100');
                    $("#maptoggler").attr('style', `right: ${($(window).width() / 2) - ($("#maptoggler").innerWidth() / 2)}px `);
                    $('#maptoggler').toggleClass('show');

                    $('#map').toggleClass('list');
                    $("#map iframe").attr("height", $(window).height() - $('#infoJobMenu').height() + 'px');
                    $(".form-applied").attr('style', `width: ${ $(".listWrap").innerWidth()}px`);
                } else {
                    $('.listWrap').toggleClass('w-100');
                    $('.listWrap').toggleClass('h-100');
                    $('.offcanvas-collapse').toggleClass('open');
                    $('#navbarSideCollapse').toggleClass('button-open');
                    $('.offcanvas-collapse').removeClass('open-w100');
                    $("#map iframe").attr("height", $(window).height() - $('#infoJobMenu').height() + 'px');
                    $(".form-applied").attr('style', `width: ${ $(".listWrap").innerWidth()}px`);

                }
            });

            document.querySelector('#maptoggler').addEventListener('click', function() {
                $('.offcanvas-collapse').toggleClass('open-w100');
                $('.listWrap').toggleClass('w-100');
                $('.listWrap').toggleClass('h-100');
                $('.offcanvas-collapse').toggleClass('open');
                $('.offcanvas-collapse').toggleClass('w-100');
                $("#maptoggler").attr('style', `right: ${ $("#map").innerWidth() / 2 - ($("#maptoggler").innerWidth()) / 2 }px`);
                $('#maptoggler').toggleClass('show');
                $('#map').toggleClass('list');
                if ($('#map .offcanvas-collapse div').length == 0) {
                    $("#map").attr("style", `height: ${$(window).height() - $('#infoJobMenu').height()}px`);
                }
                if ($('.emptyList') != 0) {
                    $('#map').removeClass('emptyList');

                }
            });
        } else {

            $("#map").attr("style", 'height:' + ($(window).height() - 100) + 'px;');
            $(window).scrollTop(1);
            $("#map").addClass('overflow-visible');
            document.querySelector('#navbarSideCollapse').addEventListener('click', function() {
                $("#map").addClass('overflow-hidden');
                $("#map").removeClass('overflow-visible');
                $("#map").attr("style", '');
                checkJob();
                if ($(".button-open").length) {
                    $("#navbarSideCollapseClose").addClass('visually-hidden');
                    $('.button-open').removeAttr('id');
                    $('.offcanvas-collapse').toggleClass('open-w100');
                    $('.listWrap').toggleClass('w-50');
                    $('.listWrap').toggleClass('w-100');

                    $(".form-applied").attr('style', `width: ${ $(".listWrap").innerWidth()}px`);
                    $("#maptoggler").attr('style', `right: ${ $("#map").innerWidth() / 2 - ($("#maptoggler").innerWidth()) / 2 }px;top:calc(100% - ${$(".form-applied").height() + 75}px)`);
                    $('#maptoggler').toggleClass('show');
                } else {

                    $("#navbarSideCollapseClose").removeClass('visually-hidden');
                    $('.listWrap').toggleClass('w-50');
                    $('.offcanvas-collapse').toggleClass('open');
                    $('.offcanvas-collapse').toggleClass('w-100');
                    $('#navbarSideCollapse').toggleClass('button-open');
                    $(".form-applied").attr('style', `width: ${ $(".listWrap").innerWidth()}px`);
                    $('.offcanvas-collapse').removeClass('open-w100');

                }
            });
            document.querySelector('#maptoggler').addEventListener('click', function() {
                $("#map").removeClass('overflow-hidden');
                $("#map").addClass('overflow-visible');
                $("#map").attr("style", 'height:' + ($(window).height() - 100) + 'px;');
                $(".form-applied").attr('style', `width: 0px`);
                $('.button-open').attr('id', 'navbarSideCollapse');
                $('#navbarSideCollapse').toggleClass('button-open');
                $('.offcanvas-collapse').toggleClass('open-w100');
                $('.listWrap').toggleClass('w-100');
                $('.offcanvas-collapse').toggleClass('open');
                $('.offcanvas-collapse').toggleClass('w-100');
                $("#maptoggler").attr('style', `right: ${ $("#map").innerWidth() - ($("#maptoggler").innerWidth()) / 2 }px`);
                $('#maptoggler').toggleClass('show');

                $("#hideshow").toggleClass('d-none');
                if ($('.emptyList') != 0) {
                    $('#map').removeClass('emptyList');

                }
            });

            document.querySelector('#navbarSideCollapseClose').addEventListener('click', function() {
                $("#map").attr("style", 'height:' + ($(window).height() - 100) + 'px;');

                $("#navbarSideCollapseClose").addClass('visually-hidden');
                $('.listWrap').toggleClass('w-50');
                $('.offcanvas-collapse').toggleClass('open');
                $('.offcanvas-collapse').toggleClass('w-100');
                $('#navbarSideCollapse').toggleClass('button-open');
                $(".form-applied").attr('style', `width: 0px`);
                $('.offcanvas-collapse').removeClass('open-w100');
            });
        }

    }

    function hideInfoJob() {
        var lastScrollTop = 0;
        var $window = $(window);
        var heightBlock = $("#infoJobMenu").innerHeight();
        var heightBlock2;

        var scrolld = true;
        // $(window).scroll(function() { // var st = $(this).scrollTop();
        //     // if (st > scrollPos) {
        //     //     $('#infoJob').addClass('mini-menu')
        //     // }
        //     // scrollPos = st;
        //     var top = $window.scrollTop();
        //     if (lastScrollTop > top) {
        //         if (top == 0) {
        //             $('#infoJob').removeClass('mini-menu');
        //             scrolld = false;
        //         }
        //     } else if (lastScrollTop < top && lastScrollTop >= 20) {
        //         if (top <= $("#infoJob").innerHeight() && top >= 10) {
        //             $('#infoJob').addClass('mini-menu');
        //             // $(window).scrollTop(top + 25);
        //         }
        //         scrolld = true;

        //     }
        //     lastScrollTop = top;


        // });
        $(document.body).on('touchmove', onScrollMob); // for mobile
        $(window).on('scroll', onScroll);

        // callback
        function onScroll() {
            // var st = $(this).scrollTop();
            // if (st > scrollPos) {
            //     $('#infoJob').addClass('mini-menu')
            // }
            // scrollPos = st;
            var top = $window.scrollTop();
            if (lastScrollTop > top) {
                if (top == 0) {
                    $('#infoJobMenu').removeClass('mini-menu');
                    scrolld = false;
                }
            } else if (lastScrollTop < top && lastScrollTop >= 20) {
                if ((top <= $("#infoJobMenu").innerHeight() && top >= 10) && (document.documentElement.scrollHeight - $(window).innerHeight() > 200)) {
                    $('#infoJobMenu').addClass('mini-menu');
                    // $(window).scrollTop(top + 25);
                }
                scrolld = true;

            }
            lastScrollTop = top;
        }


        // callback
        var addition_constant = 0;

        function onScrollMob() {
            var top = $('#map').scrollTop();
            if (lastScrollTop > top) {
                if (top == 0) {
                    $('#infoJobMenu').removeClass('mini-menu');
                    $("#map").attr("style", `height: ${$(window).height() - $('#infoJobMenu').height()}px`);
                    scrolld = false;
                }
            } else if (lastScrollTop < top && lastScrollTop >= 20) {
                if (top <= $("#infoJobMenu").innerHeight() && top >= 10) {
                    $('#infoJobMenu').addClass('mini-menu');
                    $("#map").attr("style", `height: ${$(window).height() - $('#infoJobMenu').height()}px`);
                    // $(window).scrollTop(top + 25);
                }
                scrolld = true;

            }
            lastScrollTop = top;
        }

        // $("#map iframe").attr("height", $("#navbarsListJob>div").length * 145 + "px");
        // // $("#map").attr("height", $("#navbarsListJob>div").length * 145 + "px");
        // document.querySelector('#hideshow').addEventListener('click', function() {
        //     if ($('#hideshow').hasClass("hide")) {
        //         $("#infoJob").attr("style", "padding: 0px !important;height: 0px;");
        //         $("#map iframe").attr("height", $(window).height());
        //         $('#hideshow').html('<i class="fas fa-chevron-down d-none d-md-inline-block"></i> Show')
        //     } else {
        //         $("#infoJob").attr("style", "");
        //         $("#map iframe").attr("height", $("#navbarsListJob>div").length * 145 + "px");
        //         // $("#map").attr("height", $("#navbarsListJob>div").length * 145 + "px");
        //         $('#hideshow').html('<i class="fas fa-chevron-up d-none d-md-inline-block"></i> Hide')
        //     }

        //     $('#hideshow').toggleClass("show hide");
        // });
    }

    // select all on myjob page
    function selectAll() {
        $('#SelectAll').on('click', function() {
            if ($('#SelectAll').is(':checked')) {
                $(".listWrap #navbarsListJob input[type='checkbox']").prop('checked', true);

            } else {
                $(".listWrap #navbarsListJob input[type='checkbox']").prop('checked', false);

            }
        });

        $('#SelectAll2').on('click', function() {
            if ($('#SelectAll2').is(':checked')) {
                $(".listWrap #navbarsListJobPack input[type='checkbox']").prop('checked', true);

            } else {
                $(".listWrap #navbarsListJobPack input[type='checkbox']").prop('checked', false);

            }
        });
    }
    // added design and necessary classes if job list is empty
    function checkJob() {

        if ($('#map #navbarsListJob div').length == 0) {
            $('#map').addClass('emptyList');
            $('body').addClass('overflow-hidden');
            // $("#map").attr('style', `max-height: ${ $(window).innerHeight() - ($("#infoJob").innerHeight())}px`);
            $('#map .offcanvas-collapse').html('<img src="img/no_jobs.png" alt="No jobs image" class="no-job"><h1>Sorry, you have no jobs</h1>')
        }
    }
    // click on "Show Package button"
    function showPack() {
        let titledef = $('h1.fs-2 span').text();
        $(".d-grey.show-pack").on("click", function() {
            let datashow = ($(this).attr('data-show'));
            let title = ($(this).closest('.card-list-job.show-pack').find('p.title').text());
            $('#navbarsListJobPack .card-list-job').each(function(index) {
                $(this).attr('data-show') != datashow ? $(this).addClass('d-none') : $(this).removeClass('d-none');
            });
            $('#navbarsListJob').addClass("show-pack-list");
            setTimeout(function() {
                $('#navbarsListJob').addClass("d-none");
            }, 500);
            $('h1.fs-2 span').text(title);
            $('div#infoJobMenu').addClass('d-flex')
            $('#infoJobMenu .block.rounded-3').addClass('visually-hidden')
            if ($(window).innerWidth() > 767) {
                $('#navbarsListJobPack').attr("style", `height:${$('#navbarsListJob').innerHeight()}px`);
                if ($(window).scrollTop() > 10) {
                    $(window).scrollTop('11');
                }
            } else {

                $('#map').scrollTop('1');
            }

            $('#navbarsListJobPack').addClass("show-job-pack");
            $('#navbarsListJobPack').removeClass("visually-hidden");

            $('.form-applied .show-main').addClass("visually-hidden");
            $('.form-applied .show-pack').removeClass("visually-hidden");

            // $('#navbarsListJobPack').attr("style", `transform:translateY(-${(($('#navbarsListJob').innerHeight()-$(window).scrollTop())/$('#navbarsListJobPack').innerHeight())*100}%)`);
        });

        $(".form-applied .show-pack #back").on("click", function() {
            let scroll = $(window).scrollTop();
            $('#navbarsListJob').removeClass("show-pack-list");
            setTimeout(function() {
                $('#navbarsListJob').removeClass("d-none");
            }, 500);
            $('#navbarsListJobPack').attr("style", ``);

            $('#navbarsListJobPack').removeClass("show-job-pack");
            $('#navbarsListJobPack').addClass("visually-hidden");
            $('h1.fs-2 span').text(titledef);
            $('div#infoJobMenu').removeClass('d-flex')
            $('#infoJobMenu .block.rounded-3').removeClass('visually-hidden')
            $(window).scrollTop(scroll);

            $('.form-applied .show-main').removeClass("visually-hidden");
            $('.form-applied .show-pack').addClass("visually-hidden");
        });
    }

    //changing date on modal window 
    function formatDate(date) {
        if (date != "") {
            return date.replace(new RegExp('-', 'g'), '.');
            // let d = new Date(date),
            //     month = '' + (d.getMonth() + 1),
            //     day = '' + d.getDate(),
            //     year = d.getFullYear();
            // if (month.length < 2)
            //     month = '0' + month;
            // if (day.length < 2)
            //     day = '0' + day;

            // return [day, month, year].join('.');
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
            target = $(this);
            let newDate = $(this).html();
            $(".showdatefrom").html(newDate);
            let order_id = target.closest('form').find('input[name="order_id"]').val();
            $('input[name="change_date_order_id"]').val(order_id);
            $.ajax({
                url: "?Controller=Jobs&Action=ajaxGetAvailableDays",
                method: "POST",
                data: { order_id: order_id },
                success: function(response) {
                    let data = JSON.parse(response);
                    if (typeof data.errors !== "undefined" && data.errors.length == 0) {
                        let DateSet = window.SETTINGS ? window.SETTINGS : {};
                        data.dates.unshift(true);
                        DateSet.disable = data.dates;
                        $('.pick-date-disabled').pickadate(DateSet);
                        $('#pick-date-modal').modal('show');
                    }
                }
            });
        });
        // document.querySelector('#savedatefrom').addEventListener('click', function() {
        //     let newDate = formatDate($("#pick-date-modal .pick-date").val());
        //     if (newDate != "") {
        //         target.html(newDate);
        //     }
        //     $('#pick-date-modal').modal('hide')
        // });
    }

   function pickBranch() {
    var target;
    $( '.pick-branch-modal' ).on( 'click', function( e ) {
      target = $( this );
      let order_id = target.closest( 'form' ).find( 'input[name="order_id"]' ).val();
      $.ajax( {
                url    : '?Controller=Jobs&Action=ajaxGetAlternativeOrders',
                method : 'POST',
                data   : { order_id: order_id },
                success: function( response ) {
                  let data = JSON.parse( response );
                  if ( typeof data.errors !== 'undefined' && data.errors.length === 0 ) {
                    $( 'select[name="orderBranchChange"]' ).empty();
                    for ( const [ id, order ] of Object.entries( data.altOrders ) ) {
                      $( 'select[name="orderBranchChange"]' ).append('<option value="'+id+'">' + order + '</option>');
                    }
                    $( 'input[name="change_branch_order_id"]' ).val( order_id );
                    $( '#pick-branch-modal' ).modal( 'show' );
                  }
                },
              } );
      let newBranch = $( this ).html();
      $( '.showBranchfrom' ).html( newBranch );
    } );
  }

    $(function() {
        $('.selectpicker').selectpicker();
    });

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
            let DateSet = window.SETTINGS ? window.SETTINGS : { "formatSubmit": "yyyy-mm-dd" }
            console.log(DateSet)
            $('.pick-date').pickadate(DateSet);
            pickDate2();
            pickBranch();
        };
        if ($("#accordionFormJob").length) { mobileAccordion() };
        if ($('#map').length) {
            togglerMap();

            if (($(window).width() >= 1025)) {
                hideInfoJob();
            }
            selectAll();
            showPack();
        };
        if ($("#infoJob .cert-elem svg").length) { infoJobSvgDraw() }

    });

});