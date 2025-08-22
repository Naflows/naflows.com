import appStorage from "../../../../../modules/main/storage-management/directory";
import cancel from "../../../../WhereCancelButtonIs";

const createNewProject__buttons = (
    setState,
    update,
    project,
    end,
    imageSrc
) => {
    return [
        {
            text: update ? "Modifier" : "Ajouter",
            onClick: () => {
                const name = document.querySelector("#project_name").value;
                if (name.length < 1) {
                    document.querySelector(".message-alert").style.display = "flex";
                    document.querySelector(".message-alert").scrollIntoView({
                        behavior: "smooth"
                    });
                } else {
                    appStorage.projectsLib.add(
                        update,
                        project,
                        end,
                        imageSrc
                    );
                    setState(false);
                }
            },
            className: "primary",
            style: {}
        },
        update ? {
            text: "Supprimer",
            className: "secondary",
            style: {},
            parameters: {
                onDoubleClick: () => {
                    appStorage.projectsLib.delete(project);
                    setState(false);
                },
            }
        } : null,
        cancel(setState, false)
    ]
}

export default createNewProject__buttons;