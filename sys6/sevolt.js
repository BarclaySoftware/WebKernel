let windowCount = 0;
const defaultIcon = "https://via.placeholder.com/30";
const defaultUrl = "https://example.com";
const defaultTitle = "Untitled App";

const apps = [
    { title: "Caesium Browser", type: "iframe", url: "https://caesiumapps.pages.dev/browser/", icon: "https://delivercdn.pages.dev/barclay/images/caesium/zircon/minibrowser.png" },
    { title: "Barclay Go", type: "iframe", url: "https://caesiumapps.pages.dev/search/", icon: "https://delivercdn.pages.dev/barclay/images/caesium/zircon/search.png" },
    { title: "Clock", type: "iframe", url: "https://caesiumapps.pages.dev/clock/", icon: "https://delivercdn.pages.dev/barclay/images/caesium/zircon/clock.png" },
    { title: "Notes", type: "iframe", url: "https://caesiumapps.pages.dev/notes/", icon: "https://delivercdn.pages.dev/barclay/images/caesium/zircon/notes.png" },
    { title: "AS-WOS Embedded", type: "iframe", url: "https://as-wos.pages.dev/", icon: "https://rubisco.pages.dev/assets/favicon.png" },
    { title: "Calculator", type: "iframe", url: "https://exambook.pages.dev/tools/subjects/math/mathsolver/", icon: "https://rubisco.pages.dev/assets/favicon.png" },
    { title: "SysInfo", type: "iframe", url: "https://rubisco.pages.dev/sysinfo/", icon: "https://rubisco.pages.dev/assets/favicon.png" },
    { title: "MediaPlay", type: "iframe", url: "https://caesiumapps.pages.dev/media/", icon: "https://rubisco.pages.dev/assets/favicon.png" },
    { title: "WebHTML", type: "iframe", url: "https://webhtml.pages.dev/", icon: "https://webhtml.pages.dev/icon.png" },
    { title: "Page2HTML", type: "iframe", url: "https://docsuite.pages.dev/page2html/", icon: "https://rubisco.pages.dev/assets/favicon.png" },
];

function initTaskbar() {
    apps.forEach(app => {
        // Use default values if any app property is missing
        const title = app.title || defaultTitle;
        const url = app.url || defaultUrl;
        const icon = app.icon || defaultIcon;

        $("#taskbar").append(`
            <button onclick="openWindow('${app.type}', '${title}', '${url}')"
                title="${title}">
                <img src="${icon}" alt="${title}">
            </button>
        `);
    });

    // Adjust taskbar layout if there are too many icons
    if ($("#taskbar button").length > 10) { // If there are more than 10 apps
        $("#taskbar").css("height", "60px"); // Increase taskbar height
    }
}