$(document).ready(function() {
    formValidation();
    toggleSubmenu();
    openMenu();
    closeMenu();
});

function formValidation(){
    $.validate({});
}

function toggleSubmenu(){
    $(".js-submenu-trigger").click(function(){
        $(".js-submenu-content").slideUp();
        $(this).find(".js-submenu-content").slideDown();
    });
}

function openMenu(){
    $(".js-menu-open").click(function(){
        $(".js-menu").fadeIn(100);
        $("body").addClass("no-scroll");
    })
}

function closeMenu(){
    $(".js-menu-close").click(function(){
        $(".js-menu").fadeOut(100);
        $("body").removeClass("no-scroll");
    })
}
