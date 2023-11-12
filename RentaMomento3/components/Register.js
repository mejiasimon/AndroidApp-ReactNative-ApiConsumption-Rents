import {Text,Button,TextInput} from "react-native-paper"
import { Icon } from "@mui/material";
import { View,Image } from "react-native";
import {Controller,useForm}from "react-hook-form"
import { styles } from "../styles/styles";
import { useState } from "react";
import { GetUsers } from "../services/GetUsers";
import { PostUser } from "../services/PostUser";

export function Register ({navigation}){
  function handleBack(){
    navigation.navigate("SignIn")
  }
  const[color,setColor]=useState("")
  const[text,setText]=useState("")
    async function HandleRegister(data){
      console.log(data)
      var referenceUser=data.User
      var referencePassword=data.Password
      var referenceSaveWord=data.SaveWord
      var referenceRole=parseInt(data.role)
      var referenceName=data.Name
      var apiData=await GetUsers()
      var filtro=apiData.filter(({username,name,password,role,reservedword})=>{return username==referenceUser})
      console.log(filtro)
      if(!filtro[0]){
        try {
          await PostUser(referenceUser,referenceName,referencePassword,referenceRole,referenceSaveWord)
          setColor("green")
          setText("usuario registrado exitosamente")
        } catch (error) {
          setColor("red")
          setText("error en la creacion de usuario"+error)
        }
      }
      else{
        setColor("red")
        setText("ese usuario ya existe intente con otro")
      }

    }
    const [Password,setPassword]=useState(false)
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          User:"",
          Name:"",
          Password:"",
          SaveWord:"",
          role:""
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
          uri:"https://firebasestorage.googleapis.com/v0/b/renting-63833.appspot.com/o/acceso.png?alt=media&token=795d8c69-7763-45e3-88d6-0a77cd5bc41d"
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
                style={styles.textInput}
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
             {errors.User?.type == "pattern" && (
              <Text style={{ color: "red" }}>Debes ingresar un nombre valido solo letras</Text>
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
                  label="Name"
                  right={<TextInput.Icon icon="user" />}
                  onChangeText={onChange}
                  value={value}
                ></TextInput>
              )}
              name="Name"
            ></Controller>
       {errors.Name?.type == "required" && (
              <Text style={{ color: "red" }}>Debes ingresar tu nombre</Text>
            )}
             {errors.Name?.type == "pattern" && (
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

<Controller
              control={control}
              rules={{
                required: true,
                pattern:/^(0|1)$/,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                style={styles.textInput}
                  autoFocus
                  label="role"
                  right={<TextInput.Icon icon="user" />}
                  onChangeText={onChange}
                  value={value}
                ></TextInput>
              )}
              name="role"
            ></Controller>


        {errors.role?.type == "required" && (
              <Text style={{ color: "red" }}>Debes ingresar el rol</Text>
            )}
               {errors.role?.type == "pattern" && (
              <Text style={{ color: "red" }}>el rol debe estar entre 0 y 1</Text>
            )}
            <Text style={{color:`${color}`,fontSize:"10px"}}>{text}</Text>
            <View style={styles.containerButtons}>
            <Button
                label="Register"
                style={styles.button}
                onPress={handleSubmit(HandleRegister)}
              >Register</Button>
                 <Button
                label="Back"
                style={styles.button}
                onPress={handleBack}
              >Back</Button>
              
</View>
           
      </View>)
}