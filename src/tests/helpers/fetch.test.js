import { fetchConToken, fetchSinToken } from "../../helpers/fetch"

describe.only('Pruebas en el helper fetch', () => {
    let token = '';

    test('fetch sin token debe funcionar', async() => {
        const res = await fetchSinToken('auth', {
            email: 'milena@cidenet.com',
            password: '123456'
        }, 'POST');

        expect(res instanceof Response).toBe(true);

        const body = await res.json();

        expect(body.ok).toBe(true);

        token = body.token;
    });

    test('fetch con token debe funcionar', async() => {
        localStorage.setItem('token', token);

        const res = await fetchConToken('events/61dce6cd1848085fa0a2a532', {}, 'DELETE' );
        const body = await res.json();

        expect(body.msg).toBe('Evento no existe')
    });
    
})
