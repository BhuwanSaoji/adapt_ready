import React, { useState, useContext } from 'react';
import { TextField, PrimaryButton, Stack, Icon, mergeStyleSets } from '@fluentui/react';
import { AuthContext } from '../../components/Authentication';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

  const handleSubmit = () => {
    login({username:email, password});
  };

  const classes = mergeStyleSets({
    formContainer: {
      width: '100%',
      height: '100%',
      maxWidth: '400px',
      margin: 'auto',
      display: "flex",
      justifyContent: "center",
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      '@media(max-width: 600px)': {
        padding: '10px',
      },
    },
    icon: {
      fontSize: '36px',
      color: '#0078D4',
    },
    button: {
      root: {
        width: '100%',
        padding: '10px 0',
      },
    },
    header: {
      textAlign: 'center',
    },
  });

  return (
    <Stack tokens={{ childrenGap: 20 }} className={classes.formContainer}>
      <Stack horizontalAlign="center" className={classes.header}>
        <Icon iconName="Contact" className={classes.icon} />
        <h2>Login</h2>
      </Stack>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e, newValue) => setEmail(newValue)}
        required
        underlined
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e, newValue) => setPassword(newValue)}
        required
        underlined
      />
      <PrimaryButton
        text="Login"
        onClick={handleSubmit}
        className={classes.button}
      />
    </Stack>
  );
};

export default LoginForm;
