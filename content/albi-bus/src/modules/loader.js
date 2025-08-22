const loader = {
    enable : function() {
        const loader = document.querySelector('.loader-content');
        if (loader) {
            loader.classList.add("enable");
        }
    },
    disable : function() {
        const loader = document.querySelector('.loader-content');
        if (loader) {
            loader.classList.remove("enable");
        }
    }
}

export default loader;