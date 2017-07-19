"use strict";

class Popup {
    create(id, html) {
        var body = document.getElementsByTagName('body')[0];

        var popup = document.createElement('div');
        popup.classList.add('popup');
        popup.classList.add(id);

        var overlay = document.createElement('div');
        overlay.classList.add('overlay');
        
        var content = document.createElement('div');
        content.classList.add('content');
        content.innerHTML = html;

        popup.appendChild(content);
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