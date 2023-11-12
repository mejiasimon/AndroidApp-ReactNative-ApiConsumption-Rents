import {Text,Button,TextInput} from "react-native-paper"
import { Icon } from "@mui/material";
import { View,Image,select } from "react-native";
import {Controller,useForm}from "react-hook-form"
import { styles } from "../styles/styles";
import { useState,useEffect } from "react";
import { GetCars } from "../services/GetCars";
import RNPickerSelect from 'react-native-picker-select';

export function Rent({navigation}){


  const [data,setdata]=useState([])
  async function fetchdata(){
    try {
        let datos=await GetCars()
        let filtro=datos.filter(({platenumber,brand,state,dailyvalue})=>{return state==1})
        setdata(filtro)
    }catch(error){
console.log(error)
    }
}
useEffect(()=>{
    fetchdata()
},[])
console.log(data)
    function HandleListVehicles(){
navigation.navigate("ListCarsRent")
    }
    function HandleReturnVehicles(){
        
    }
    async function HandleRent(data){
      console.log(data)

    }
    const[color,setColor]=useState("")
    const[text,setText]=useState("")
    const {
        control,
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
         Vehicle:"",
         InitialDate:"",
         FinalDate:""
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
    uri:"https://firebasestorage.googleapis.com/v0/b/renting-63833.appspot.com/o/car-anti-theft-car-car-512.png?alt=media&token=acec666f-eb90-4886-94c1-4e0a1cccc9da"
  }}>
    
  </Image>
  <Text style={{color:"white",fontSize:"20px",marginBottom:"20px"}}>Select Vehicle</Text>

  <Controller
 rules={{
  required: true,
}}
        control={control}
        render={({ field }) => (
          <RNPickerSelect
          style={{width:"268px",height:"50px",marginBottom:"20px",borderRadius:"5px"}}
            onValueChange={(value) => setValue('Vehicle', value)}
            items={data.map((opcion) => ({
              label: opcion.platenumber,
              value: opcion.platenumber,
            }))}
            value={field.value}
          />
        )}
        name="Vehicle"
        defaultValue={null}
      />
      {errors.Vehicle?.type == "required" && (
        <Text style={{ color: "red" }}>Debes seleccionar el vehiculo</Text>
      )}

<Controller
        control={control}
        rules={{
          required: true,
          pattern:/^\d{4}-(0\d|1[0-2])-(0\d|1\d|2\d|3[01])$/,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoFocus
            label="Initial Date"
            right={<TextInput.Icon icon="user" />}
            onChangeText={onChange}
            value={value}
          ></TextInput>
        )}
        name="InitialDate"
      ></Controller>
 {errors.InitialDate?.type == "required" && (
        <Text style={{ color: "red" }}>Debes ingresar la fecha inicial</Text>
      )}
       {errors.InitialDate?.type == "pattern" && (
        <Text style={{ color: "red" }}>Debes ingresar una fecha valida formato : YYYY-MM-DD</Text>
      )}




<Controller
        control={control}
        rules={{
          required: true,
          pattern:/^\d{4}-(0\d|1[0-2])-(0\d|1\d|2\d|3[01])$/
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
          style={styles.textInput}
            autoFocus
            label="Final Date"
            right={<TextInput.Icon icon=""/>}
            onChangeText={onChange}
            value={value}
          ></TextInput>
        )}
        name="FinalDate"
      ></Controller>
         {errors.FinalDate?.type == "required" && (
        <Text style={{ color: "red" }}>la fecha final es requerida</Text>
      )}
       {errors.FinalDate?.type =="pattern" && (
        <Text style={{ color: "red" }}>Debes ingresar una fecha valida formato : YYYY-MM-DD</Text>
      )}
      <Text style={{color:{color},fontSize:"20px"}}>{text}</Text>
<View style={styles.containerButtons}>
<Button
          label="Rent Vehicle"
          style={styles.button}
          onPress={handleSubmit(HandleRent)}
        >Rent</Button>
         <Button
          label="List Vehicles"
          style={styles.button}
          onPress={HandleListVehicles}
        >List Vehicles</Button>

</View>
 
           <Button
          label="Return Vehicles"
          style={styles.button}
          onPress={HandleReturnVehicles}
        >Return Vehicles</Button>
</View>
      )
}