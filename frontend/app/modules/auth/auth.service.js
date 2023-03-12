angular.module("myApp")
    .factory("authService", (apiService) =>{
        return {
            addUser: async function(fname, lname, email, password, password2){
                if(password !== password2){
                    return new Error("Both passwords must be the same")
                }
                const {data : users} = await apiService.get(`users`)
                if(users.map(user => user.email).includes(email)){
                    return new Error("This email address is already taken");
                }
                return apiService.post("users", {
                    id: Math.floor(Math.random()*99999),
                    name: fname,
                    lastName: lname,
                    email: email,
                    password: password,
                    role: "player"
                })           
            },
            authUser : async function (email, password){
                const {data: users} = await apiService.get("users")
                const user = users.find(user => user.email === email && user.password === password)
                if (user)
                    return user
                else
                    return new Error("Wrong email or password. Try again")
                
            } 
        }
    })