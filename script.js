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
    const header = windowElement.querySelector('.window-header');
    let isDragging = false;
    let offsetX, offsetY;

    // Handle both mouse and touch events
    header.addEventListener('mousedown', startDrag);
    header.addEventListener('touchstart', startDrag);

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;

        if (e.type === 'mousedown') {
            offsetX = e.clientX - windowElement.offsetLeft;
            offsetY = e.clientY - windowElement.offsetTop;
        } else if (e.type === 'touchstart') {
            var touch = e.touches[0];
            offsetX = touch.clientX - windowElement.offsetLeft;
            offsetY = touch.clientY - windowElement.offsetTop;
        }

        windowElement.style.zIndex = highestZIndex++;
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            if (e.type === 'mousemove') {
                let newLeft = e.clientX - offsetX;
                let newTop = e.clientY - offsetY;
                moveWindow(newLeft, newTop);
            } else if (e.type === 'touchmove') {
                var touch = e.touches[0];
                let newLeft = touch.clientX - offsetX;
                let newTop = touch.clientY - offsetY;
                moveWindow(newLeft, newTop);
            }
        }
    }

    function moveWindow(newLeft, newTop) {
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - windowElement.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - windowElement.offsetHeight));

        windowElement.style.left = `${newLeft}px`;
        windowElement.style.top = `${newTop}px`;
    }

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });
});

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

// Sets a default app to open on load.
window.onload = function () {
    openWindow('welcome');
};
