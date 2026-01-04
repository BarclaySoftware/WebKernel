// Copyright (c) 2024-2025 Aurorasoft. All Rights Reserved.

let windowCount = 0;
const defaultIcon = "https://via.placeholder.com/30";
const defaultUrl = "https://example.com";
const defaultTitle = "Untitled App";

// Here's where all of the apps go...
const apps = [
    // { title: "", type: "iframe", url: "", icon: "" },
    { title: "INFOST", type: "iframe", url: "", icon: "https://webkernel.pages.dev/sys6/branding/images/favicon.svg" },
    { title: "Caesium Browser", type: "iframe", url: "https://caesiumwebview.pages.dev/", icon: "https://caesiumwebview.pages.dev/assets/icon.svg" },
    { title: "SearchWise", type: "iframe", url: "https://searchwise.pages.dev/s", icon: "https://searchwise.pages.dev/images/branding/searchlogo/ico/favicon.ico" },
    { title: "WTG Media Player", type: "iframe", url: "https://wtgplayer.pages.dev/", icon: "https://wtgplayer.pages.dev/assets/icons/logo.svg" },
    { title: "PagePerfect", type: "iframe", url: "https://pageperfect.pages.dev/", icon: "https://pageperfect.pages.dev/favicon.svg" },
    { title: "Canvox", type: "iframe", url: "https://canvox.pages.dev/", icon: "https://canvox.pages.dev/img/favicon.png" },
    { title: "WebHTML", type: "iframe", url: "https://webhtml.pages.dev/", icon: "https://webhtml.pages.dev/assets/images/icon.svg" },
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