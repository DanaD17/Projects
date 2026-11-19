import { useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.scss";
import { login } from "../../services/recipeService";
import { FaHome } from "react-icons/fa";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
) => {
    event.preventDefault();

    setError("");

    try {
        setLoading(true);

        const response = await login({
            email,
            password,
        });

        localStorage.setItem("authToken", response.token);

        navigate("/cookbook");
    } catch (error: unknown) {
        setError(
            error instanceof Error
                ? error.message
                : "Autentificarea a eșuat."
        );
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                

                <NavLink to={"/"} viewTransition><FaHome className="home-icon"/></NavLink>


                <h2 className="login__title">Welcome back!</h2>
                <p className="login__subtitle">
                    Sign in to your account
                </p>

                <div className="login__field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="login__field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />
                </div>

                {error && (
                    <p className="login__error" role="alert">
                        {error}
                    </p>
                )}

                <button
                    className="login__button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Login"}
                </button>

                <p className="login__register">
                    Don't have an account?{" "}
                    <a href="/register">Register</a>
                </p>
            </form>
        </div>
    );
}

export default Login;