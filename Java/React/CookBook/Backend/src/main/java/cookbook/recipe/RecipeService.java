package cookbook.recipe;

import cookbook.user.User;
import cookbook.user.UserDTO;
import cookbook.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, UserRepository userRepository) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }

    public List<RecipeDTO> getAllRecipes() {

        return recipeRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

//    public RecipeEntity getRecipe(Long recipeId) {
//        RecipeEntity recipeEntity = recipeRepository.findById(recipeId).orElseThrow(() -> new RuntimeException("Recipe not found"));
//    }

    public RecipeDTO getRecipeById(Long id) {
        System.out.println("ID primit: " + id);
        RecipeEntity recipeEntity = recipeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Recipe not found"));

        return convertToDTO(recipeEntity);
    }

    private RecipeDTO convertToDTO(RecipeEntity recipe) {

        RecipeDTO dto = new RecipeDTO();

        dto.setId(recipe.getId());
        dto.setTitle(recipe.getTitle());
        dto.setImages(recipe.getImages());
        dto.setRecipeSteps(recipe.getRecipeSteps());
        dto.setIngredients(recipe.getIngredients());
        dto.setOriginCountry(recipe.getOriginCountry());
        dto.setFoodCategory(recipe.getFoodCategory());
        dto.setCookTimeMinutes(recipe.getCookTimeMinutes());
        dto.setServings(recipe.getServings());
        dto.setPostedBy(recipe.getPostedBy());

        return dto;
    }

    public RecipeEntity createRecipe(RecipeDTO recipeDTO, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        RecipeEntity recipe = new RecipeEntity();

        recipe.setId(recipeDTO.getId());
        recipe.setTitle(recipeDTO.getTitle());
        recipe.setImages(recipeDTO.getImages());
        recipe.setRecipeSteps(recipeDTO.getRecipeSteps());
        recipe.setIngredients(recipeDTO.getIngredients());
        recipe.setOriginCountry(recipeDTO.getOriginCountry());
        recipe.setFoodCategory(recipeDTO.getFoodCategory());
        recipe.setCookTimeMinutes(recipeDTO.getCookTimeMinutes());
        recipe.setServings(recipeDTO.getServings());
        recipe.setPostedBy(user);
        recipe.setVisibility(Visibility.PRIVATE);

        return recipeRepository.save(recipe);
    }

    public RecipeDTO updateRecipe(Long id, RecipeDTO dto) {
        RecipeEntity recipe = recipeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Recipe not found"));

        if (dto.getTitle() != null) {
            recipe.setTitle(dto.getTitle());
        }

        if (dto.getIngredients() != null) {
            recipe.setIngredients(dto.getIngredients());
        }

        if (dto.getRecipeSteps() != null) {
            recipe.setRecipeSteps(dto.getRecipeSteps());
        }

        if (dto.getOriginCountry() != null) {
            recipe.setOriginCountry(dto.getOriginCountry());
        }

        if (dto.getFoodCategory() != null) {
            recipe.setFoodCategory(dto.getFoodCategory());
        }

        if (dto.getCookTimeMinutes() != null) {
            recipe.setCookTimeMinutes(dto.getCookTimeMinutes());
        }

        if (dto.getServings() != null) {
            recipe.setServings(dto.getServings());
        }

        if (dto.getPostedBy() != null) {
            User user = userRepository.findById(
                    dto.getPostedBy().getId()
            ).orElseThrow(() ->
                    new RuntimeException("User not found"));

            recipe.setPostedBy(user);
        }

        if(dto.getVisibility() != null) {
            recipe.setVisibility(dto.getVisibility());
        }

        RecipeEntity updatedRecipe = recipeRepository.save(recipe);

        return convertToDTO(updatedRecipe);
    }

    public void deleteRecipeById(Long id) {
        RecipeEntity recipeEntity = recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe not found"));
        recipeRepository.delete(recipeEntity);
    }

}
