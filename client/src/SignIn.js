import { useState } from "react";

const SignIn = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitClicked = async (e) => {
        e.preventDefault();

        props.setUsername(username);
        props.setPassword(password);

        try {
            // 1) Check if user exists
            const res = await fetch(`/api/get-current-id/${username}`);
            const data = await res.json();

            if (data && data._id) {
                console.log("found:", data);
            } else {
                // 2) Create new user
                const response = await fetch("/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                });

                if (response.ok) {
                    props.setSuccessMessage("Signed in successfully!");
                    props.setSignedIn(true);
                } else {
                    props.setSuccessMessage("Error signing in!");
                }
            }
        } catch (err) {
            console.error(err);
            props.setSuccessMessage("Server error");
        }
    };


    return (
        <div class="signin">
            <h3>Sign in Or Log In!</h3>
            <form  onSubmit={submitClicked} method="post">
                <fieldset>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <br /><br></br>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <br /><br></br>
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
        </div>
    );
};

export default SignIn;
