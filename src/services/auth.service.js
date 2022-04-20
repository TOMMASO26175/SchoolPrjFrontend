import apiPath from "../Config"

export default class AuthService {
    login(email, password) {
        var formBody = JSON.stringify({
            'email': email,
            'password': password
        });
        fetch(apiPath + "/api/user/login", {
            method: "POST",
            body: formBody,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return await response.json();
        }).then((obj) =>
            console.log(obj)
        )
    }
}