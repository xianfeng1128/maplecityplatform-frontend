import OpenSeadragon from 'openseadragon';

export function initializeViewer(elementId) {
    const viewer = OpenSeadragon({
        id: elementId,
        prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
        tileSources: "https://www.xfkenzify.com:8965/files/railoutput.dzi",
        showNavigator: true,
        toolbar: "toolbarDiv",
        zoomInButton: "zoom-in",
        zoomOutButton: "zoom-out",
        homeButton: "home",
        fullPageButton: "full-page",
    });

    return viewer;
}
