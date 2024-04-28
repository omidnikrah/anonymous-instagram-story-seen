let isActive = false;
chrome.browserAction.setBadgeBackgroundColor({ color: isActive ? '#0097ff' : '#777' });
chrome.browserAction.setBadgeText({
	text: isActive ? 'On' : 'Off'
});

chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
		const {requestBody : { formData }  } = details ;
		const statusBlocking = formData.fb_api_req_friendly_name == 'PolarisAPIReelSeenMutation' || formData.fb_api_req_friendly_name == 'usePolarisStoriesV3SeenMutation'  ? true : false ;

		return { cancel: (isActive && statusBlocking) }
	},
	{ urls: [ '*://*.instagram.com/api/v1/stories/reel/seen*', '*://*.instagram.com/api/graphql*', '*://*.instagram.com/graphql/query' ] },
	[ 'blocking', 'requestBody']
);

chrome.browserAction.onClicked.addListener(() => {
	isActive = !isActive;
	chrome.browserAction.setBadgeBackgroundColor({ color: isActive ? '#0097ff' : '#777' });
	chrome.browserAction.setBadgeText({
		text: isActive ? 'On' : 'Off'
	});
});
