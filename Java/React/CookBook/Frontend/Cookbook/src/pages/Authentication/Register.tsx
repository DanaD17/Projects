import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import "./Register.scss";
import { signUp } from "../../services/recipeService";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Parolele nu coincid.");
            return;
        }

        try {
            setLoading(true);
            
            await signUp({
                email,
                firstName,
                lastName,
                password
            });

        } catch {
            setError("Înregistrarea a eșuat. Încearcă din nou.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register">
            <form className="register__form" onSubmit={handleSubmit}>
                <h2 className="register__title">Create an account</h2>

                <p className="register__subtitle">
                    Join our cookbook community!
                </p>

                <div className="register__row">
                    <div className="register__field">
                        <label htmlFor="firstName">First name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                            placeholder="First name"
                            autoComplete="given-name"
                            required
                        />
                    </div>

                    <div className="register__field">
                        <label htmlFor="lastName">Last name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                            placeholder="Last name"
                            autoComplete="family-name"
                            required
                        />
                    </div>
                </div>

                <div className="register__field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="register__field">
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                    />
                </div>

                <div className="register__field">
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder="Enter your address"
                        autoComplete="street-address"
                    />
                </div>

                <div className="register__field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Create a password"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                </div>

                <div className="register__field">
                    <label htmlFor="confirmPassword">
                        Confirm password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                </div>

                {error && (
                    <p className="register__error" role="alert">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="register__success" role="status">
                        {success}
                    </p>
                )}

                <button
                    className="register__button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Register"}
                </button>

                <p className="register__login">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;