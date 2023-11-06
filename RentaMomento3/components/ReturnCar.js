import {Text,Button,TextInput} from "react-native-paper"
import { Icon } from "@mui/material";
import { View,Image,select } from "react-native";
import {Controller,useForm}from "react-hook-form"
import { styles } from "../styles/styles";
import { useState } from "react";

export function ReturnCar({navigation}){

    function HandleReturnVehicle(){

    }

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
         RentNumber:"",
         PlateNumber:"",
         DevolutionDate:""
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
    uri:"https://firebasestorage.googleapis.com/v0/b/renting-63833.appspot.com/o/car-car-car-512.png?alt=media&token=360f1185-438f-4283-bf54-5536381609b3"
  }}>
    
  </Image>
  <Text style={{color:"white",fontSize:"20px",marginBottom:"20px"}}>Select Rent number</Text>

<select style={{width:"268px",height:"50px",marginBottom:"20px",borderRadius:"5px"}} 
    {...register("RentNumber",{required:true})}>
    //codigo de listado de disp
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
       {errors.RentNumber?.type == "required" && (
        <Text style={{ color: "red" }}>Debes seleccionar tu numero de renta</Text>
      )}
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
          pattern:/^\d{4}-(0\d|1[0-2])-(0\d|1\d|2\d|3[01])$/,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
          style={styles.textInput}
            autoFocus
            label="Devolution Date"
            right={<TextInput.Icon icon="user" />}
            onChangeText={onChange}
            value={value}
          ></TextInput>
        )}
        name="DevolutionDate"
      ></Controller>
 {errors.DevolutionDate?.type == "required" && (
        <Text style={{ color: "red" }}>Debes ingresar la fecha de devolucion</Text>
      )}
       {errors.DevolutionDate?.type == "Pattern" && (
        <Text style={{ color: "red" }}>Debes ingresar una fecha valida formato : YYYY-MM-DD</Text>
      )}

<View style={styles.containerButtons}></View>
        <Button
          label="Return Vehicle"
          style={styles.button}
          onPress={handleSubmit(HandleReturnVehicle)}
        >Return Vehicle</Button>
</View>
      )

}