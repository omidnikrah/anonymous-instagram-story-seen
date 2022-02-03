let isActive = false;
chrome.browserAction.setBadgeBackgroundColor({ color: isActive ? '#0097ff' : '#777' });
chrome.browserAction.setBadgeText({
	text: isActive ? 'On' : 'Off'
});
chrome.webRequest.onBeforeRequest.addListener(
	() => ({
		cancel: isActive
	}),
	{ urls: [ '*://*.instagram.com/api/v1/stories/reel/seen*' ] },
	[ 'blocking' ]
);

chrome.browserAction.onClicked.addListener(() => {
	isActive = !isActive;
	chrome.browserAction.setBadgeBackgroundColor({ color: isActive ? '#0097ff' : '#777' });
	chrome.browserAction.setBadgeText({
		text: isActive ? 'On' : 'Off'
	});
});
