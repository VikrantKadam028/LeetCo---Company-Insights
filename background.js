// Background service worker for Chrome Extension
// Handles installation and updates

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      console.log('LeetCo installed!');
      
      // Open welcome page (optional)
      // chrome.tabs.create({ url: 'https://leetcode.com/problems/two-sum/' });
    } else if (details.reason === 'update') {
      console.log('LeetCo updated!');
    }
  });
  
  // Listen for messages from content script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getAPIStatus') {
      // Could implement API health check here
      sendResponse({ status: 'ok' });
    }
    return true;
  });
