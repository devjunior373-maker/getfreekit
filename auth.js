// 🔑 SUPABASE CONFIG
const SUPABASE_URL = "https://qxvnhqaefkvsnmkfhdnu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KuRh8rUfnMUw9qGDm1K72Q_NFPnPbbE";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ELEMENTOS
const form = document.getElementById("loginForm");
const btn = document.getElementById("loginBtn");
const btnText = btn.querySelector(".btn-text");

// LOGIN / REGISTRO AUTOMÁTICO
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  
  btn.classList.add("loading");
  btnText.textContent = "Aguarde...";
  
  // 1️⃣ TENTAR LOGIN
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  // ✅ LOGIN OK
  if (!loginError) {
    window.location.href = "home.html";
    return;
  }
  
  // 2️⃣ SE USUÁRIO NÃO EXISTE → REGISTRO
  if (loginError.message.includes("Invalid login credentials")) {
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (signupError) {
      showError("Erro ao criar conta");
      resetButton();
      return;
    }
    
    // ✅ REGISTRO OK
    window.location.href = "home.html";
    return;
  }
  
  // 3️⃣ OUTROS ERROS
  showError("Senha incorreta ou erro de autenticação");
  resetButton();
});

// HELPERS
function resetButton() {
  btn.classList.remove("loading");
  btnText.textContent = "Entrar";
}

function showError(msg) {
  alert(msg); // depois trocamos por UI bonita
}