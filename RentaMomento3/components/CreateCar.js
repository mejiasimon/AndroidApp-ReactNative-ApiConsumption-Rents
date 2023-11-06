import {Text,Button,TextInput} from "react-native-paper"
import { Icon } from "@mui/material";
import { View,Image } from "react-native";
import {Controller,useForm}from "react-hook-form"
import { styles } from "../styles/styles";
import { useState } from "react";
export function CreateCar ({navigation}){
  function HandleListVehicle(){

  }
    function HandleStoreVehicle(){
        
    }
    function HandleUpdateVehicle(){

    }
    function HandleDeleteVehicle(){

    }
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          PlateNumber:"",
          Brand:"",
          State:"",
          DailyValue:""
        },
      });
      return(
        <View style={styles.container} >
  <Image 
  style={
    {
      height:150,
      width:150
    }
  }
  source={{
    uri:"https://firebasestorage.googleapis.com/v0/b/renting-63833.appspot.com/o/car-car-car-1-512.png?alt=media&token=dbfdf215-3495-4839-ac85-4ac475c89504"
  }}>
    
  </Image>
<Controller
        control={control}
        rules={{
          required: true,
          pattern:/^([A-Z]{3}-\d{3,4})$/,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoFocus
            label="Plate number"
            right={<TextInput.Icon icon="user" />}
            onChangeText={onChange}
            value={value}
          ></TextInput>
        )}
        name="PlateNumber"
      ></Controller>
 {errors.PlateNumber?.type == "required" && (
        <Text style={{ color: "red" }}>Debes ingresar la placa del vehiculo</Text>
      )}
       {errors.PlateNumber?.type == "Pattern" && (
        <Text style={{ color: "red" }}>Debes ingresar una placa valida formato : ABC-123</Text>
      )}

<Controller
        control={control}
        rules={{
          required: true,
          pattern:/^[A-Z]+$/i
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
          style={styles.textInput}
            autoFocus
            label="Brand"
            right={<TextInput.Icon icon=""/>}
            onChangeText={onChange}
            value={value}
          ></TextInput>
        )}
        name="Brand"
      ></Controller>
         {errors.Brand?.type == "required" && (
        <Text style={{ color: "red" }}>la marca del vehiculo es requerida</Text>
      )}
       {errors.Brand?.type =="pattern" && (
        <Text style={{ color: "red" }}>la marca del vehiculo debe ser escrita en letras</Text>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
          pattern:/^(0|1)$/
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
          style={styles.textInput}
            autoFocus
            label="State"
            right={<TextInput.Icon icon=""/>}
            onChangeText={onChange}
            value={value}
          ></TextInput>
        )}
        name="State"
      ></Controller>
     {errors.State?.type == "required" && (
        <Text style={{ color: "red" }}>el estado del vehiculo es requerido</Text>
      )}
       {errors.State?.type =="pattern" && (
        <Text style={{ color: "red" }}>el estado debe estar entre 1 y 0</Text>
      )}
<Controller
        control={control}
        rules={{
          required: true,
          pattern:/^[0-9]+$/
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
          style={styles.textInput}
            autoFocus
            label="Daily value"
            right={<TextInput.Icon icon=""/>}
            onChangeText={onChange}
            value={value}
          ></TextInput>
        )}
        name="DailyValue"
      ></Controller>
     {errors.DailyValue?.type == "required" && (
        <Text style={{ color: "red" }}>el valor diario es requerido</Text>
      )}
       {errors.DailyValue?.type =="pattern" && (
        <Text style={{ color: "red" }}>solo se aceptan numeros</Text>
      )}
      <View style={styles.containerButtons}>
      <Button
          label="Store vehicle"
          style={styles.button}
          onPress={handleSubmit(HandleStoreVehicle)}
        >Store vehicle</Button>
         <Button
          label="Register"
          style={styles.button}
          onPress={HandleUpdateVehicle}
        >Update</Button>
      </View>
      <View style={styles.containerButtons}>
      <Button
          label="Delete"
          style={styles.button}
          onPress={HandleDeleteVehicle}
        >Delete</Button>
         <Button
          label="List"
          style={styles.button}
          onPress={HandleListVehicle}
        >List</Button>


      </View>
  
</View>
      )
}