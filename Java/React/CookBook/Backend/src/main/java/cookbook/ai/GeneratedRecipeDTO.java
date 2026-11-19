package cookbook.ai;

import lombok.Data;

import java.util.List;

@Data
public class GeneratedRecipeDTO {

    private String title;

    private List<String> ingredients;

    private List<String> recipeSteps;

    private String originCountry;

    private String foodCategory;

    private Integer cookTimeMinutes;

    private Integer servings;

    // Getters and setters
}