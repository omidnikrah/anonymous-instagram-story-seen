let isActive = false;
chrome.browserAction.setBadgeBackgroundColor({ color: isActive ? '#0097ff' : '#777' });
chrome.browserAction.setBadgeText({
	text: isActive ? 'On' : 'Off'
});

chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
		const {requestBody : { formData }  } = details ;

		const variables = JSON.parse(formData.variables[0])
		const statusBlocking = `${formData.fb_api_req_friendly_name}`.includes('Seen') && `${formData.fb_api_req_friendly_name}`.includes('Polaris') && `${formData.fb_api_req_friendly_name}`.includes('Mutation') && 'viewSeenAt' in variables ;

		return { cancel: (isActive && statusBlocking) }
	},
	{ urls: [ '*://*.instagram.com/api/v1/stories/reel/seen*', '*://*.instagram.com/api/graphql*', '*://*.instagram.com/graphql/query*' ] },
	[ 'blocking', 'requestBody']
);

chrome.browserAction.onClicked.addListener(() => {
	isActive = !isActive;
	chrome.browserAction.setBadgeBackgroundColor({ color: isActive ? '#0097ff' : '#777' });
	chrome.browserAction.setBadgeText({
		text: isActive ? 'On' : 'Off'
	});
});
