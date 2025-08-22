function findParentWithClass(element, className) {
    var parent = element.parentNode;

    while (parent) {
        if (parent.classList && parent.classList.contains(className)) {
            return parent;
        }
        parent = parent.parentNode;
    }

    return null; // Return null if no parent with the specified class is found
}

export default findParentWithClass;