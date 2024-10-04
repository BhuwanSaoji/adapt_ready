import React, { useState } from 'react';
import { TextField, PrimaryButton, Stack, Icon, mergeStyleSets, MessageBarType } from '@fluentui/react';
import { postAPI } from '../../common/ApiHelper';
import MessageBarComponent from '../../components/MessageBar';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(MessageBarType.error);


  const handleSubmit = async () => {
    try {

        if(!email || email.length==0){
            setMessage("Email field cannot be empty")
            return
        } 

        if(!password || password.length==0){
            setMessage("Password field cannot be empty")
            return
        } 

        if(!confirmPassword || confirmPassword.length==0){
            setMessage("Confirm Password field cannot be empty")
            return
        } 


        if(password===confirmPassword){
            let result = await postAPI("/register", {username:email, password});
            if(result.status == 200){
              setMessage("User saved successfully, Please login to continue.")
              setMessageType(MessageBarType.success)
            }else{
              setMessage("User is not saved . Try again later");
              setMessageType(MessageBarType.error)
            }
            return;
        }

        setMessage("Password and confirm password doesn't match");
        setMessageType(MessageBarType.error)

    } catch (error) {
        console.log(error)
    }
  };

  const classes = mergeStyleSets({
    formContainer: {
      width: '100%',
      maxWidth: '400px',
      margin: 'auto',
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
    <>  

    {message && <MessageBarComponent message={message} messageType={messageType} /> }
    <Stack tokens={{ childrenGap: 20 }} className={classes.formContainer}>
      <Stack horizontalAlign="center" className={classes.header}>
        <Icon iconName="AddFriend" className={classes.icon} />
        <h2>Sign Up</h2>
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
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e, newValue) => setConfirmPassword(newValue)}
        required
        underlined
      />
      <PrimaryButton
        text="Sign Up"
        onClick={handleSubmit}
        className={classes.button}
      />
    </Stack>
    </>

  );
};

export default SignUpForm;
