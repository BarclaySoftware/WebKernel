// Copyright (c) 2024-2025 Aurorasoft. All Rights Reserved.

let topZ = 100; // track the highest z-index

function openWindow(type, title, url = "") {
    windowCount++;
    let windowId = 'window-' + windowCount;
    let content = type === 'text' 
        ? `<textarea>${url}</textarea>` 
        : `<iframe src="${url}"></iframe>`;
    
    let newWindow = $(`
        <div id="${windowId}" class="window" style="z-index:${topZ};">
            <div class="window-header">
                ${title}
                <button onclick="$('#${windowId}').remove()">×</button>
            </div>
            <div class="window-content">${content}</div>
        </div>
    `);

    // Add window to the desktop
    $('.desktop').append(newWindow);
    newWindow.addClass('show');  // Apply the fade-in effect

    // Make the window draggable and resizable
    newWindow.draggable({ 
        handle: ".window-header",
        containment: "parent" 
    }).resizable({ minHeight: 300, minWidth: 400 });

    // Bring window to front when clicked
    newWindow.on('mousedown', function() {
        topZ++;
        $(this).css('z-index', topZ);
    });

    newWindow.on('mousedown', function() {
        topZ++;
        $('.window').removeClass('active');
        $(this).addClass('active').css('z-index', topZ);
    });
}

$(document).ready(function() {
    initTaskbar();
});
