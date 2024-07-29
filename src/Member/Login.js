import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
        level: 0
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;

        if (input.email == "") {
            errorSubmit.email = "Vui lòng nhập email";
            flag = false;
        }
        if (input.password == "") {
            errorSubmit.password = "Vui lòng nhập mật khẩu";
            flag = false;
        }

        if (!flag) {
            setErrors(errorSubmit);
            return;
        }

        const data = {
            email: input.email,
            password: input.password,
            level: 0
        };

        axios.post("http://localhost/laravel8/public/api/login", data)
            .then((res) => {
                if(res.data.errors){
					setErrors(res.data.errors);
					
				}else{
					console.log(res)
                    localStorage.setItem('checkLogin', 'true');
                    localStorage.setItem('accessToken', res.data.token);
                    localStorage.setItem('userData', JSON.stringify(res.data.Auth));
					navigate('/');
				}
            })
            .catch((errors) => {
                console.error("Error:", errors);
            });
    };
	function renderError(){
		if(Object.keys(errors).length>0){
			return Object.keys(errors).map((key, index)=>{
				return (
					<li key={index}>{errors[key]}</li>
				)
			})
		}
	}

    return (
        <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
                <h2>Login to your account</h2>
				{renderError()}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        value={input.email}
                        onChange={handleInputChange}
                    />
                    
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={input.password}
                        onChange={handleInputChange}
                    />
                    
                    
                    <span>
                        <input type="checkbox" className="checkbox" />
                        Keep me signed in
                    </span>
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
                
            </div>
        </div>
    );
}

export default Login;
