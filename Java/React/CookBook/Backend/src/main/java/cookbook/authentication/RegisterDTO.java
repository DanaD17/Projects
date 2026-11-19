package cookbook.authentication;

import lombok.Data;

@Data
public class RegisterDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
