import {Text,Button,TextInput} from "react-native-paper"
import { Icon } from "@mui/material";
import { View,Image } from "react-native";
import {Controller,useForm}from "react-hook-form"
import { styles } from "../styles/styles";
import { useState } from "react";
import { PostCar } from "../services/PostCar";
import { GetCars } from "../services/GetCars";
import { PutCar } from "../services/PutCar";
export function CreateCar ({navigation}){
  function HandleReturnVehicles(){
        navigation.navigate("ReturnCar")
  }
  async function HandleListVehicle(){
navigation.navigate("ListCars")
  }
    async function HandleStoreVehicle(data){
      let referenceplatenumber=data.PlateNumber
      let referencebrand=data.Brand
      let referencestate=parseInt(data.State)
      let referencedailyvalue=parseInt(data.DailyValue)
      try {
        var apiData=await GetCars()
      } catch (error) {
        setColor("red")
        setText("hay un error con la busqueda "+error)
      }
      let filtro=apiData.filter(({platenumber,brand,state,dailyvalue})=>{return platenumber==referenceplatenumber})
      if(!filtro[0]){
        try {
          await PostCar(referenceplatenumber,referencebrand,referencestate,referencedailyvalue)
          setColor("green")
          setText("vehiculo guardado con exito")
        } catch (error) {
          setColor("red")
          setText("hay un error con la busqueda "+error)
        }
      }else{
        setColor("red")
        setText("ya hay un vehiculo con esa placa no es posible crearlo")
      }
     
        
    }
    async function HandleUpdateVehicle(data){
      var referenceplatenumber=data.PlateNumber
      var referencebrand=data.Brand
      var referencestate=parseInt(data.State)
      var referencedailyvalue=parseInt(data.DailyValue)

      try {
        var apiData=await GetCars()
        setColor("green")
        setText("vehiculo actualizado con exito")
      } catch (error) {
        setColor("red")
        setText("hay un error con la busqueda "+error)
      }
      var filtro=apiData.filter(({platenumber,brand,state,dailyvalue})=>{return platenumber==referenceplatenumber})
      console.log(filtro[0])
      var id=filtro[0]._id
      if(filtro[0]){
        try {
          await PutCar(id,referenceplatenumber,referencebrand,referencestate,referencedailyvalue)
        } catch (error) {
          setColor("red")
        setText("Error al actualizar el vehiculo "+error)
        }
        
      }else{
        setColor("red")
        setText("Ese vehiculo no existe por lo que no se puede actualizar")
      }
    }
    function HandleDeleteVehicle(){
      navigation.navigate("Delete")

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
      const[color,setColor]=useState("")
      const[text,setText]=useState("")
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
      <Text style={{color:`${color}`,fontSize:"10px"}}>{text}</Text>
      <View style={styles.containerButtons}>
      <Button
          label="Store vehicle"
          style={styles.button}
          onPress={handleSubmit(HandleStoreVehicle)}
        >Store vehicle</Button>
         <Button
          label="Register"
          style={styles.button}
          onPress={handleSubmit(HandleUpdateVehicle)}
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
      <Button
          label="Return Vehicles"
          style={styles.button}
          onPress={HandleReturnVehicles}
        >Return Vehicles</Button>
  
</View>
      )
}