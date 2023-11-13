import {Text,Button,TextInput} from "react-native-paper"
import { Icon } from "@mui/material";
import { View,Image,select } from "react-native";
import {Controller,useForm}from "react-hook-form"
import { styles } from "../styles/styles";
import { useState,useEffect } from "react";
import { GetRents } from "../services/GetRents";
import RNPickerSelect from 'react-native-picker-select';
import { PutCar } from "../services/PutCar";
import { GetCars } from "../services/GetCars";
import { PutRent } from "../services/PutRent";


export function ReturnCar({navigation}){
  const[color,setColor]=useState("")
    const[text,setText]=useState("")
  const [data,setdata]=useState([])
  async function fetchdata(){
    try {
        let datos=await GetRents()
        let filtro=datos.filter(({rentnumber,username,platenumber,initialdate,finaldate,status})=>{return status==true})
        setdata(filtro)
    }catch(error){
console.log(error)
    }
}
useEffect(()=>{
    fetchdata()
},[])
    async function HandleReturnVehicle(data){
var referencerentnumber=data.RentNumber
var referenceplatenumber=data.PlateNumber

try {
  let apiData=await GetRents()
  var filtro2=apiData.filter(({rentnumber,username,platenumber,initialdate,finaldate,status})=>{return rentnumber==referencerentnumber && platenumber==referenceplatenumber})
  if(filtro2[0]){
var oldrentumber=filtro2[0].rentnumber
var oldplatenumber=filtro2[0].platenumber
var oldinitialdate=filtro2[0].initialdate
var oldfinaldate=filtro2[0].finaldate
var id=filtro2[0]._id
await PutRent(id,oldrentumber,oldplatenumber,oldinitialdate,oldfinaldate)
try {
  let apiData2=await GetCars()
var filtro3=apiData2.filter(({platenumber,brand,state,dailyvalue})=>{return platenumber==oldplatenumber})
if(filtro3[0]){
var oldplatenumber2=filtro3[0].platenumber
var oldbrand=filtro3[0].brand
var olddailyvalue=filtro3[0].dailyvalue
var id2=filtro3[0]._id
await PutCar(id2,oldplatenumber2,oldbrand,1,olddailyvalue)
setColor("green")
setText("vehiculo retornado")
}else{
  setColor("red")
  setText("no existe ese vehiculo")
}
} catch (error) {
  setColor("red")
    setText("error al traer vehiculos "+error)
}


  }else{
    setColor("red")
    setText("no existe ese numero de renta o la placa es incorrecta")
  }
} catch (error) {
  setColor("red")
    setText("error al traer Rentas "+error)
}
    }
    const {
        control,
        handleSubmit,
        setValue,
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
  <Controller
 rules={{
  required: true,
}}
        control={control}
        render={({ field }) => (
          <RNPickerSelect
          inputWeb={{width:"268px",height:"50px",marginBottom:"20px",borderRadius:"5px"}}
            onValueChange={(value) => setValue("RentNumber", value)}
            items={data.map((opcion) => ({
              label: opcion.rentnumber.toString()   ,
              value: opcion.rentnumber,
            }))}
            value={field.value}
          />
        )}
        name="RentNumber"
        defaultValue={""}
      />
      {errors.RentNumber?.type == "required" && (
        <Text style={{ color: "red" }}>Debes seleccionar el numero de renta</Text>
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
<Text style={{color:`${color}`,fontSize:"20px"}}>{text}</Text>
<View style={styles.containerButtons}></View>
        <Button
          label="Return Vehicle"
          style={styles.button}
          onPress={handleSubmit(HandleReturnVehicle)}
        >Return Vehicle</Button>
</View>
      )

}