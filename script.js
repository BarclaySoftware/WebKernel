// Copyright (c) 2024 The Caesium Project Authors. All rights reserved.

let highestZIndex = 1;

// Opens the app window when the icon is clicked.
function openWindow(id) {
    var win = document.getElementById(id);
    var appIcon = document.getElementById('app-' + id);

    if (win) {
        win.style.display = 'flex';
        win.style.zIndex = highestZIndex++;
        if (appIcon) {
            appIcon.classList.add('active-appbar-icon');
        }
    }
}

// Closes the app window when the close button is clicked.
function closeWindow(id) {
    var win = document.getElementById(id);
    var appIcon = document.getElementById('app-' + id);

    if (win) {
        win.style.display = 'none';
        if (appIcon) {
            appIcon.classList.remove('active-appbar-icon');
        }
    }
}

// Loads the user into SafeMode.
// window.addEventListener('keydown', function(event) {
//    if (event.ctrlKey && event.key === 'g') {
//        event.preventDefault();
//        window.location.href = './try.html';
//    }
// });

document.querySelectorAll('.window').forEach(windowElement => {
    // Controls how the user can move the app windows.
    const header = windowElement.querySelector('.window-header');
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - windowElement.offsetLeft;
        offsetY = e.clientY - windowElement.offsetTop;
        windowElement.style.zIndex = highestZIndex++;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let newLeft = e.clientX - offsetX;
            let newTop = e.clientY - offsetY;

            newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - windowElement.offsetWidth));
            newTop = Math.max(0, Math.min(newTop, window.innerHeight - windowElement.offsetHeight));

            windowElement.style.left = `${newLeft}px`;
            windowElement.style.top = `${newTop}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

// Sets a default app to open on load.
window.onload = function () {
    openWindow('welcome');
}