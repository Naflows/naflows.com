import localstorage_name from "../../../../main";
import addProject from "../projects/add-project";
import deleteProject from "../projects/delete-project";
import findProject from "../projects/find-project";

const appStorage = {
    get : function() {
        return JSON.parse(localStorage.getItem(localstorage_name));
    },

    setTheme : function(theme) {
        const data = JSON.parse(localStorage.getItem(localstorage_name));
        data.theme = theme;
        localStorage.setItem(localstorage_name, JSON.stringify(data));
    },

    connection : {
        firstConnectionCheck : function(
            firstConnection,
            setFirstConnection
        ) {
            const storage = JSON.parse(localStorage.getItem(localstorage_name));
            if (firstConnection == true) {
              localStorage.setItem(localstorage_name, JSON.stringify({firstConnection: false, projects: storage.projects || []}));
            }
            setFirstConnection(false);
        }
    },

    projectsLib : {
        get : function() {
            return JSON.parse(localStorage.getItem(localstorage_name)).projects || [];
        },
        find : function(id) {
            return findProject(id);
        },
        add : function(
            update = false,
            project = null,
            end = false,
            imageSrc = "https://via.placeholder.com/150"
        ) {
            addProject(update,project,end,imageSrc,localstorage_name)
        },
        delete : function(
            project
        ) {
            deleteProject(
                project,
                localstorage_name
            )
        }
    }
};

export default appStorage;