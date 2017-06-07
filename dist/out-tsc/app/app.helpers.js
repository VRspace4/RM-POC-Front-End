"use strict";
/*
 * Inspinia js helpers:
 *
 * correctHeight() - fix the height of main wrapper
 * detectBody() - detect windows size
 * smoothlyMenu() - add smooth fade in/out on navigation show/ide
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
function correctHeight() {
    var pageWrapper = jQuery('#page-wrapper');
    var navbarHeight = jQuery('nav.navbar-default').height();
    var wrapperHeight = pageWrapper.height();
    if (navbarHeight > wrapperHeight) {
        pageWrapper.css('min-height', navbarHeight + 'px');
    }
    if (navbarHeight <= wrapperHeight) {
        if (navbarHeight < jQuery(window).height()) {
            pageWrapper.css('min-height', jQuery(window).height() + 'px');
        }
        else {
            pageWrapper.css('min-height', navbarHeight + 'px');
        }
    }
    if (jQuery('body').hasClass('fixed-nav')) {
        if (navbarHeight > wrapperHeight) {
            pageWrapper.css('min-height', navbarHeight + 'px');
        }
        else {
            pageWrapper.css('min-height', jQuery(window).height() - 60 + 'px');
        }
    }
}
exports.correctHeight = correctHeight;
function detectBody() {
    if (jQuery(document).width() < 769) {
        jQuery('body').addClass('body-small');
    }
    else {
        jQuery('body').removeClass('body-small');
    }
}
exports.detectBody = detectBody;
function smoothlyMenu() {
    if (!jQuery('body').hasClass('mini-navbar') || jQuery('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        jQuery('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(function () {
            jQuery('#side-menu').fadeIn(400);
        }, 200);
    }
    else if (jQuery('body').hasClass('fixed-sidebar')) {
        jQuery('#side-menu').hide();
        setTimeout(function () {
            jQuery('#side-menu').fadeIn(400);
        }, 100);
    }
    else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        jQuery('#side-menu').removeAttr('style');
    }
}
exports.smoothlyMenu = smoothlyMenu;
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
exports.generateUUID = generateUUID;
;
//# sourceMappingURL=app.helpers.js.map