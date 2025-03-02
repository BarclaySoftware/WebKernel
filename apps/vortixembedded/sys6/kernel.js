function openWindow(type, title, url = "") {
    windowCount++;
    let windowId = 'window-' + windowCount;
    let content = type === 'text' 
        ? '<textarea></textarea>' 
        : `<iframe src="${url}"></iframe>`;
    
    let newWindow = $(`
        <div id="${windowId}" class="window">
            <div class="window-header">${title} <button onclick="$('#${windowId}').remove()">×</button></div>
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
}

$(document).ready(function() {
    initTaskbar();
});