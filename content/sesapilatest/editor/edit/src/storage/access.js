const SesAPIStorage = 'SesAPIStorage'; // Exclusive localstorage value


export const storage = {
    access : function(type = SesAPIStorage) {
        return JSON.parse(localStorage.getItem(type));
    },
    set : function(value = {}, to = SesAPIStorage) {
        localStorage.setItem(
            to, JSON.stringify(value)
        )
    }
}

if (!storage.access()) storage.set({});

if (!storage.access("SesAPIParameters")) storage.set({
    preferedDisplay : "grid"
}, "SesAPIParameters" );