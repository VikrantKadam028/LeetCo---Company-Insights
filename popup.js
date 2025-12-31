/**
 * popup.js
 * Handles popup state & communication with content script
 */

document.addEventListener("DOMContentLoaded", () => {
    const statusEl = document.getElementById("status");
  
    // Utility to update popup status
    function setStatus(message, type = "warning") {
      statusEl.textContent = message;
      statusEl.className = `status ${type}`;
    }
  
    // Get active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || !tabs.length) {
        setStatus("Unable to access current tab.", "error");
        return;
      }
  
      const tab = tabs[0];
      const url = tab.url || "";
  
      // Check if user is on a LeetCode problem page
      const isLeetCodeProblem =
        url.startsWith("https://leetcode.com/problems/");
  
      if (!isLeetCodeProblem) {
        setStatus("Open a LeetCode problem to view company tags.", "warning");
        return;
      }
  
      // Try communicating with content script
      chrome.tabs.sendMessage(
        tab.id,
        { type: "PING_EXTENSION" },
        (response) => {
          if (chrome.runtime.lastError) {
            setStatus("Content script not active on this page.", "error");
            return;
          }
  
          if (response && response.status === "READY") {
            setStatus("Company insights loaded on page ✓", "success");
          } else {
            setStatus("Loading company insights…", "warning");
          }
        }
      );
    });
  });
  