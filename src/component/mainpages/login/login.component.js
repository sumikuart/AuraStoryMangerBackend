import React, { Component } from 'react'
import './login.style.css'



class LoginComponent extends Component {

    state={
    
    }

    onSubmit = () => {
        this.props.history.push('/home');
    }


    render(){
        return(
            <div className="loginStyle">
                <div className="headline">
                    <p>Aura Story Mangement</p>
                </div>

                <div className="frame">
                    <p>Login:</p>

                    <form onSubmit={this.onSubmit}>
                        <div className="userinput"  >
                            <label>Username:</label>
                            <input type="text"/>
                        </div>

                        <div  className="passinput">
                            <label>Password:</label>
                            <input type="password"/>
                        </div>

                    <input type="submit" value="login"/>

                    </form>
                </div>

            </div>
        )
    }

}

export default LoginComponent