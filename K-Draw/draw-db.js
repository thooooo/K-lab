import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://uwgcchivhnirzjamygqv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Z2NjaGl2aG5pcnpqYW15Z3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0MjAyOTUsImV4cCI6MjAyMzk5NjI5NX0.Mte3RWleAt6UEADkwkOFJznwRZfsymx0Xbg748BZnZc"
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener("DOMContentLoaded", function () {
    // SignUp
    const formSignUp = document.querySelector(".signup");

    formSignUp.addEventListener("submit", async function (event) {
        event.preventDefault();

        const usernameSignUp = document.getElementById("username-signup").value;
        const passwordSignup = document.getElementById("password-signup").value; 
        const emailSignUp = document.getElementById("email-signup").value; 

        const hashedPasswordSignUp = CryptoJS.SHA256(passwordSignup).toString(CryptoJS.enc.Hex);

        const { error } = await supabase
            .from('users')
            .insert({ username: usernameSignUp, password: hashedPasswordSignUp, email: emailSignUp, pp: '', lastcon: new Date().toISOString().slice(0, 10)});

        if (error) {
            console.error("Couldn't insert in database");
        }
    });

    // Login
    const formLogin = document.querySelector(".login");

    formLogin.addEventListener("submit", async function (event) {
        event.preventDefault();

        const usernameLogin = document.getElementById("username-login").value;
        const passwordLogin= document.getElementById("password-login").value;

        const hashedPasswordLogin = CryptoJS.SHA256(passwordLogin).toString(CryptoJS.enc.Hex);

        const { data, error } = await supabase
            .from('users')
            .select('username,password');

        console.log(data);

        const isValidCredentials = data.some(user => user.username === usernameLogin && user.password === hashedPasswordLogin);

        if (isValidCredentials) {
            window.location.href = "./App/draw-app.html";
        } else {
            console.error("Invalid credentials");
        }
    });
});