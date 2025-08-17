document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const surpriseBtn = document.getElementById("surpriseBtn");
    const ingredientInput = document.getElementById("ingredient");
    const cardContainer = document.getElementById("cardContainer");

    // Fungsi fetch resep berdasarkan ingredient
    async function fetchRecipes(ingredient) {
        cardContainer.innerHTML = "<p>Loading recipes...</p>";
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            const data = await res.json();

            if (data.meals) {
                displayRecipes(data.meals);
            } else {
                cardContainer.innerHTML = "<p>No recipes found.</p>";
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
            cardContainer.innerHTML = "<p>Error fetching recipes. Please try again.</p>";
        }
    }

    // Fungsi fetch random recipe
    async function fetchRandomRecipe() {
        cardContainer.innerHTML = "<p>Loading a surprise recipe...</p>";
        try {
            const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            const data = await res.json();

            if (data.meals) {
                displayRecipes(data.meals);
            } else {
                cardContainer.innerHTML = "<p>No recipes found.</p>";
            }
        } catch (error) {
            console.error("Error fetching random recipe:", error);
            cardContainer.innerHTML = "<p>Error fetching recipe. Please try again.</p>";
        }
    }

    // Fungsi tampilkan hasil ke card
    function displayRecipes(meals) {
        cardContainer.innerHTML = "";
        meals.forEach(meal => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <a href="https://www.themealdb.com/meal/${meal.idMeal}" 
                   target="_blank" 
                   class="details-btn">View Details</a>
            `;

            cardContainer.appendChild(card);
        });

        // Animasi fade-in
        const cards = document.querySelectorAll(".card");
        cards.forEach((card, index) => {
            card.style.opacity = "0";
            setTimeout(() => {
                card.style.transition = "opacity 0.5s ease-in";
                card.style.opacity = "1";
            }, index * 150);
        });
    }

    // Event listeners
    searchBtn.addEventListener("click", () => {
        const ingredient = ingredientInput.value.trim();
        if (ingredient) {
            fetchRecipes(ingredient);
        } else {
            alert("Please enter an ingredient!");
        }
    });

    surpriseBtn.addEventListener("click", fetchRandomRecipe);
});
