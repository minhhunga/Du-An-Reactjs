import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';

function Account() {
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [file, setFile] = useState(null);
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: ""
    });

    useEffect(() => {
        let userData = localStorage.getItem("userData");
        if (userData) {
            userData = JSON.parse(userData);
            setUser({
                id: userData.id,
                name: userData.name,
                email: userData.email,
                password: userData.password,
                phone: userData.phone,
                address: userData.address,
                avatar: userData.avatar
            });
        }
        console.log(userData)
    }, []);

    function handleChange(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        setUser(state => ({ ...state, [nameInput]: value }));
    }

    function handleUserInputFile(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
            setErrors({ avatar: "Avatar phải là hình ảnh (jpeg, png, gif)" });
            return;
        }

        if (file.size > 1048576) { // 1MB
            setErrors({ avatar: "Avatar phải nhỏ hơn 1MB" });
            return;
        }

        let reader = new FileReader();
        reader.onload = (e) => {
            setUser(state => ({ ...state, avatar: e.target.result }));
            setFile(file);
            setErrors({});
        };
        reader.readAsDataURL(file);
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errorSubmit = {};
        let flag = true;

        if (!file) {
            errorSubmit.avatar = "Vui lòng chọn hình ảnh";
            flag = false;
        }

        if (!flag) {
            setErrors(errorSubmit);
            return;
        }

		const data = new FormData();
        data.append('id', user.id);
        data.append('name', user.name);
        data.append('email', user.email);
        data.append('password', user.password);
        data.append('phone', user.phone);
        data.append('address', user.address);
        data.append('avatar', file);
		const accessToken = localStorage.getItem('accessToken');
		const userData = JSON.parse(localStorage.getItem('userData'));
		
		let config = {
		headers: {
			'Authorization': 'Bearer ' + accessToken,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json'
		}
		};

        axios.post(`http://localhost/laravel8/public/api/user/update/${user.id}`, data, config)
            .then((res) => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    console.log(res);
                    localStorage.setItem('accessToken', res.data.token);
                    localStorage.setItem('userData', JSON.stringify(res.data.Auth));
                    setSuccess("Update thành công!");
                    setErrors({});
                }
            })
            .catch((error) => {
                console.error("Lỗi:", error);
                setSuccess("");
            });
    }

    function renderError() {
        if (Object.keys(errors).length > 0) {
            return Object.keys(errors).map((key, index) => {
                return (
                    <li key={index}>{errors[key]}</li>
                )
            })
        }
    }

    return (
        <div className="account-container">
            

            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">Update user</h2>
                    <div className="signup-form">
                        <h2>New User Signup!</h2>
                        {renderError()}
                        {success && <div className="alert alert-success">{success}</div>}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={user.name}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={user.email}
                                readOnly
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={user.password}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={user.phone}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={user.address}
                                onChange={handleChange}
                            />
                            <input
                                type="file"
                                name="avatar"
                                placeholder="Avatar"
                                onChange={handleUserInputFile}
                            />
                            <button type="submit" className="btn btn-default">Signup</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
