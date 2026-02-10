
import { useEffect, useState } from 'react';
import SignIn from './SignIn';
import HandlePosts from './HandlePosts.js'
import HandleUser from './HandleUser.js';

const App = props => {
    const [signedIn,setSignedIn] = useState(false);
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [successMessage, setSuccessMessage] = useState("");
    const [post,setPost]=useState();
    const [userID,setUserID] = useState();    

    if(signedIn){
        return (<div>
            <header>
                <h2>Welcome {username}!</h2>
                <h3>{successMessage}</h3>
            </header>
            <main>
                <HandleUser userID={userID} setUserID={setUserID} username={username}/>
                <HandlePosts userID={userID} setUserID={setUserID} username={username} />
              
            </main>
            <footer>
    
            </footer>
                    
        </div>)
    }
    return (<div>
        <header>
            <h2>Welcome to My Website!</h2>
        </header>
        <main>
            <SignIn setSignedIn={setSignedIn} setUsername={setUsername} setPassword={setPassword} successMessage={successMessage} setSuccessMessage={setSuccessMessage}  />
           
        </main>
        <footer>

        </footer>
                
    </div>)
}

export default App;