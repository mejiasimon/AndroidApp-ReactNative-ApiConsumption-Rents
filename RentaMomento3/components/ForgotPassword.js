
import {Text,Button,TextInput} from "react-native-paper"
import { Icon } from "@mui/material";
import { View,Image } from "react-native";
import {Controller,useForm}from "react-hook-form"
import { styles } from "../styles/styles";
import { useState } from "react";
import { GetUsers } from "../services/GetUsers";
import { PutUser } from "../services/PutUser";
import { Try } from "@mui/icons-material";
export function ForgotPassword({navigation}){
  function handleBack(){
    navigation.navigate("SignIn")
  }
    async function handleChangePassword(data){
      var referenceUser=data.User
      var referencePassword=data.Password
      var referenceSaveWord=data.SaveWord
        try {
var apiData=await GetUsers()
        }
        catch(error){
          setColor("red")
          setText(error)
        }
        var filtro=apiData.filter(({username,name,password,role,reservedword})=>{return reservedword==referenceSaveWord && username==referenceUser})
        if(filtro[0]){
          var oldusername=filtro[0].username
          var oldname=filtro[0].name
          var oldrole= parseInt(filtro[0].role)  
          var oldreservedword=filtro[0].reservedword
          var id=filtro[0]._id
          try{
            await PutUser(oldusername,oldname,referencePassword,oldrole,oldreservedword,id)
            setColor("green")
          setText("contraseña cambiada")
          }catch(error){
            setColor("red")
          setText("hay un error con el cambio de contraseña "+error)
          }
          
        }else{
          setColor("red")
          setText("la palabra reservada no hace match con la guardada")
        }



    }
    const [Password,setPassword]=useState(false)
    const[color,setColor]=useState("")
    const[text,setText]=useState("")
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
                pattern:/[@!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
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
                       <Text style={{color:`${color}`,fontSize:"10px"}}>{text}</Text>
            <View style={styles.containerButtons}>
            <Button
                label="Rgister"
                style={styles.button}
                onPress={handleSubmit(handleChangePassword)}
              >Recover Password</Button>
                   <Button
                label="SignIn"
                style={styles.button}
                onPress={handleBack}
              >Back</Button>
            </View>
        
      </View>)




    
}