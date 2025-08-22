const findProjects = (
    localstorage_name,
    setSearchProjects
) => {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    if (searchValue.length >= 2) {
      const projects = JSON.parse(localStorage.getItem(localstorage_name)).projects || [];
      const results = projects.filter((p) => p.name.toLowerCase().includes(searchValue));
      setSearchProjects(results);
    } else {
      setSearchProjects([]);
    }
}

export default findProjects;