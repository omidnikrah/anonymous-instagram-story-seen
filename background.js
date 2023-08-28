let isActive = false;
chrome.browserAction.setBadgeBackgroundColor({ color: isActive ? '#0097ff' : '#777' });
chrome.browserAction.setBadgeText({
	text: isActive ? 'On' : 'Off'
});

function blockRequestIfContainsReelId(details) {
	const variablesString = details.requestBody?.formData?.variables?.[0];
	if (variablesString) {
		try {
			const variables = JSON.parse(variablesString);
			if (variables.reelId !== undefined) {
				return { cancel: true };
			};
		} catch (error) {
			console.log("Error parsing variablesString");
		};
	};
};

chrome.webRequest.onBeforeRequest.addListener(
	blockRequestIfContainsReelId,
	{ urls: [ '*://*.instagram.com/api/graphql*' ] },
	[ 'blocking', 'requestBody']
);

chrome.browserAction.onClicked.addListener(() => {
	isActive = !isActive;
	chrome.browserAction.setBadgeBackgroundColor({ color: isActive ? '#0097ff' : '#777' });
	chrome.browserAction.setBadgeText({
		text: isActive ? 'On' : 'Off'
	});
});
