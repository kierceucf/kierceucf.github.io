function showFilter() {
        document.getElementById("filterContent").style.display = "block";
        document.getElementById("newContent").style.display = "none";
    }

    function showAddNew() {
        document.getElementById("newContent").style.display = "flex";
        document.getElementById("filterContent").style.display = "none";
    }

    function filterArticles() {
        const opinionChecked = document.getElementById("opinionCheckbox").checked;
        const recipeChecked = document.getElementById("recipeCheckbox").checked;
        const updateChecked = document.getElementById("updateCheckbox").checked;

        const articles = document.querySelectorAll("#articleList article");

        articles.forEach(article => {
            if (article.classList.contains("opinion")) {
                article.style.display = opinionChecked ? "block" : "none";
            }
            if (article.classList.contains("recipe")) {
                article.style.display = recipeChecked ? "block" : "none";
            }
            if (article.classList.contains("update")) {
                article.style.display = updateChecked ? "block" : "none";
            }
        });
    }

    function addNewArticle() {
        const title = document.getElementById("inputHeader").value;
        const text = document.getElementById("inputArticle").value;

        const opinionRadio = document.getElementById("opinionRadio");
        const recipeRadio = document.getElementById("recipeRadio");
        const lifeRadio = document.getElementById("lifeRadio");

        let type = "";
        if (opinionRadio.checked) type = "opinion";
        else if (recipeRadio.checked) type = "recipe";
        else if (lifeRadio.checked) type = "update";

        if (title === "" || text === "" || type === "") {
            alert("Please complete all fields.");
            return;
        }

        const newArticle = document.createElement("article");
        newArticle.classList.add(type);

        const marker = document.createElement("span");
        marker.classList.add("marker");
        marker.textContent = type.charAt(0).toUpperCase() + type.slice(1);

        const header = document.createElement("h2");
        header.textContent = title;

        const paragraph = document.createElement("p");
        paragraph.textContent = text;

        newArticle.appendChild(marker);
        newArticle.appendChild(header);
        newArticle.appendChild(paragraph);

        document.getElementById("articleList").appendChild(newArticle);

        // Reset form
        document.getElementById("inputHeader").value = "";
        document.getElementById("inputArticle").value = "";
        opinionRadio.checked = false;
        recipeRadio.checked = false;
        lifeRadio.checked = false;
    }
