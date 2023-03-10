let titledef = '';
jQuery(document).ready(function ($) {
  if ($('table[data-tree-enable]').length) {
    $('table[data-tree-enable]').each(function () {
      if ($(this).hasClass('add-height')) {
        let height = window.innerHeight - 200;
        if ($('#record-nav').length) {
          height = height - 100;
        }
        $(this).attr('data-height', height);
      }
      $table = $(this);
      $(this).bootstrapTable({
        search: true,
        onPostBody: function () {
          input = $table.find('.search-input');
          var columns = $table.bootstrapTable('getOptions').columns;
          if (columns && columns[0][1].visible) {
            $table.treegrid({
              initialState: 'collapsed',
              treeColumn: 1,
              onChange: function () {
                $table.bootstrapTable('resetView');
              },
            });
          }
        },
        customSearch: function (data, text) {
          if (!text) {
            return data;
          }
          let res = filterRowsByText(text, data);
          return res;
        },
      });
    });
  }

  function filterRowsByText(text, rows) {
    text = text.toLowerCase();
    const filteredRows = rows.filter(row => {
      const hasText =
        row.name.toLowerCase().includes(text) || row.desc.toLowerCase().includes(text);
      if (hasText) {
        return true;
      } else {
        const isChild = row._class.includes('treegrid-parent-');
        const arrP = [];
        if (isChild) {
          const classP = row._class.match(/\btreegrid-parent-\d+\b/)[0];
          const parentId = classP.split('-')[2];
          const parentRow = rows.find(parent =>
            parent._id.startsWith(`node-${parentId}`) ? parent : false
          );
          arrP.push(parentRow);
          console.log(arrP);
          return true;
        } else {
          return false;
        }
      }
    });
    return filteredRows;
  }
  // initial for swaping menu
  var myCarousel = document.querySelector('#carouselMenu');
  if ($(myCarousel).find('li.active').length) {
    let activeTab = $(myCarousel).find('li.active').closest('.carousel-item');
    if (!$(activeTab[0]).hasClass('.active')) {
      $('.carousel-item').removeClass('active');
      $(activeTab[0]).addClass('active');
    }
  }
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: false,
    touch: false,
    wrap: false,
  });

  // add vh for mobile (needs for responsive, when bar with url hidding)
  if ($(window).width() < 768) {
    (function init100vh() {
      function setHeight() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      setHeight();
      window.addEventListener('resize', setHeight);
    })();
  }

  //switch off preloader
  function spinerOff() {
    $('#spinerWrap').addClass('d-none').removeClass('d-flex');
    $(document.body).removeClass('overflow-hidden');
  }

  // initial for toggle menu
  function drawStuff() {
    const cookieName = 'MenuStyle';
    var cookieValue = '';
    const daysToExpire = new Date(2147483647 * 1000).toUTCString();
    !getCookie(cookieName)
      ? (cookieValue = getCookie(cookieName))
      : (cookieValue = getCookie(cookieName));
    if ($(window).width() < 768) {
      $('.asidebar').addClass('collapse').removeClass('fliph left sidebar');
      $('.asidebar').attr('id', 'navigation');
      $('.animated-hamburger').removeClass('open');
    } else if ($(window).width() >= 768) {
      $('.asidebar').addClass('no-anim');
      $('.asidebar').removeClass('collapse');
      if (cookieValue == 'off') {
        $('.asidebar').addClass('fliph');
        $('.animated-hamburger').removeClass('open');
        popoverMenu();
      } else {
        $('.asidebar').removeClass('fliph');
        $('.animated-hamburger').addClass('open');
      }
      $('.asidebar').addClass('sidebar left');
      $('.asidebar').attr('id', '');
      setTimeout(() => $('.asidebar').removeClass('no-anim'), 500);
    }
    $('.navbar-toggler-button').on('click', function () {
      if ($(window).width() >= 768) {
        if (!$('.asidebar.fliph').length) {
          popoverMenu();
        } else {
          popoverMenuDestroy();
        }
        $('.asidebar.fliph').length ? (cookieValue = 'on') : (cookieValue = 'off');
        document.cookie =
          cookieName + '=' + cookieValue + ';samesite=strict; expires=' + daysToExpire;
        $('.asidebar').toggleClass('fliph');
      }
      $('.animated-hamburger').toggleClass('open');

      if ($('#map').length) {
        setTimeout(function () {
          $('.form-applied').attr('style', `width: ${$('.listWrap').innerWidth()}px`);
        }, 500);
      }
    });
  }

  const popoverTriggerMenu = document.querySelectorAll('[data-bs-toggle="popover-menu"]');
  let popoverListMenu = [];
  // function for show popover
  function popoverMenu() {
    popoverListMenu = [...popoverTriggerMenu].map(
      popoverTriggerEl =>
        new bootstrap.Popover(popoverTriggerEl, {
          placement: 'right',
          content: function () {
            return $(this).closest('li').find('span').text();
          },
          trigger: 'hover focus',
          fallbackPlacements: ['right'],
          customClass: 'no-title-popover',
        })
    );
  }
  function popoverMenuDestroy() {
    popoverListMenu.forEach(function (index, element) {
      index.disable();
    });
  }

  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function mobileAccordion() {
    if ($(window).width() < 768) {
      $('#headingOne').attr('data-bs-toggle', 'collapse');
    }
  }

  // drawing graph1 on Main page
  function drawDonut1() {
    let datawork = $('#donut1 .donut').attr('data-work').split(',');
    if (datawork[0] == 0 && datawork[1] == 0) {
      $('#donut1 svg').addClass('d-none');
      $('#donut1').closest('.bg-white.block').addClass('no-job');
      $('#donut1')
        .closest('.bg-white.block')
        .find('h5.title')
        .after(
          '<img src="checker-files/media/68/css/images/no_jobs.png" alt="No jobs image" class="no-job"><h5>Sorry, you have no jobs</h5>'
        );
      $('#legenddonut1').addClass('hidden');
    } else {
      if (datawork[0] == 0) {
        $('#donut1 .donut-segment-white').addClass('d-none');
        $('#donut1 .donut-segment-jobs').addClass('d-none');
      } else {
        datawork[1] == 0 ? $('#donut1 .donut-segment-white').addClass('d-none') : false;
        let valuework =
          (99 / (Number.parseInt(datawork[0]) + Number.parseInt(datawork[1]))) * datawork[0];
        if ($('#pers_info').length) {
          valuework = (99 / Number.parseInt(datawork[1])) * datawork[0];
        }
        $('#donut1 .donut-segment-white')
          .attr('stroke-dasharray', `${valuework + 0.5} ${100 - valuework - 0.5}`)
          .attr('stroke-dashoffset', `${(valuework + 0.5) / 2}`);
        $('#donut1 .donut-segment-jobs')
          .attr('stroke-dasharray', `${valuework} ${100 - valuework}`)
          .attr('stroke-dashoffset', `${valuework / 2}`);
        console.log(valuework);
      }

      let legend = $('#donut1 h5');
      datawork[1] == 0 ? false : legend[0].append(datawork[1]);
      datawork[0] == 0 ? false : legend[1].append(datawork[0]);
      if ($('#pers_info').length) {
        datawork[0] == 0 ? false : legend[1].append('%');
      } else {
      }
    }
    $('#donut1').removeClass('invisible');
  }

  // drawing graph2 on Main page
  function drawDonut2() {
    let datawork = $('#donut2 .donut').attr('data-work').split(',');
    if (datawork[0] == 0 && datawork[1] == 0) {
      $('#donut2 svg').addClass('d-none');
      $('#donut2').closest('.bg-white.block').addClass('no-job');
      $('#donut2')
        .closest('.bg-white.block')
        .find('h5.title')
        .after(
          '<img src="checker-files/media/68/css/images/no_jobs.png" alt="No jobs image" class="no-job"><h5>Sorry, you have no jobs</h5>'
        );
      $('#legenddonut2').addClass('hidden');
    } else {
      if (datawork[0] == 0) {
        $('#donut2 .donut-segment-white').addClass('d-none');
        $('#donut2 .donut-segment-jobs').addClass('d-none');
      } else {
        let valuework =
          (29.5 / (Number.parseInt(datawork[0]) + Number.parseInt(datawork[1]))) * datawork[0];
        $('#donut2 .donut-segment-white').attr(
          'stroke-dasharray',
          `${valuework} ${100 - valuework}`
        );
        $('#donut2 .donut-segment-jobs').attr(
          'stroke-dasharray',
          `${valuework} ${100 - valuework}`
        );

        if (datawork[1] == 0) {
          $('#donut2 .donut-segment-white').addClass('d-none');
          $('#donut2 .donut-ring-main').addClass('d-none');
          $('#donut2 .donut-segment-jobs').attr('stroke-dasharray', `30 70`);
        }
      }

      let legend = $('#donut2 h5 span');
      datawork[1] == 0
        ? $('#donut2 h5').addClass('justify-content-center').removeClass('justify-content-between')
        : legend[1].append(datawork[1]);
      datawork[0] == 0
        ? $('#donut2 h5').addClass('justify-content-center').removeClass('justify-content-between')
        : legend[0].append(datawork[0]);
    }
    $('#donut2').removeClass('invisible');
  }

  // toggle map and list on My Jobs Page
  function togglerMap() {
    if ($(window).width() < 1025) {
      hideInfoJob();
      $('#map #job-map').attr(
        'height',
        $(window).height() - $('#infoJobMenu').height() + 100 + 'px'
      );
      $('#map').attr('style', `height: ${$(window).height() - $('#infoJobMenu').height()}px`);
      $('#navbarSideCollapse').toggleClass('button-open');
      $('.button-open').removeAttr('id');
      document.querySelector('.button-open').addEventListener('click', function () {
        checkJob();
        // $('#infoJob').addClass('mini-menu')

        if ($('#map .offcanvas-collapse div').length != 0) {
          $('#map').attr('style', `height: ${$(window).height() - $('#infoJobMenu').height()}px`);
        }
        if ($('.button-open').length) {
          $('.listWrap').toggleClass('w-100');
          $('.listWrap').toggleClass('h-100');
          $('.offcanvas-collapse').toggleClass('open');
          $('.offcanvas-collapse').toggleClass('open-w100');
          $('#maptoggler').attr(
            'style',
            `right: ${$(window).width() / 2 - $('#maptoggler').innerWidth() / 2}px `
          );
          $('#maptoggler').toggleClass('show');

          $('#map').toggleClass('list');
          $('#map #job-map').attr('height', $(window).height() - $('#infoJobMenu').height() + 'px');
          $('.form-applied').attr('style', `width: ${$('.listWrap').innerWidth()}px`);
        } else {
          $('.listWrap').toggleClass('w-100');
          $('.listWrap').toggleClass('h-100');
          $('.offcanvas-collapse').toggleClass('open');
          $('#navbarSideCollapse').toggleClass('button-open');
          $('.offcanvas-collapse').removeClass('open-w100');
          $('#map #job-map').attr('height', $(window).height() - $('#infoJobMenu').height() + 'px');

          // console.log(1)
          $('.form-applied').attr('style', `width: ${$('.listWrap').innerWidth()}px`);
        }
      });

      document.querySelector('#maptoggler').addEventListener('click', function () {
        $('.offcanvas-collapse').toggleClass('open-w100');
        $('.listWrap').toggleClass('w-100');
        $('.listWrap').toggleClass('h-100');
        $('.offcanvas-collapse').toggleClass('open');
        $('.offcanvas-collapse').toggleClass('w-100');
        $('#maptoggler').attr(
          'style',
          `right: ${$('#map').innerWidth() / 2 - $('#maptoggler').innerWidth() / 2}px`
        );
        $('#maptoggler').toggleClass('show');
        $('#map').toggleClass('list');
        if ($('#map .offcanvas-collapse div').length == 0) {
          $('#map').attr('style', `height: ${$(window).height() - $('#infoJobMenu').height()}px`);
        }
        if ($('.emptyList') != 0) {
          $('#map').removeClass('emptyList');
        }
      });
    } else {
      const cookieName = 'MenuJobStyle';
      var cookieValue = '';
      const daysToExpire = new Date(2147483647 * 1000).toUTCString();
      !getCookie(cookieName)
        ? (cookieValue = getCookie(cookieName))
        : (cookieValue = getCookie(cookieName));
      $('#map').attr('style', 'height:' + ($(window).height() - 70) + 'px;');
      $(window).scrollTop(1);
      $('#map').addClass('overflow-visible');
      $('#job-map').attr(
        'style',
        `height: ${$(window).height() - 70 - $('#infoJobMenu').height()}px`
      );
      // console.log(2)

      if (cookieValue == 100) {
        open100(cookieName, cookieValue, daysToExpire);
        setTimeout(function () {
          $('#navbarSideCollapse').trigger('click');
          $('.offcanvas-collapse').addClass('open-w100');
        }, 50);
      } else if (cookieValue == 50) {
        setTimeout(function () {
          $('#navbarSideCollapse').trigger('click');
        }, 50);
      }

      document.querySelector('#navbarSideCollapse').addEventListener('click', function () {
        $('#map').addClass('overflow-hidden');
        $('#map').removeClass('overflow-visible');
        $('#map').attr('style', '');
        checkJob();

        if ($('.button-open').length) {
          open100(cookieName, cookieValue, daysToExpire);
        } else {
          $('#navbarSideCollapseClose').removeClass('visually-hidden');
          $('.listWrap').toggleClass('w-50');
          $('.offcanvas-collapse').toggleClass('open');
          $('.offcanvas-collapse').toggleClass('w-100');
          $('#navbarSideCollapse').toggleClass('button-open');
          $('.form-applied').attr('style', `width: ${$('.listWrap').innerWidth()}px`);
          $('.offcanvas-collapse').removeClass('open-w100');
          $('#job-map').attr(
            'style',
            `height: ${$(window).height() - 10 - $('#infoJobMenu').height()}px`
          );
          // console.log(3)

          cookieValue = 50;
          document.cookie =
            cookieName + '=' + cookieValue + ';samesite=strict; expires=' + daysToExpire;
        }
      });
      document.querySelector('#maptoggler').addEventListener('click', function () {
        $('#map').removeClass('overflow-hidden');
        $('#map').addClass('overflow-visible');
        $('#map').attr('style', 'height:' + ($(window).height() - 100) + 'px;');
        $('.form-applied').attr('style', `width: 0px`);
        $('.button-open').attr('id', 'navbarSideCollapse');
        $('#navbarSideCollapse').toggleClass('button-open');
        $('.offcanvas-collapse').toggleClass('open-w100');
        $('.listWrap').toggleClass('w-100');
        $('.offcanvas-collapse').toggleClass('open');
        $('.offcanvas-collapse').toggleClass('w-100');
        $('#maptoggler').attr(
          'style',
          `right: ${$('#map').innerWidth() - $('#maptoggler').innerWidth() / 2}px`
        );
        $('#maptoggler').toggleClass('show');

        $('#hideshow').toggleClass('d-none');
        cookieValue = 0;
        document.cookie =
          cookieName + '=' + cookieValue + ';samesite=strict; expires=' + daysToExpire;

        if ($('.emptyList') != 0) {
          $('#map').removeClass('emptyList');
        }
      });

      document.querySelector('#navbarSideCollapseClose').addEventListener('click', function () {
        $('#map').attr('style', 'height:' + ($(window).height() - 100) + 'px;');
        // $('#job-map').attr(
        //   'style',
        //   `height: ${$(window).height() - 70 - $('#infoJobMenu').height()}px`
        // );

        // console.log(4)
        $('#navbarSideCollapseClose').addClass('visually-hidden');
        $('.listWrap').toggleClass('w-50');
        $('.offcanvas-collapse').toggleClass('open');
        $('.offcanvas-collapse').toggleClass('w-100');
        $('#navbarSideCollapse').toggleClass('button-open');
        $('.form-applied').attr('style', `width: 0px`);
        $('.offcanvas-collapse').removeClass('open-w100');

        cookieValue = 0;
        document.cookie =
          cookieName + '=' + cookieValue + ';samesite=strict; expires=' + daysToExpire;
      });
    }
  }
  function open100(cookieName, cookieValue, daysToExpire) {
    $('#navbarSideCollapseClose').addClass('visually-hidden');
    $('.button-open').removeAttr('id');
    $('.offcanvas-collapse').toggleClass('open-w100');
    $('.listWrap').toggleClass('w-50');
    $('.listWrap').toggleClass('w-100');

    $('.form-applied').attr('style', `width: ${$('.listWrap').innerWidth()}px`);
    $('#maptoggler').attr(
      'style',
      `right: ${$('#map').innerWidth() / 2 - $('#maptoggler').innerWidth() / 2}px;top:calc(100% - ${
        $('.form-applied').height() + 75
      }px)`
    );

    if ($('#map #navbarsListJob div').length == 0) {
      $('#maptoggler').attr(
        'style',
        `right: ${
          $('#map').innerWidth() / 2 - $('#maptoggler').innerWidth() / 2
        }px;top:calc(100% - 50px)`
      );
    }
    $('#maptoggler').toggleClass('show');
    cookieValue = 100;
    document.cookie = cookieName + '=' + cookieValue + ';samesite=strict; expires=' + daysToExpire;
  }

  function hideInfoJob() {
    var lastScrollTop = 0;
    var $window = $(window);
    var heightBlock = $('#infoJobMenu').innerHeight();
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

          $('#job-map').attr(
            'style',
            `height: ${$(window).height() - 20 - $('#infoJobMenu').height()}px`
          );
          // console.log(5)
          scrolld = false;
        }
      } else if (lastScrollTop < top && lastScrollTop >= 20) {
        if (
          top <= $('#infoJobMenu').innerHeight() &&
          top >= 10 &&
          document.documentElement.scrollHeight - $(window).innerHeight() > 200
        ) {
          $('#infoJobMenu').addClass('mini-menu');

          $('#job-map').attr(
            'style',
            `height: ${$(window).height() - 26 - $('#infoJobMenu').height()}px`
          );
          // console.log(6)
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
          $('#map').attr('style', `height: ${$(window).height() - $('#infoJobMenu').height()}px`);
          scrolld = false;
        }
      } else if (lastScrollTop < top && lastScrollTop >= 20) {
        if (top <= $('#infoJobMenu').innerHeight() && top >= 10) {
          $('#infoJobMenu').addClass('mini-menu');
          $('#map').attr('style', `height: ${$(window).height() - $('#infoJobMenu').height()}px`);
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
    let checked = false;

    $(".listWrap .navbar-collapse input[type='checkbox']").on('click', function (e) {
      if ($(e.target).is(':checked')) {
        checked = true;
      } else {
        if (
          $(e.target)
            .closest('.navbar-collapse:not(.d-none)')
            .find("input[type='checkbox']:checked").length
        ) {
          checked = true;
        } else if (
          $(e.target)
            .closest('.navbar-collapse:not(.d-none)')
            .find("input[type='checkbox']:checked").length == 0
        ) {
          checked = false;
        }
      }
      checked
        ? $('.buttons-sel').removeClass('invisible')
        : $('.buttons-sel').addClass('invisible');
    });

    $('#SelectAll').on('click', function () {
      if ($('#SelectAll').is(':checked')) {
        $(".listWrap #navbarsListJob input[type='checkbox']")
          .prop('checked', true)
          .trigger('change');
        checked = true;
      } else {
        $(".listWrap #navbarsListJob input[type='checkbox']")
          .prop('checked', false)
          .trigger('change');
        checked = false;
      }
      checked
        ? $('.buttons-sel').removeClass('invisible')
        : $('.buttons-sel').addClass('invisible');
    });

    $('#SelectAll2').on('click', function () {
      if ($('#SelectAll2').is(':checked')) {
        $(".listWrap #navbarsListJobPack input[type='checkbox']")
          .prop('checked', true)
          .trigger('change');
        checked = true;
      } else {
        $(".listWrap #navbarsListJobPack input[type='checkbox']")
          .prop('checked', false)
          .trigger('change');
        checked = false;
      }
      checked
        ? $('.buttons-sel').removeClass('invisible')
        : $('.buttons-sel').addClass('invisible');
    });

    //$('#SelectAll').closest(".bg-white").find(".buttons-sel").removeClass("d-none")
  }
  // added design and necessary classes if job list is empty
  function checkJob() {
    if ($('#map #navbarsListJob div').length == 0) {
      $('#map').addClass('emptyList');
      $('body').addClass('overflow-hidden');
      $('#map .offcanvas-collapse').html(
        '<img src="img/no_jobs.png" alt="No jobs image" class="no-job"><h1>Sorry, you have no jobs</h1>'
      );
      $('#navbarsListJob').attr(
        'style',
        `height: ${$(window).innerHeight() - $('#infoJobMenu').innerHeight()}px`
      );
    } else {
      $('#navbarsListJob').attr(
        'style',
        `min-height: ${
          $(window).innerHeight() -
          $('#infoJobMenu').innerHeight() -
          $($('.card-list-job.form-applied')[0]).height()
        }px`
      );
    }
  }
  // click on "Show Package button"
  function showPack() {
    titledef = $('h1.fs-2 span').text();
    $(document)
      .off('click touchstart', '.d-grey.show-pack')
      .on('click touchstart', '.d-grey.show-pack', function () {
        if (!$('#navbarsListJob').hasClass('open')) {
          setTimeout(function () {
            $('#navbarSideCollapse').trigger('click');
          }, 50);
        }
        let datashow = $(this).attr('data-show');
        let title = $(this).closest('.card-list-job.show-pack').find('p.title').text();
        $('#navbarsListJobPack .card-list-job').each(function (index) {
          $(this).attr('data-show') != datashow
            ? $(this).addClass('d-none')
            : $(this).removeClass('d-none');
        });
        $('#navbarsListJob').addClass('show-pack-list');
        setTimeout(function () {
          $('#navbarsListJob').addClass('d-none');
        }, 500);
        $('h1.fs-2 span').text(title);
        $('div#infoJobMenu').addClass('d-flex');
        $('#infoJobMenu .block.rounded-3').addClass('visually-hidden');
        if ($(window).innerWidth() > 767) {
          $('#navbarsListJob').attr('style', `height:${$('#map').innerHeight()}px`);
          // $('#navbarsListJobPack').attr('style', `height:${$('#map').innerHeight()}px`);
          $('#navbarsListJobPack').attr('style', `${$('#navbarsListJobPack')[0].scrollHeight}px`);
          // $('#job-map').attr('style', `height:${$('#map').innerHeight()}px`);
          if ($(window).scrollTop() > 10) {
            $(window).scrollTop('11');
          }
        } else {
          $('#map').scrollTop('1');
        }

        $('#navbarsListJobPack').addClass('show-job-pack');
        $('#navbarsListJobPack').removeClass('visually-hidden');

        $('.form-applied .show-main').addClass('visually-hidden');
        $('.form-applied .show-pack').removeClass('visually-hidden');

        // $('#navbarsListJobPack').attr("style", `transform:translateY(-${(($('#navbarsListJob').innerHeight()-$(window).scrollTop())/$('#navbarsListJobPack').innerHeight())*100}%)`);

        $(document).on('click', '.accordion-header', function (e) {
          console.log($($(e.currentTarget).closest('#navbarsListJobPack'))[0].scrollLeftMax);
          $($(e.currentTarget).closest('#navbarsListJobPack'))[0].scrollHeight;
          $($(e.currentTarget).closest('#navbarsListJobPack')).attr(
            'style',
            `${$($(e.currentTarget).closest('#navbarsListJobPack'))[0].scrollHeight}px`
          );
        });
      });

    $(document)
      .off('click touchstart', '.form-applied .show-pack #back')
      .on('click touchstart', '.form-applied .show-pack #back', function () {
        let scroll = $(window).scrollTop();
        $('#navbarsListJob').removeClass('show-pack-list');
        setTimeout(function () {
          $('#navbarsListJob').removeClass('d-none');
        }, 500);
        $('#navbarsListJobPack').attr('style', ``);
        $('#navbarsListJob').attr('style', ``);

        $('#navbarsListJobPack').removeClass('show-job-pack');
        $('#navbarsListJobPack').addClass('visually-hidden');
        $('h1.fs-2 span').text(titledef);
        $('div#infoJobMenu').removeClass('d-flex');
        $('#infoJobMenu .block.rounded-3').removeClass('visually-hidden');
        $(window).scrollTop(scroll);

        $('.form-applied .show-main').removeClass('visually-hidden');
        $('.form-applied .show-pack').addClass('visually-hidden');
      });
  }

  //changing date on modal window
  function formatDate(date) {
    if (date != '') {
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
    $('#infoJob .cert-elem svg').each(function () {
      let datawork = $(this).attr('data-work');
      if (datawork == 100) {
        $(this)
          .find('.donut-ring-main')
          .attr('stroke-dasharray', `${datawork} 0`)
          .attr('stroke-dashoffset', `${datawork / 2}`);
      } else if (datawork < 10) {
        $(this)
          .find('.donut-ring-main')
          .attr('stroke-dasharray', ` ${datawork} 120 `)
          .attr('stroke-dashoffset', `32 `);
      } else {
        $(this)
          .find('.donut-ring-main')
          .attr('stroke-dasharray', `${datawork} ${110 - datawork}`)
          .attr('stroke-dashoffset', `20`);
      }
      $(this).closest('.result').find('.result-text').append(datawork);
      $(this).closest('.result').removeClass('invisible');
    });
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
    $('.pick-date-modal').on('click', function (e) {
      target = $(this);
      let newDate = $(this).html();
      $('.showdatefrom').html(newDate);
      let order_id = target.closest('form').find('input[name="order_id"]').val();
      $('input[name="change_date_order_id"]').val(order_id);
      $.ajax({
        url: '?Controller=Jobs&Action=ajaxGetAvailableDays',
        method: 'POST',
        data: { order_id: order_id },
        success: function (response) {
          let data = JSON.parse(response);
          if (typeof data.errors !== 'undefined' && data.errors.length == 0) {
            let DateSet = window.SETTINGS ? window.SETTINGS : {};
            data.dates.unshift(true);
            DateSet.disable = data.dates;
            $('.pick-date-disabled').pickadate(DateSet);
            $('#pick-date-modal').modal('show');
          }
        },
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
    $('.pick-branch-modal').on('click', function (e) {
      target = $(this);
      let order_id = target.closest('form').find('input[name="order_id"]').val();
      $.ajax({
        url: '?Controller=Jobs&Action=ajaxGetAlternativeOrders',
        method: 'POST',
        data: { order_id: order_id },
        success: function (response) {
          let data = JSON.parse(response);
          if (typeof data.errors !== 'undefined' && data.errors.length === 0) {
            $('select[name="orderBranchChange"]').empty();
            for (const [id, order] of Object.entries(data.altOrders)) {
              $('select[name="orderBranchChange"]').append(
                '<option value="' + id + '">' + order + '</option>'
              );
            }
            $('input[name="change_branch_order_id"]').val(order_id);
            $('select[name="orderBranchChange"]').selectpicker('refresh');
            $('#pick-branch-modal').modal('show');
          }
        },
      });
      let newBranch = $(this).html();
      $('.showBranchfrom').html(newBranch);
    });
  }

  $(function () {
    if ($('.selectpicker').length) {
      $('.selectpicker').selectpicker({
        selectedTextFormat: 'count > 3',
        actionsBox: true,
      });

      if ($('.selectpicker').hasClass('select-lang')) {
        $('div.select-lang option:selected').each(function () {
          console.log(
            $($(this).closest('.bootstrap-select')).find('.filter-option-inner-inner').text()
          );
          $($(this).closest('.bootstrap-select'))
            .find('.filter-option-inner-inner')
            .text($(this).val());
        });
      }
    }
  });

  $(function () {
    if ($('.start-lang.start-job').length) {
      $('.start-lang.start-job .dropdown-menu li').click(function () {
        let sel = $(this).attr('data-name');
        $(this)
          .closest('.start-lang.start-job')
          .find('button.dropdown-toggle')
          .addClass('sel')
          .attr('data-name', sel);
        // $(".btn:first-child").text($(this).attr("data-name"));
        //  $(".btn:first-child").val($(this).text());
      });
    }
  });

  $('aside .fa-bell')
    .parent()
    .click(function () {
      $('#shopper-message-modal').modal('show');
    });

  // page telephon survey
  $(function () {
    if ($('#switchTel').length) {
      document.querySelector('#switchTel').addEventListener('click', function () {
        let parentsWrap = $(this).closest('#widget-tel');
        this.checked ? parentsWrap.removeClass('deactive') : parentsWrap.addClass('deactive');
      });
    }
  });
  // page "Add new job", function show next element after select previous
  function showElem() {
    $('#create-job-form .selectpicker').on(
      'changed.bs.select',
      function (e, clickedIndex, isSelected, previousValue) {
        let elem = e.target.closest('.col-12');
        var index = $(elem).index() + 1;

        if (isSelected) {
          $(`#create-job-form>.col-12:nth-child(${index + 1})`).addClass('active');
          $(`#create-job-form>.col-12:nth-child(${index + 1})`).removeClass('inactive');
          while (index <= $(`#create-job-form>.col-12`).length) {
            if (!$(`#create-job-form>.col-12:nth-child(${index + 1})`).hasClass('mandatory')) {
              index = index + 1;

              $(`#create-job-form>.col-12:nth-child(${index + 1})`).addClass('active');
              $(`#create-job-form>.col-12:nth-child(${index + 1})`).removeClass('inactive');
            } else {
              break;
            }
          }
        } else {
          if ($(elem).hasClass('mandatory')) {
            for (var i = index + 1; i <= $(`#create-job-form>.col-12`).length; i++) {
              $(`#create-job-form>.col-12:nth-child(${i})`).removeClass('active');
              $(`#create-job-form>.col-12:nth-child(${i})`).addClass('inactive');
            }
          }
        }
      }
    );
  }
  // init popover
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  $('.box.image')
    .popover({
      trigger: 'manual',
      html: true,
      animation: false,
      sanitize: false,
    })
    .on('mouseenter', function () {
      var _this = this;
      $(this).popover('show');
      $('.popover').on('mouseleave', function () {
        $(_this).popover('hide');
      });
    })
    .on('mouseleave', function () {
      var _this = this;
      setTimeout(function () {
        if (!$('.popover:hover').length) {
          $(_this).popover('hide');
        }
      }, 300);
    });
  // page files library, function open iner folders
  function openInnF() {
    $('table').on('all.bs.table', function () {
      $('.open-folder').on('click', function (e) {
        let parent = $(e.target).closest('.parent_tr');
        parent.toggleClass('active');
        parent.siblings().each(function () {
          $(this).toggleClass('active');
        });
      });
    });
    setTimeout(function () {
      $('.open-folder').on('click', function (e) {
        let parent = $(e.target).closest('.parent_tr');
        parent.toggleClass('active');
        parent.siblings().each(function () {
          $(this).toggleClass('active');
        });
      });
      var popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
      );
      var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
      });
    }, 500);
  }

  // Move from one table to another by checkbox
  function MoveElem($tableFrom, $tableTo) {
    let arrDel = [];
    $tableFrom.closest('.bg-white').find('span.select').html('0');
    $tableFrom.find($('table.table tbody input[type="checkbox"]:checked')).each(function (i) {
      let j = $(this).closest('tr').attr('data-index');
      arrDel.push(Number(j));
      let row = $tableFrom.bootstrapTable('getData')[j];
      $tableTo.bootstrapTable('append', row);
    });
    $tableFrom.bootstrapTable('remove', {
      field: '$index',
      values: arrDel.reverse(),
    });
    $tableFrom.find("input[type='checkbox']").prop('checked', false);
  }

  function Sel() {
    $('table').on('all.bs.table', function () {
      $(this)
        .closest('.bg-white')
        .find('span.total')
        .html($(this).find('tbody>tr:not(.no-records-found)').length);

      $('input[type="checkbox"]').on('click', function () {
        $(this)
          .closest('.bg-white')
          .find('span.select')
          .html($(this).closest('tbody').find('input[type="checkbox"]:checked').length);
      });

      $('.selAll').on('click touchstart', function () {
        let par = $(this).attr('data-select');
        if ($(this).is(':checked')) {
          $(par).find("input[type='checkbox']").prop('checked', true).trigger('change');
          $(this)
            .closest('.bg-white')
            .find('span.select')
            .html($(this).closest('.bg-white').find('tbody>tr:not(.no-records-found)').length);
        } else {
          $(par).find("input[type='checkbox']").prop('checked', false).trigger('change');
          $(this).closest('.bg-white').find('span.select').html('0');
        }
      });
    });
  }
  if ($('.datepicker_inline').length) {
    let DateSet = window.SETTINGS
      ? window.SETTINGS
      : { formatSubmit: 'yyyy-mm-dd', editable: true };
    DateSet['editable'] = true;
    DateSet['closeOnSelect'] = false;
    DateSet['closeOnClear'] = false;
    DateSet['selectYears'] = true;
    DateSet['today'] = '';
    DateSet['clear'] = '';
    DateSet['close'] = '';

    var $input = $('.datepicker_inline').pickadate(DateSet);
    var picker = $input.pickadate('picker');
    picker.close = function () {
      return true;
    };
    picker.$node.addClass('picker__input--active picker__input--target');
    picker.$node.attr('aria-expanded', 'true');
    picker.$root.addClass('picker--focused picker--opened');
    picker.$root.attr('aria-hidden', 'false');

    var $input2 = $('.timepicker').pickatime({
      editable: true,
      format: 'HH:i',
      clear: '',
      interval: 15,
    });

    var picker2 = $input2.pickatime('picker');

    $('#setTime button').each(function (index) {
      $(this).on('click', function () {
        let currentDate = new Date();
        picker.set('select', currentDate);
        let min = $(this).attr('data-time');
        let newDate = dateAdd(new Date(), 'minute', min);
        $('#time-inline').val(
          `${newDate.getHours()}:${(newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes()}`
        );
        $(this)
          .closest('#setTime')
          .find('.active')
          .each(function () {
            $(this).removeClass('active');
          });
        $(this).addClass('active');
        if ($('#datetime').length) {
          $('#datetime').trigger('click');
        }
        $('#modalDateTime').modal('hide');
      });
    });
    $('#datetime').click(function () {
      let newDateTime = `${$('#date-inline').val()} ${$('#time-inline').val()}`;
      $('#hidden-input-date').val(newDateTime);
      if ($('.open-datetime').length) {
        $('.open-datetime').html(newDateTime);
        $('.open-datetime').addClass('sec-color');
      }
    });
  }
  $('#floatingSelect').on(
    'changed.bs.select',
    function (e, clickedIndex, isSelected, previousValue) {
      let newLabel = $(e.target[clickedIndex]).attr('aria-label');
      $('label[for="floatingSelect"]').html(newLabel);
    }
  );

  function dateAdd(date, interval, units) {
    if (!(date instanceof Date)) return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function () {
      if (ret.getDate() != date.getDate()) ret.setDate(0);
    };
    switch (String(interval).toLowerCase()) {
      case 'year':
        ret.setFullYear(ret.getFullYear() + units);
        checkRollover();
        break;
      case 'quarter':
        ret.setMonth(ret.getMonth() + 3 * units);
        checkRollover();
        break;
      case 'month':
        ret.setMonth(ret.getMonth() + units);
        checkRollover();
        break;
      case 'week':
        ret.setDate(ret.getDate() + 7 * units);
        break;
      case 'day':
        ret.setDate(ret.getDate() + units);
        break;
      case 'hour':
        ret.setTime(ret.getTime() + units * 3600000);
        break;
      case 'minute':
        ret.setTime(ret.getTime() + units * 60000);
        break;
      case 'second':
        ret.setTime(ret.getTime() + units * 1000);
        break;
      default:
        ret = undefined;
        break;
    }
    return ret;
  }

  $('#person-info').click(function () {
    let scrollW = $('#person-info').width() - $('#collapsePersInfo>div').width();
    if (scrollW > 3)
      $('#collapsePersInfo>div').attr('style', `width:calc(100% + ${scrollW}px - 1.6px)`);
  });
  $('#sur-preview').attr(
    'style',
    `height:${
      $(window).innerHeight() -
      $('#widget-tel').innerHeight() -
      $('.header-wrapper').innerHeight() -
      50
    }px`
  );
  $('#toggle').click(function () {
    setTimeout(function () {
      $('#sur-preview').attr(
        'style',
        `height:${
          $(window).innerHeight() -
          $('#widget-tel').innerHeight() -
          $('.header-wrapper').innerHeight() -
          50
        }px`
      );
    }, 500);
  });

  var myModalEl = document.querySelectorAll('.modal');
  for (var i = 0; i < myModalEl.length; i++) {
    var self = myModalEl[i];
    self.addEventListener('shown.bs.modal', function (event) {
      $('body').addClass('overflow-hidden');
    });
    self.addEventListener('hide.bs.modal', function (event) {
      $('body').removeClass('overflow-hidden');
    });
  }
  // open on full screen support for all browsers

  (function () {
    var fullScreenApi = {
        supportsFullScreen: false,
        isFullScreen: function () {
          return false;
        },
        requestFullScreen: function () {},
        cancelFullScreen: function () {},
        fullScreenEventName: '',
        prefix: '',
      },
      browserPrefixes = 'webkit moz o ms khtml'.split(' ');
    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
      fullScreenApi.supportsFullScreen = true;
    } else {
      // check for fullscreen support by vendor prefix
      for (var i = 0, il = browserPrefixes.length; i < il; i++) {
        fullScreenApi.prefix = browserPrefixes[i];
        if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] != 'undefined') {
          fullScreenApi.supportsFullScreen = true;
          break;
        }
      }
    }
    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
      fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
      fullScreenApi.isFullScreen = function () {
        switch (this.prefix) {
          case '':
            return document.fullScreen;
          case 'webkit':
            return document.webkitIsFullScreen;
          default:
            return document[this.prefix + 'FullScreen'];
        }
      };
      fullScreenApi.requestFullScreen = function (el) {
        return this.prefix === ''
          ? el.requestFullScreen()
          : el[this.prefix + 'RequestFullScreen']();
      };
      fullScreenApi.cancelFullScreen = function (el) {
        return this.prefix === ''
          ? document.cancelFullScreen()
          : document[this.prefix + 'CancelFullScreen']();
      };
    }
    // jQuery plugin
    if (typeof jQuery != 'undefined') {
      jQuery.fn.requestFullScreen = function () {
        return this.each(function () {
          if (fullScreenApi.supportsFullScreen) {
            fullScreenApi.requestFullScreen(this);
          }
        });
      };
    }
    // export api
    window.fullScreenApi = fullScreenApi;
  })();

  function setTab() {
    var triggerTabList = [].slice.call(document.querySelectorAll('a.tab'));

    triggerTabList.forEach(function (triggerEl) {
      var tabTrigger = new bootstrap.Tab(triggerEl);

      triggerEl.addEventListener('click', function (event) {
        event.preventDefault();
        var tab = $(this).data('next');

        fsElement = document.getElementById(tab);
        $(`#${tab}`).addClass('full-screen');
        fullScreenApi.requestFullScreen(fsElement);
        fsElement.addEventListener(
          fullScreenApi.fullScreenEventName,
          function () {
            if (fullScreenApi.isFullScreen()) {
              console.log('Whoa, you went fullscreen');
            } else {
              $(`#${tab}`).removeClass('full-screen');
            }
          },
          true
        );
      });
    });

    var triggerTabListBack = [].slice.call(document.querySelectorAll('.backtotab'));

    triggerTabListBack.forEach(function (triggerEl) {
      var tabTriggerBack = new bootstrap.Tab(triggerEl);

      triggerEl.addEventListener('click', function (event) {
        var tab = $(this).data('next');
        fsElement = document.getElementById(tab);

        fullScreenApi.cancelFullScreen(fsElement);
        $(`#${tab}`).removeClass('full-screen');
      });
    });
  }

  function AutoResize() {
    let allHeight = window.innerHeight;
    let headerHeight = $('.header-wrapper').innerHeight();
    let wrapper = $('#content>div').innerHeight();
    let tabHeight = $('#tabReportContent').innerHeight();

    let full = allHeight - headerHeight - 280;

    let detailed = $('#detailed').innerHeight();
    let summary = $('#summary').innerHeight();
    let flowProject = $('#flowProject').innerHeight();
    let flow = $('#flow').innerHeight();
    let shoppers = $('#shoppers').innerHeight();

    let heightEl = full / 3;

    $('#detailed .report-body').attr('style', `max-height:${heightEl}px`);
    $('#summary .report-body').attr('style', `max-height:${heightEl}px`);
    $('#flowProject .report-body').attr('style', `max-height:${heightEl}px`);
    $('#flow .report-body').attr('style', `max-height:${heightEl}px`);
    $('#shoppers .report-body').attr('style', `max-height:${heightEl}px`);
  }

  // show info in popup
  function showInfo() {
    $('.show-info').click(function (e) {
      $('.toast').find('.toast-body').attr('style', ``);
      e.preventDefault();
      let toast = $(e.target).closest('.bg-grey').find('.toast');
      $('.toast').each(function (index) {
        if (!(JSON.stringify($(this).html()) == JSON.stringify(toast.html()))) {
          $(this).addClass('hide');
        }
      });
      $(toast).addClass('bottom-0');
      $(toast).removeClass('top-0');

      if ($('.unfin-job').length) {
        let left =
          e.target.getBoundingClientRect().left -
          $(e.target).closest('.bg-grey')[0].getBoundingClientRect().left;
        let bottom =
          $(e.target).closest('.bg-grey')[0].getBoundingClientRect().bottom -
          e.target.getBoundingClientRect().bottom;
        if (
          bottom > 20 &&
          $(e.target).closest('.bg-grey')[0].getBoundingClientRect().top > bottom
        ) {
          $(toast).attr('style', `bottom:${bottom}px !important;`);
        }
        if (
          $(e.target).closest('.bg-grey')[0].getBoundingClientRect().right -
            e.target.getBoundingClientRect().left <=
          360
        ) {
          let right =
            $(e.target).closest('.bg-grey')[0].getBoundingClientRect().right -
            e.target.getBoundingClientRect().left;
          $(toast).css('right', `${right - 25}px`);
          $(toast).addClass('right-0');
        } else {
          $(toast).css('left', `${left}px`);
        }
        $(toast).removeClass('start-0');
      }

      $(toast).toast('show');
      var distance = $(toast)[0].getBoundingClientRect();
      if (distance.top < 0 && !$('#job-map').length) {
        var vh = window.innerHeight;
        if (vh - 300 - Math.abs(distance.top) < 200) {
          $(toast).removeClass('bottom-0');
          $(toast).addClass('top-0');
        } else {
          $(toast)
            .find('.toast-body')
            .attr('style', `max-height: calc(100vh - 300px - ${Math.abs(distance.top)}px)`);
        }
      } else if ($('#job-map').length) {
        var top2 = $('#navbarsListJobPack + div').offset().top;
        var $this = $(this);
        var topx = $this.offset().top;
        var distTop =
          topx - Math.abs($('#infoJobMenu').offset().top + $('#infoJobMenu').outerHeight());
        var distBot = $('#navbarsListJobPack + div').offset().top - topx - $this.outerHeight();
        if (distTop > distBot) {
          $(toast).find('.toast-body').attr('style', `max-height: calc(${distTop}px - 50px); `);
        } else {
          $(toast).removeClass('bottom-0');
          $(toast).addClass('top-0');
          $(toast).find('.toast-body').attr('style', `max-height: calc(${distBot}px - 60px); `);
        }
        $(toast).attr('style', `width: 600px; `);
      }
    });
  }

  function offcanvasBrief() {
    $('[aria-controls="offcanvasBrief"]').click(function (e) {
      let info = $(e.target).closest('.bg-grey').find('.toast').html();
      let elem = $(e.target).attr('data-bs-target');
      let rsz = `<div id="rsz"></div>`;
      $(elem).html(rsz + info);
      var doc = document,
        wd = $(elem).width(),
        main = document.querySelector('#offcanvasBrief'),
        x,
        dx;

      var startResize = function (evt) {
        x = evt.screenX;
      };

      var resize = function (evt) {
        dx = evt.screenX - x;
        x = evt.screenX;
        wd -= dx;
        main.style.width = wd + 'px';
      };

      $(document)
        .off('mousedown', '#rsz')
        .on('mousedown', '#rsz', function (evt) {
          startResize(evt);
          doc.body.addEventListener('mousemove', resize);
          doc.body.addEventListener('mouseup', function () {
            doc.body.removeEventListener('mousemove', resize);
          });
        });
    });
  }
  offcanvasBrief();

  // editDate in pickdate input

  function editDate() {
    var triggerTabList = [].slice.call(document.querySelectorAll('.pick-date'));

    triggerTabList.forEach(function (element) {
      var dateMask = IMask(element, {
        mask: 'd-`m-`Y', // enable date mask

        // other options are optional
        pattern: 'Y-`m-`d', // Pattern mask with defined blocks, default is 'd{.}`m{.}`Y'
        // you can provide your own blocks definitions, default blocks for date mask are:
        blocks: {
          d: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2,
          },
          m: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
          },
          Y: {
            mask: IMask.MaskedRange,
            from: 1900,
            to: 9999,
          },
        },
        // define date -> str convertion
        format: function (date) {
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();

          if (day < 10) day = '0' + day;
          if (month < 10) month = '0' + month;

          return [year, month, day].join('-');
        },
        // define str -> date convertion
        parse: function (str) {
          var yearMonthDay = str.split('-');
          return new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]);
        },

        // optional interval options
        min: new Date(2000, 0, 1), // defaults to `1900-01-01`
        max: new Date(2020, 0, 1), // defaults to `9999-01-01`

        autofix: true, // defaults to `false`

        // also Pattern options can be set
        lazy: false,

        // and other common options
        overwrite: true, // defaults to `false`
      });

      dateMask.on('complete', function () {
        let date = dateMask.value;
        let elem = $(dateMask.el)[0]['input'];

        $(elem).pickadate('picker').set('select', date, { format: 'dd-mm-yyyy' });
        dateMask.updateValue(date);
      });
    });
  }

  // show search box in table if something inside

  $(document)
    .off('keyup', 'th .search-input')
    .on('keyup', 'th .search-input', function () {
      $(this).val()
        ? $(this).closest('th').addClass('show')
        : $(this).closest('th').removeClass('show');
    });

  // $(document)
  // .off('changed.bs.select', '.select-lang')
  // .on('changed.bs.select', '.select-lang', function (e) {
  //   $(this).val()
  //     ? $(this)
  //         .siblings('.dropdown-toggle')
  //         .find('.filter-option-inner-inner')
  //         .html($(this).val())
  //     : false;
  // });

  function hexToHsl(hex) {
    // Convert hex to RGB
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);

    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    // Convert HSL values to percentages
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    // Return the HSL string
    return { h: h, s: s, l: l };
  }

  class Color {
    constructor(r, g, b) {
      this.set(r, g, b);
    }

    toString() {
      return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
    }

    set(r, g, b) {
      this.r = this.clamp(r);
      this.g = this.clamp(g);
      this.b = this.clamp(b);
    }

    hueRotate(angle = 0) {
      angle = (angle / 180) * Math.PI;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      this.multiply([
        0.213 + cos * 0.787 - sin * 0.213,
        0.715 - cos * 0.715 - sin * 0.715,
        0.072 - cos * 0.072 + sin * 0.928,
        0.213 - cos * 0.213 + sin * 0.143,
        0.715 + cos * 0.285 + sin * 0.14,
        0.072 - cos * 0.072 - sin * 0.283,
        0.213 - cos * 0.213 - sin * 0.787,
        0.715 - cos * 0.715 + sin * 0.715,
        0.072 + cos * 0.928 + sin * 0.072,
      ]);
    }

    grayscale(value = 1) {
      this.multiply([
        0.2126 + 0.7874 * (1 - value),
        0.7152 - 0.7152 * (1 - value),
        0.0722 - 0.0722 * (1 - value),
        0.2126 - 0.2126 * (1 - value),
        0.7152 + 0.2848 * (1 - value),
        0.0722 - 0.0722 * (1 - value),
        0.2126 - 0.2126 * (1 - value),
        0.7152 - 0.7152 * (1 - value),
        0.0722 + 0.9278 * (1 - value),
      ]);
    }

    sepia(value = 1) {
      this.multiply([
        0.393 + 0.607 * (1 - value),
        0.769 - 0.769 * (1 - value),
        0.189 - 0.189 * (1 - value),
        0.349 - 0.349 * (1 - value),
        0.686 + 0.314 * (1 - value),
        0.168 - 0.168 * (1 - value),
        0.272 - 0.272 * (1 - value),
        0.534 - 0.534 * (1 - value),
        0.131 + 0.869 * (1 - value),
      ]);
    }

    saturate(value = 1) {
      this.multiply([
        0.213 + 0.787 * value,
        0.715 - 0.715 * value,
        0.072 - 0.072 * value,
        0.213 - 0.213 * value,
        0.715 + 0.285 * value,
        0.072 - 0.072 * value,
        0.213 - 0.213 * value,
        0.715 - 0.715 * value,
        0.072 + 0.928 * value,
      ]);
    }

    multiply(matrix) {
      const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
      const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
      const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
      this.r = newR;
      this.g = newG;
      this.b = newB;
    }

    brightness(value = 1) {
      this.linear(value);
    }
    contrast(value = 1) {
      this.linear(value, -(0.5 * value) + 0.5);
    }

    linear(slope = 1, intercept = 0) {
      this.r = this.clamp(this.r * slope + intercept * 255);
      this.g = this.clamp(this.g * slope + intercept * 255);
      this.b = this.clamp(this.b * slope + intercept * 255);
    }

    invert(value = 1) {
      this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
      this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
      this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
    }

    hsl() {
      // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
      const r = this.r / 255;
      const g = this.g / 255;
      const b = this.b / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h,
        s,
        l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return {
        h: h * 100,
        s: s * 100,
        l: l * 100,
      };
    }

    clamp(value) {
      if (value > 255) {
        value = 255;
      } else if (value < 0) {
        value = 0;
      }
      return value;
    }
  }

  class Solver {
    constructor(target, baseColor) {
      this.target = target;
      this.targetHSL = target.hsl();
      this.reusedColor = new Color(0, 0, 0);
    }

    solve() {
      const result = this.solveNarrow(this.solveWide());
      return {
        values: result.values,
        loss: result.loss,
        filter: this.css(result.values),
      };
    }

    solveWide() {
      const A = 5;
      const c = 15;
      const a = [60, 180, 18000, 600, 1.2, 1.2];

      let best = { loss: Infinity };
      for (let i = 0; best.loss > 25 && i < 3; i++) {
        const initial = [50, 20, 3750, 50, 100, 100];
        const result = this.spsa(A, a, c, initial, 1000);
        if (result.loss < best.loss) {
          best = result;
        }
      }
      return best;
    }

    solveNarrow(wide) {
      const A = wide.loss;
      const c = 2;
      const A1 = A + 1;
      const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
      return this.spsa(A, a, c, wide.values, 500);
    }

    spsa(A, a, c, values, iters) {
      const alpha = 1;
      const gamma = 0.16666666666666666;

      let best = null;
      let bestLoss = Infinity;
      const deltas = new Array(6);
      const highArgs = new Array(6);
      const lowArgs = new Array(6);

      for (let k = 0; k < iters; k++) {
        const ck = c / Math.pow(k + 1, gamma);
        for (let i = 0; i < 6; i++) {
          deltas[i] = Math.random() > 0.5 ? 1 : -1;
          highArgs[i] = values[i] + ck * deltas[i];
          lowArgs[i] = values[i] - ck * deltas[i];
        }

        const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
        for (let i = 0; i < 6; i++) {
          const g = (lossDiff / (2 * ck)) * deltas[i];
          const ak = a[i] / Math.pow(A + k + 1, alpha);
          values[i] = fix(values[i] - ak * g, i);
        }

        const loss = this.loss(values);
        if (loss < bestLoss) {
          best = values.slice(0);
          bestLoss = loss;
        }
      }
      return { values: best, loss: bestLoss };

      function fix(value, idx) {
        let max = 100;
        if (idx === 2 /* saturate */) {
          max = 7500;
        } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
          max = 200;
        }

        if (idx === 3 /* hue-rotate */) {
          if (value > max) {
            value %= max;
          } else if (value < 0) {
            value = max + (value % max);
          }
        } else if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }
        return value;
      }
    }

    loss(filters) {
      // Argument is array of percentages.
      const color = this.reusedColor;
      color.set(0, 0, 0);

      color.invert(filters[0] / 100);
      color.sepia(filters[1] / 100);
      color.saturate(filters[2] / 100);
      color.hueRotate(filters[3] * 3.6);
      color.brightness(filters[4] / 100);
      color.contrast(filters[5] / 100);

      const colorHSL = color.hsl();
      return (
        Math.abs(color.r - this.target.r) +
        Math.abs(color.g - this.target.g) +
        Math.abs(color.b - this.target.b) +
        Math.abs(colorHSL.h - this.targetHSL.h) +
        Math.abs(colorHSL.s - this.targetHSL.s) +
        Math.abs(colorHSL.l - this.targetHSL.l)
      );
    }

    css(filters) {
      function fmt(idx, multiplier = 1) {
        return Math.round(filters[idx] * multiplier);
      }
      return `filter: invert(${fmt(
        0
      )}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%);`;
    }
  }

  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : null;
  }

  // function change theme

  function changeTheme(themeSettings) {
    const cookieName = 'themeSettings';
    !getCookie(cookieName)
      ? (cookieValue = getCookie(cookieName))
      : (cookieValue = getCookie(cookieName));
    if (!cookieValue) {
      $('body').addClass('light');
      return;
    }
    cookieValue = JSON.parse(cookieValue);
    $('body').addClass(cookieValue.theme);

    if ($('.themeSettingsCSS').length) {
      $('.themeSettingsCSS').remove();
    }

    if (cookieValue.theme == 'light') {
      return;
    }
    if (cookieValue.theme == 'dark') {
      $('body').append(
        '<link class="themeSettingsCSS" rel="stylesheet" href="./css/dark_theme.css" type="text/css" />'
      );
    } else {
      $('head').append(`<style class="themeSettingsCSS">
                    :root{
                        ${cookieValue.settingColor}
                    }
                    </style>`);
    }
  }
  //initial all function on load page

  $(window).resize(function () {
    drawStuff();
    if ($('#accordionFormJob').length) {
      mobileAccordion();
    }
  });

  $(document).ready(function () {
    $('.accordion-button a').click(function () {
      if (!$(this).prop('disabled')) {
        window.location.href = $(this).attr('href');
      }
    });

    $('#Region').change(function () {
      let regions = [];
      $('option:selected', this).each(function () {
        regions.push($(this).attr('value'));
      });

      $.ajax({
        url: '?Controller=Jobs&Action=cities',
        method: 'POST',
        data: { regions_id: regions },
        success: function (response) {
          let data = JSON.parse(response);

          $('#City option').remove();

          for (let i = 0; i < data.length; i++) {
            $('#City').append($('<option value="' + data[i].CityID + '"/>').text(data[i].CityName));
          }

          $('#City').dropdown('update');
        },
      });
    });

    $('.btn-number').click(function (e) {
      e.preventDefault();

      fieldName = $(this).attr('data-field');
      type = $(this).attr('data-type');
      var input = $("input[name='" + fieldName + "']");
      var currentVal = parseInt(input.val());
      if (!isNaN(currentVal)) {
        if (type == 'minus') {
          if (currentVal > input.attr('min')) {
            input.val(currentVal - 1).change();
          }
          if (parseInt(input.val()) == input.attr('min')) {
            $(this).attr('disabled', true);
          }
        } else if (type == 'plus') {
          if (currentVal < input.attr('max')) {
            input.val(currentVal + 1).change();
          }
          if (parseInt(input.val()) == input.attr('max')) {
            $(this).attr('disabled', true);
          }
        }
      } else {
        input.val(0);
      }
    });

    changeTheme();
    setTimeout(() => spinerOff(), 400);

    drawStuff();
    if ($('#donut1').length) {
      drawDonut1();
    }
    if ($('#donut2').length) {
      drawDonut2();
    }
    if ($('.pick-date').length) {
      let DateSet = window.SETTINGS
        ? window.SETTINGS
        : { formatSubmit: 'yyyy-mm-dd', editable: true };
      DateSet['editable'] = true;
      DateSet['today'] = '';
      DateSet['selectYears'] = true;
      DateSet.format = 'dd-mm-yyyy';
      $('.pick-date').pickadate(DateSet);
      editDate();
      pickDate2();
      pickBranch();
    }
    if ($('#accordionFormJob').length) {
      mobileAccordion();
    }
    if ($('#map').length) {
      togglerMap();

      if ($(window).width() >= 1025) {
        hideInfoJob();
      }
      selectAll();
      showPack();
    }
    if ($('#infoJob .cert-elem svg').length) {
      infoJobSvgDraw();
    }
    if ($('#create-job-form .selectpicker').length) {
      showElem();
    }
    if ($('.fht-cell').length) {
      $('.fht-cell').each(function (index) {
        let width = $(this).siblings().innerWidth();
        $(this).attr('style', `width:${width - 20}px`);
      });
      $('table').on('all.bs.table', function () {
        $('.fht-cell').each(function (index) {
          let width = $(this).siblings().innerWidth();
          $(this).attr('style', `width:${width - 20}px`);
        });
      });
    }
    if ($('a.open-folder').length) {
      openInnF();
    }
    if ($('a.show-info').length) {
      showInfo();
    }
    if ($('#pref-reg #all-reg').length) {
      $('#add').on(
        'click',
        MoveElem.bind(null, $('#all-reg table.mini-table'), $('#pr-reg table.mini-table'))
      );
      $('#remove').on(
        'click',
        MoveElem.bind(null, $('#pr-reg table.mini-table'), $('#all-reg table.mini-table'))
      );
      Sel();
    }
    if ($('#tabReportContent').length) {
      $(document).on('shown.bs.tab', '#reportTab a', function (e) {
        var element = document.querySelector('#reportTab a.active');
        element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        $('body').scrollTop(0);
        $('#content').scrollTop(0);
      });
      if ($(window).width() > 768) {
        (function showTabs() {
          $('#tabAll').parent().addClass('active');
          $('.tab-pane').addClass('active in show');
          $('[data-toggle="tab"]').parent().removeClass('active');
        })();

        AutoResize();
      }
      setTab();
    }
    if ($('tbody.blue-grey-scroll>tr').length) {
      // $("tbody.blue-grey-scroll>tr").closest('table').find("thead>tr").attr("style",`width:${$("tbody.blue-grey-scroll>tr").innerWidth()}px`)
    }
    if ($('#file-chosen').length) {
      const actualBtn = document.getElementById('actual-btn');
      const fileChosen = document.getElementById('file-chosen');
      actualBtn.addEventListener('change', function () {
        fileChosen.textContent = this.files[0].name;
      });
    }

    var popoverTriggerList = [].slice.call(document.querySelectorAll('.set-link'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      popoverTriggerEl.addEventListener('shown.bs.popover', function (e) {
        if ($(e.target).hasClass('set-link')) {
          const cookieName = 'themeSettings';
          !getCookie(cookieName)
            ? (cookieValue = getCookie(cookieName))
            : (cookieValue = getCookie(cookieName));
          if (!cookieValue) {
            return;
          }
          cookieValue = JSON.parse(cookieValue);
          if (cookieValue.theme == 'dark') {
            $('.popover #darkTheme').prop('checked', true);
          } else if (cookieValue.theme == 'custom') {
            console.log($('.popover #customTheme'));
            $('.popover #customTheme').prop('checked', true);
            console.log(cookieValue.values);
            if (cookieValue.values) {
              for (const [key, value] of Object.entries(cookieValue.values)) {
                console.log(`${key}: ${value}`);
                $(`.popover #${key}`).val(value);
              }
            }
          }
        }
      });
      return new bootstrap.Popover(popoverTriggerEl, {
        template:
          '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body p-32"></div></div>',
        customClass: 'settings-popover',
        html: true,
        sanitize: false,

        placement: 'right',
        fallbackPlacements: ['right'],
        content: function () {
          return $('#settings-content').html();
        },
      });
    });

    $(document)
      .off('click touchstart', '.btn[data-title="Facebook"]')
      .on('click touchstart', '.btn[data-title="Facebook"]', function () {
        checkLoginState();
      });

    if ($('#job-map').length) {
      $(document)
        .off('click touchstart', '#job-map')
        .on('click touchstart', '#job-map', function () {
          $('.selectpicker').selectpicker({ selectedTextFormat: 'count > 3', actionsBox: true });
          var popoverTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="popover"]')
          );
          var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
          });

          $(document)
            .off('click touchstart', '#job-map .show-list-pack')
            .on('click touchstart', '#job-map .show-list-pack', function () {
              if ($('#navbarsListJob.show-pack-list').length) {
                let scroll = $(window).scrollTop();
                $('#navbarsListJob').removeClass('show-pack-list');
                setTimeout(function () {
                  $('#navbarsListJob').removeClass('d-none');
                }, 500);
                $('#navbarsListJobPack').attr('style', ``);
                $('#navbarsListJob').attr('style', ``);
                $('h1.fs-2 span').text(titledef);

                $('#navbarsListJobPack').removeClass('show-job-pack');
                $('#navbarsListJobPack').addClass('visually-hidden');
                $('div#infoJobMenu').removeClass('d-flex');
                $('#infoJobMenu .block.rounded-3').removeClass('visually-hidden');
                $(window).scrollTop(scroll);

                $('.form-applied .show-main').removeClass('visually-hidden');
                $('.form-applied .show-pack').addClass('visually-hidden');

                if ($(window).width() < 768) {
                  $('#map .navbar-toggler.button-open').trigger('click');
                }
              } else {
                if ($(window).width() < 768) {
                  $('#map .navbar-toggler.button-open').trigger('click');
                } else $('#navbarSideCollapse').trigger('click');
              }
            });
        });
    }

    // change theme on click

    // $(document)
    //   .off('change', '.settings-popover input')
    //   .on('change', '.settings-popover input', function () {

    //});
    $(document)
      .off('click', '#saveTheme')
      .on('click', '#saveTheme', function () {
        let themeSettings = {};
        if ($('input[name="selectTheme"]:checked').val() == 'light') {
          themeSettings.theme = 'light';
        }
        if ($('input[name="selectTheme"]:checked').val() == 'dark') {
          themeSettings.theme = 'dark';
        } else if ($('input[name="selectTheme"]:checked').val() == 'custom') {
          themeSettings.theme = 'custom';
          themeSettings.settingColor = '';
          themeSettings.values = {};

          if ($('.popover #mainBrandColor').val() != '#000001') {
            let hexColor = $('.popover #mainBrandColor').val();
            let hslColor = hexToHsl(hexColor);

            let color = `${hslColor.h}, ${hslColor.s}%`;
            let l = `${hslColor.l}%`;

            themeSettings.settingColor += `--color:${color};--l:${l};`;
            themeSettings.values.mainBrandColor = hexColor;
          }

          if ($('.popover #secondBrandColor').val() != '#000001') {
            let hexColor = $('.popover #secondBrandColor').val();
            let hslColor = hexToHsl(hexColor);

            let secColor = `${hslColor.h}, ${hslColor.s}%`;
            let secl = `${hslColor.l}%`;

            const rgb = hexToRgb(hexColor);
            const color = new Color(rgb[0], rgb[1], rgb[2]);

            let solve;
            let result;
            do {
              solver = new Solver(color);
              result = solver.solve();
            } while (result.loss > 5);

            themeSettings.settingColor += `--sec-color: ${secColor};--sec-l: ${secl};--${result.filter}`;
            themeSettings.values.secondBrandColor = hexColor;
          }

          if ($('.popover #fontColor').val() != '#000001') {
            let fontColor = $('.popover #fontColor').val();
            themeSettings.settingColor += `--font-color: ${fontColor};`;
            themeSettings.values.fontColor = fontColor;
          }

          if ($('.popover #backgroundColor').val() != '#000001') {
            let bgColor = $('.popover #backgroundColor').val();
            themeSettings.settingColor += `--backg-color: ${bgColor};`;
            themeSettings.values.backgroundColor = bgColor;
          }
        }

        let cookieName = 'themeSettings';
        var cookieValue = themeSettings;
        const daysToExpire = new Date(2147483647 * 1000).toUTCString();

        document.cookie =
          cookieName +
          '=' +
          encodeURIComponent(JSON.stringify(cookieValue)) +
          ';samesite=strict; expires=' +
          daysToExpire;

        changeTheme(themeSettings);
        $('.set-link').popover('hide');
      });
  });
});
