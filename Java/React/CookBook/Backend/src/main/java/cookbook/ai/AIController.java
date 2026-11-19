package cookbook.ai;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
public class AIController {

    private final AIRecipeService aiRecipeService;

    public AIController(AIRecipeService aiRecipeService) {
        this.aiRecipeService = aiRecipeService;
    }

    @PostMapping("/generate-recipe")
    public ResponseEntity<GeneratedRecipeDTO> generateRecipe(
            @Valid @RequestBody AIRecipeRequest request) {

        GeneratedRecipeDTO recipe =
                aiRecipeService.generateRecipe(request);

        return ResponseEntity.ok(recipe);
    }
}