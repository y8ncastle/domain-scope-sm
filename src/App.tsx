import "./App.css";
import useGlobalStore from "./Store";

const App = () => {
  const { isLogin, setIsLogin } = useGlobalStore();

  return (
    <div>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
};

export default App;
