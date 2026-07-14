document.addEventListener("DOMContentLoaded", function () {
    const button = document.createElement("button");

    button.id = "sidebar-toggle";
    button.type = "button";
    button.textContent = "‹";
    button.setAttribute("aria-label", "Collapse sidebar");
    button.setAttribute("title", "Collapse sidebar");

    document.body.appendChild(button);

    const collapsed =
        localStorage.getItem("sidebar-collapsed") === "true";

    if (collapsed) {
        document.body.classList.add("sidebar-collapsed");
        button.textContent = "›";
        button.setAttribute("aria-label", "Expand sidebar");
        button.setAttribute("title", "Expand sidebar");
    }

    button.addEventListener("click", function () {
        const isCollapsed =
            document.body.classList.toggle("sidebar-collapsed");

        localStorage.setItem(
            "sidebar-collapsed",
            String(isCollapsed)
        );

        button.textContent = isCollapsed ? "›" : "‹";
        button.setAttribute(
            "aria-label",
            isCollapsed ? "Expand sidebar" : "Collapse sidebar"
        );
        button.setAttribute(
            "title",
            isCollapsed ? "Expand sidebar" : "Collapse sidebar"
        );
    });
});