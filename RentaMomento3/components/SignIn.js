import {Text,View,Image,Button} from "react-native-paper"
import {Controller,useForm}from "react-hook-form"
import { styles } from "../styles/styles";
import { useState } from "react";
export function SigIn(){
    const [Password,setPassword]=useState(tue)
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          User:"",
          Password:"",
        },
      });
return(
<View style={styles.container} >
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
            right={<TextInput.Icon icon="person" />}
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
        <Button
          label="SignIn"
          style={styles.button}
          icon="login"
          onPress={handleSubmit()}
        ></Button>
</View>
)
}