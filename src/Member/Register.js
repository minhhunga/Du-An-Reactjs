import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Register(props){
	const[input,  setInput]=useState({
		name:"",
		email:"",
		password:"",
		phone:"",
		address:"",
		avatar: "",
		level: 0
	});
	
    const [file, setFile] = useState(null);
	const [errors, setErrors]=useState({})
	const [success, setSuccess] = useState("");
	
	function handleChange(e){
		const nameInput=e.target.name;
		const value=e.target.value;
        setInput(
			state=>({...state,[nameInput]: value})
        );
	}

	function handleUserInputFile(e){
		const file=e.target.files[0];
		if (!file) return;

		if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
			setErrors({ avatar: "Avatar phải là hình ảnh (jpeg, png, gif)" });
			return;
		}

		if (file.size > 1048576) { // 1MB
			setErrors({ avatar: "Avatar phải nhỏ hơn 1MB" });
			return;
		}

		let reader=new FileReader();
		reader.onload=(e)=>{
			setInput(state => ({ ...state, avatar: e.target.result }));
			setFile(file);
			setErrors({});
		};
		reader.readAsDataURL(file);
	}

	function handleSubmit(e){
		e.preventDefault();
		let errorSubmit={};
		let flag= true;

		if(input.name == ""){
			errorSubmit.name="Vui lòng nhập tên";
			flag=false;
		}
		if(input.email == ""){
			errorSubmit.email="Vui lòng nhập email";
			flag=false;
		}
		if(input.password == ""){
			errorSubmit.password="Vui lòng nhập mật khẩu";
			flag=false;
		}
		if(input.phone == ""){
			errorSubmit.phone="Vui lòng nhập số điện thoại";
			flag=false;
		}
		if(input.address == ""){
			errorSubmit.address="Vui lòng nhập địa chỉ";
			flag=false;
		}
		if (!file) {
			errorSubmit.avatar = "Vui lòng chọn hình ảnh";
			flag = false;
		}
		if(!flag){
			setErrors(errorSubmit);
			return;
		}
		const data = {
            name: input.name,
            email: input.email,
            password: input.password,
            phone: input.phone,
            address: input.address,
            avatar: input.avatar,
            level: 0
        };
		
		axios.post("http://localhost/laravel8/public/api/register", data)
		.then((res)=>{
			console.log(res)
			setSuccess("Đăng ký thành công!");
			setErrors({});
			
		})
		.catch((error) => {
			console.error("Error:", errors);
			setSuccess("");
		});
	} 

	function renderError(){
		if(Object.keys(errors).length>0){
			return Object.keys(errors).map((key, index)=>{
				return (
					<li key={index}>{errors[key]}</li>
				)
			})
		}
	}

    return(
        <div class="col-sm-4">
					<div class="signup-form">
						<h2>New User Signup!</h2>
						{renderError()}
						{success && <div className="alert alert-success">{success}</div>}
						<form onSubmit={handleSubmit}>
							<input 
								type="text" 
								name="name"
								placeholder="Name"
								value={input.name}
								onChange={handleChange}
							/>
							<input
							 	type="email"
							  	name="email"
							   	placeholder="Email Address"
							    value={input.email} 
								onChange={handleChange}
							/>
							<input
								type="password" 
								name="password"
								placeholder="Password"
								value={input.password} 
								onChange={handleChange}
							/>
							<input
								 type="text" 
								 name="phone" 
								 placeholder="Phone" 
								 value={input.phone} 
								 onChange={handleChange}
							/>
                            <input 
								type="text" 
								name="address" 
								placeholder="Address" 
								value={input.address} 
								onChange={handleChange}
							/>
                            <input
								 type="file" 
								 name="avatar" 
								 placeholder="Avatar"  
								 onChange={handleUserInputFile}
							/>
							
							<button type="submit" class="btn btn-default">Signup</button>
						</form>
					</div>
				</div>
    );
}

export default Register;