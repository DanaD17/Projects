package cookbook.ai;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class AIRecipeRequest {

    @NotEmpty
    @Size(max = 15)
    private List<@NotBlank String> ingredients;

    @NotNull
    @Min(1)
    @Max(300)
    private Integer maxCookingTime;

    @NotNull
    @Min(1)
    @Max(20)
    private Integer servings;

    @NotBlank
    private String foodCategory;

}