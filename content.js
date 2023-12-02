console.log('working')

function checkVideo(video) {
    if (video.duration < 60) {
        video.style.display = 'none'; // Hides videos shorter than 60 seconds
    }
}
function removeVideos() {
    document.querySelectorAll('video').forEach(video => {
        checkVideo(video);
    })
}
function isVideoElement(node) {
    if (node instanceof HTMLElement) {
        // console.log('node is html element');
        console.log(node.tagName);
    }
    return node instanceof HTMLElement && node.tagName === 'VIDEO';
}

// Callback function to execute when mutations are observed
function observerCallback(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            if (mutation.addedNodes.length === 0) {
                return;
            }
            removeVideos();
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(observerCallback);

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Start observing the target node for configured mutations
observer.observe(document.body, config);

// Later, you can stop observing
// observer.disconnect();
