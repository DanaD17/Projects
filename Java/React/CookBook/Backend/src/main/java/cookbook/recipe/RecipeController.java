package cookbook.recipe;

import cookbook.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
//@AllArgsConstructor
//@NoArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/getRecipes")
    public List<RecipeDTO> getRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<RecipeDTO> getRecipeById(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @PostMapping("/addRecipe")
    public RecipeEntity createRecipe(@RequestBody RecipeDTO recipeDTO, @AuthenticationPrincipal UserDetails userDetails) {
        return recipeService.createRecipe(recipeDTO, userDetails.getUsername());
    }

    @PatchMapping("/updateRecipe/{id}")
    public ResponseEntity<RecipeDTO> updateRecipe(
            @PathVariable Long id,
            @RequestBody RecipeDTO recipeDTO) {

        RecipeDTO updatedRecipe =
                recipeService.updateRecipe(id, recipeDTO);

        return ResponseEntity.ok(updatedRecipe);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteRecipe(@PathVariable Long id) {
         recipeService.deleteRecipeById(id);
    }
}
