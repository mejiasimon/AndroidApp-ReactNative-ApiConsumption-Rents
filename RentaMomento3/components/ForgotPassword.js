
import {Text,Button,TextInput} from "react-native-paper"
import { Icon } from "@mui/material";
import { View,Image } from "react-native";
import {Controller,useForm}from "react-hook-form"
import { styles } from "../styles/styles";
import { useState } from "react";
export function ForgotPassword({navigation}){
    function handleChangePassword(){
        
    }
    const [Password,setPassword]=useState(true)
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          User:"",
          Password:"",
          SaveWord:""
        },
      });
      return(<View style={styles.container} >
        <Image 
        style={
          {
            height:150,
            width:150
          }
        }
        source={{
          uri:"https://firebasestorage.googleapis.com/v0/b/renting-63833.appspot.com/o/vecteezy_password-vector-icon_19504586-removebg-preview.png?alt=media&token=ad5646b7-352c-433d-83f2-451256c66275"
        }}>
          
        </Image>
      <Controller
              control={control}
              rules={{
                required: true,
                pattern:/^[A-Z]+$/i,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  autoFocus
                  label="User"
                  right={<TextInput.Icon icon="user" />}
                  onChangeText={onChange}
                  value={value}
                ></TextInput>
              )}
              name="User"
            ></Controller>
       {errors.User?.type == "required" && (
              <Text style={{ color: "red" }}>Debes ingresar tu Usuario</Text>
            )}
             {errors.User?.type == "Pattern" && (
              <Text style={{ color: "red" }}>Debes ingresar un nombre valido solo letras</Text>
            )}
      
      <Controller
              control={control}
              rules={{
                required: true,
                minLength:6,
                maxLength:12,
                pattern:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                style={styles.textInput}
                  autoFocus
                  label="Password"
                  secureTextEntry={!Password}
                  right={<TextInput.Icon icon={Password? "eye" : "eye-off"}
                  onPress={() => setPassword(!Password)} />}
                  onChangeText={onChange}
                  value={value}
                ></TextInput>
              )}
              name="Password"
            ></Controller>
       {errors.Password?.type == "required" && (
              <Text style={{ color: "red" }}>Debes ingresar tu Contraseña</Text>
            )}
             {errors.Password?.type == "minLength" && (
              <Text style={{ color: "red" }}>tu contraseña debe tener almenos 6 caracteres</Text>
            )}
               {errors.Password?.type == "maxLength" && (
              <Text style={{ color: "red" }}>tu contraseña debe tener menos de 12 caracteres</Text>
            )}
             {errors.Password?.type =="pattern" && (
              <Text style={{ color: "red" }}>tu contraseña debe tener almenos un signo especial
              </Text>
            )}

<Controller
              control={control}
              rules={{
                required: true,
                pattern:/^[A-Z]+$/i,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                style={styles.textInput}
                  autoFocus
                  label="Save Word"
                  right={<TextInput.Icon icon="user" />}
                  onChangeText={onChange}
                  value={value}
                ></TextInput>
              )}
              name="SaveWord"
            ></Controller>
                {errors.SaveWord?.type == "required" && (
              <Text style={{ color: "red" }}>Debes ingresar la palabra reservada</Text>
            )}
               {errors.SaveWord?.type == "pattern" && (
              <Text style={{ color: "red" }}>La palabra reservada solo tiene letras</Text>
            )}
               <Button
                label="Rgister"
                style={styles.button}
                onPress={handleSubmit(handleChangePassword)}
              >Recover Password</Button>
      </View>)




    
}