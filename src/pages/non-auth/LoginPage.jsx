import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../axios/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Login</h1>
      <p>Login page</p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const { data } = await authApi.post("/login", {
              id,
              password,
            });
            console.log(data);
            const { accessToken, userId, nickname } = data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userId", userId);
            localStorage.setItem("nickname", nickname);
            alert("로그인에 성공하였습니다. 메인 페이지로 이동할게요");
            navigate("/");
          } catch (error) {
            console.log(error);
            alert(error.response.data.message);
          }
        }}
      >
        <div>
          <label htmlFor="id">id</label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit">Login</button>
        <button
          type="button"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입하러가기
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
