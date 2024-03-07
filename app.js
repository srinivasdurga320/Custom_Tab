document.addEventListener("DOMContentLoaded", function() {
    const tabsContainer = document.getElementById('tabs');
    const contentFrame = document.getElementById('content-frame');
    const addTabButton = document.getElementById('add-tab-btn');
    const inputField = document.getElementById('url-input');

    let tabCount = 0;
    let activeTab = null;
    const tabs = {}; // Object to store tab URLs

    // Function to create a tab
    function createTab(url = '') {
        const tabId = `tab-${tabCount}`;
        const tab = document.createElement('li');
        tab.setAttribute('id', tabId);
        tab.classList.add('tab');
        tab.textContent = `New Tab`;

        const closeButton = document.createElement('span');
        closeButton.classList.add('tab-close');
        closeButton.textContent = 'X';
        closeButton.addEventListener('click', () => closeTab(tabId));

        tab.appendChild(closeButton);
        tab.addEventListener('click', () => switchTab(tabId));

        tabsContainer.appendChild(tab);
        tabCount++;
        
        // Store the URL for the tab
        tabs[tabId] = url;

        // Switch to the new tab
        switchTab(tabId);
    }

    // Function to close a tab
    function closeTab(tabId) {
        const tab = document.getElementById(tabId);
        tab.remove();
        delete tabs[tabId];
        
        // If the closed tab was the active tab, clear content frame
        if (activeTab === tabId) {
            activeTab = null;
            inputField.value = '';
            contentFrame.src = '';
        }
    }

    // Function to switch to a tab
    function switchTab(tabId) {
        if (activeTab) {
            document.getElementById(activeTab).classList.remove('active');
        }
        const tab = document.getElementById(tabId);
        tab.classList.add('active');
        activeTab = tabId;
        const url = tabs[tabId] || ''; // Get URL of the tab or set to empty string if no URL exists
        inputField.value = url;
        contentFrame.src = url; // Set iframe source to the URL of the active tab
    }

    // Event listener for the + button
    addTabButton.addEventListener('click', () => {
        createTab('');
    });

    // Event listener for input field change
    inputField.addEventListener('change', function() {
        const url = inputField.value.trim();
        if (activeTab && tabs[activeTab] !== url) {
            tabs[activeTab] = url;
            contentFrame.src = url;
        }
    });

    // Create a default tab with an empty URL when the page loads
    createTab();
});
