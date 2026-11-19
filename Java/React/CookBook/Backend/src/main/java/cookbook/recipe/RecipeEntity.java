package cookbook.recipe;

import cookbook.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class RecipeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
//    @Column(nullable = false)
//    private String description;
    @ElementCollection
    private List<String> images;
    @ElementCollection
    private List<String> recipeSteps;
    @ElementCollection
    private List<String> ingredients;
    @Column(nullable = false)
    private String originCountry;
    @Column(nullable = false)
    private String foodCategory;
//    @Column(nullable = false)
//    private Integer prepTimeMinutes;
    @Column(nullable = false)
    private Integer cookTimeMinutes;
    @Column(nullable = false)
    private Integer servings;

//    @Column(nullable = false)
//    @Enumerated(EnumType.STRING)
//    private DifficultyLevel difficulty;

    @ManyToOne
    @JoinColumn(name = "postedBy_id", nullable = false)
    private User postedBy;

    @Column(nullable = true)
    @Enumerated(EnumType.STRING)
    private Visibility visibility;
}
