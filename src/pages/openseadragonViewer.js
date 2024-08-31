import OpenSeadragon from 'openseadragon';

export function initializeViewer(elementId) {
    const viewer = OpenSeadragon({
        id: elementId,
        prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
        tileSources: {
            Image: {
                xmlns: "http://schemas.microsoft.com/deepzoom/2008",
                Url: "https://www.xfkenzify.com:8965/files/railoutput_files/",
                Format: "jpg",
                Overlap: "1",
                TileSize: "256",
                Size: {
                    Width: 10266,
                    Height: 7438
                }
            },
            maxLevel: 5  // 从0开始，因此5表示6个层级
        }
    });

    return viewer;
}
