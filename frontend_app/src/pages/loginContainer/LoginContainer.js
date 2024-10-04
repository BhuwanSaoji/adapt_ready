import { useContext, useEffect, useState } from 'react';
import { Stack, DefaultButton, Text, Separator } from '@fluentui/react';
import SignUpForm from "../signup/SignupForm"
import LoginForm from "../login/LoginForm"
import { AuthContext } from '../../components/Authentication';
import { useNavigate } from 'react-router-dom';
// import HomePage from '../homepage/HomePage';

 
function LoginContainer() {
  const [isLogin, setIsLogin] = useState(true);
  const {isAuthenticated } = useContext(AuthContext)
  const [token, setToken] = useState("");
  const navigate = useNavigate()
  useEffect(()=>{
    let temp = localStorage.getItem("token");
    setToken(temp)
  }, [])

  function checkAuth(){
    if(isAuthenticated) navigate("/home")
    return <></>
  }


  return (
    <div className="app-container">
      {checkAuth()}
      <Stack
        tokens={{ childrenGap: 25 }}
        styles={{
          root: {
            padding: 40,
            minWidth: 600,
            minHeight: 650,
            height: '100%',
            margin: 'auto',
            backgroundColor: '#ffffff',
            boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
            borderRadius: 16, 
            background: 'linear-gradient(135deg, #f0f4f8, #ffffff)'
          },
        }}
      >
        <Text variant="xxLarge" styles={{ root: { textAlign: 'center', color: '#505f79' } }}>
          {isLogin ? 'Login to Your Account' : 'Create Your Account'}
        </Text>
        <Separator />
          <div className="login-up-card">
            {!isLogin ?
            <SignUpForm /> :  <LoginForm /> }
          </div>
        <DefaultButton
          text={isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          onClick={() => setIsLogin(!isLogin)}
          styles={{
            root: {
              width: '50%',
              backgroundColor: '#0078d4',
              color: '#ffffff',
              padding: '14px 0',
              fontSize: '16px',
              borderRadius: '6px',
              margin: '0 auto',  // Centers the button horizontally
              display: 'block',  // Ensures block-level for the centering
            },
            rootHovered: {
              backgroundColor: '#005a9e',
            },
          }}
        />
      </Stack>
    </div>
  );
}

export default LoginContainer;