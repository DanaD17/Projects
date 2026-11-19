package cookbook.recipe;

import cookbook.user.User;
import lombok.Data;
import java.util.List;

@Data
public class RecipeDTO {

    private Long id;
    private String title;
    private List<String> images;
    private List<String> recipeSteps;
    private List<String> ingredients;
    private String originCountry;
    private String foodCategory;
    private Integer cookTimeMinutes;
    private Integer servings;
    private User postedBy;
    private Visibility visibility;
}
