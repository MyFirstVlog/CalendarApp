

export const startLogin = (email, password) => {
    return async () => {
        console.log(email,password,'desde action')
        let res = {};
        const response = await fetch('http://localhost:3400/api/auth', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email,
                password
            }),
        }).then(data => {
            return data.json()
        }).then(
            datares =>{
                res = {...datares}
            }
        );

        console.log(res);
    }
};