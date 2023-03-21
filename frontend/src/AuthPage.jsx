import queryString from "query-string";

function AuthPage() {
  const qs = queryString.parse(window.location.search);
  localStorage.setItem("access-token", qs.token);
  window.location.href = "/";
}

export default AuthPage;
