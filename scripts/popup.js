"use strict";

class Popup {
    create(id, content) {
        var body = document.getElementsByTagName('body')[0];

        var popup = document.createElement('div');
        popup.classList.add('popup');
        popup.classList.add(id);

        var overlay = document.createElement('div');
        overlay.classList.add('overlay');
        
        popup.innerHTML = content;
        popup.appendChild(overlay);
        body.appendChild(popup);
    }

    remove(id) {
        var body = document.getElementsByTagName('body')[0];
        var popups = document.getElementsByClassName(id);

        Array.from(popups).forEach((popup) => {
            body.removeChild(popup);
        });
    }
}