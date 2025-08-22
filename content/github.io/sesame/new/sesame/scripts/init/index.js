import {
    InitMenuClicks
} from '/content/github.io/sesame/scripts/menu/index.js';

import {
    Search
} from '/content/github.io/sesame/scripts/search/index.js';

import {
    ScrollSearchBar
} from '/content/github.io/sesame/scripts/utils/UI.js';

import { 
    OpenLogIn
} from '/content/github.io/sesame/service/admin/log/logBox.js';

import { GenerateNewEvent } from "/content/github.io/sesame/scripts/events/new.js";


const Init = {
    log: async function() {
        await OpenLogIn();
    },
    searchBar: function() {
        ScrollSearchBar();
        document.addEventListener('keydown', async function(event) {
            const searchInput = document.querySelector('#search-input');
            if (event.key.toLowerCase() === 'enter' && searchInput === document.activeElement) {
                await Search();
            }
        });
    },
};

document.addEventListener('DOMContentLoaded', async function() {
    await Init.log();
    setTimeout(async () => {
        await GenerateNewEvent();
        Init.searchBar();
        InitMenuClicks();
    }, 0); 
    

});
