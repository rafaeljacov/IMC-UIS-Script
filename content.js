function handleStart() {
    const resId1 = parseInt(prompt('Enter the starting RES ID'));
    const resId2 = parseInt(prompt('Enter the final RES ID'));
    let mode = prompt('Select status: ( confirm, temporary, cancel )');

    if (resId1 > resId2) {
        alert('ID 1 must be smaller than ID 2!');
    } else if (resId1 && resId2 && mode) {
        mode = mode.toLowerCase();

        if (['confirm', 'temporary', 'cancel'].includes(mode)) {
            startAutomate(mode);
        } else {
            alert('Warning: Invalid Mode Entered!');
        }
    } else {
        alert('Invalid Reservation Id Entry!\n\nOperation Aborted!');
    }

    async function startAutomate(mode) {
        const message = {
            status: 200,
            resId1,
            resId2,
            mode,
        };

        chrome.runtime.sendMessage(message);
    }
}

function handleEquip() {
    const resId1 = parseInt(prompt('Enter the starting RES ID'));
    const resId2 = parseInt(prompt('Enter the final RES ID'));

    if (resId1 > resId2) {
        alert('ID 1 must be smaller than ID 2!');
    } else if (resId1 && resId2) {
        const message = {
            status: 300,
            resId1,
            resId2,
        };

        chrome.runtime.sendMessage(message);
    } else {
        alert('Invalid Reservation Id Entry!\n\nOperation Aborted!');
    }
}

function handleClose() {
    chrome.runtime.sendMessage({ status: 'close' });
}

const body = document.querySelector('body');

const startButton = document.createElement('button');
startButton.setAttribute('id', 'status');
startButton.append('Change Status');

const equipButton = document.createElement('button');
equipButton.setAttribute('id', 'equip');
equipButton.append('Add Equipments');

const closeButton = document.createElement('button');
closeButton.setAttribute('id', 'close');
closeButton.append('Close Tabs');

body.appendChild(startButton);
startButton.addEventListener('click', handleStart);

body.appendChild(equipButton);
equipButton.addEventListener('click', handleEquip);

body.appendChild(closeButton);
closeButton.addEventListener('click', handleClose);
