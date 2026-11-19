package cookbook.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AIRecipeService {

    private final ChatClient chatClient;

    public AIRecipeService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public GeneratedRecipeDTO generateRecipe(
            AIRecipeRequest request) {

        String prompt = """
            Generate a cooking recipe using the following
            ingredients: %s.

            Maximum cooking time: %d minutes.
            Number of servings: %d.
            Food category: %s.

            Requirements:
            - Use the provided ingredients as the main ingredients.
            - You may add common complementary ingredients.
            - Respect the maximum cooking time.
            - Provide clear, detailed cooking instructions.
            - Return realistic ingredient quantities.
            - Return the recipe in the requested structure.
            """.formatted(
                String.join(", ", request.getIngredients()),
                request.getMaxCookingTime(),
                request.getServings(),
                request.getFoodCategory()
        );

        return chatClient.prompt()
                .system("""
                    You are an experienced professional chef.
                    Generate practical, realistic recipes.
                    Do not generate recipes unrelated to
                    the user's requested ingredients.
                    """)
                .user(prompt)
                .call()
                .entity(
                        GeneratedRecipeDTO.class,
                        spec -> spec
                                .useProviderStructuredOutput()
                                .validateSchema()
                );
    }
}
