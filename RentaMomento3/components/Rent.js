import {Text,Button,TextInput} from "react-native-paper"
import { Icon } from "@mui/material";
import { View,Image} from "react-native";
import {Controller,useForm}from "react-hook-form"
import { styles } from "../styles/styles";
import { useState,useEffect } from "react";
import { GetCars } from "../services/GetCars";
import RNPickerSelect from 'react-native-picker-select';
import { PostRent } from "../services/PostRent";
import { PutCar } from "../services/PutCar";
var RentNumber=[0]
export function Rent({navigation}){

  function esFechaMayorQueHoy(fechaIngresada) {
    // Obtener la fecha actual del sistema
    const fechaActual = new Date();
  
    // Convertir la fecha ingresada a un objeto Date
    const fechaIngresadaObj = new Date(fechaIngresada);
  
    // Comparar las fechas
    return fechaIngresadaObj > fechaActual;
  }
  function esFechaMayorQueHoy2(fechaIngresada) {
    // Obtener la fecha actual del sistema
    const fechaActual = new Date();
  
    // Convertir la fecha ingresada a un objeto Date
    const fechaIngresadaObj = new Date(fechaIngresada);
  
    // Comparar las fechas
    return fechaIngresadaObj >= fechaActual;
  }


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
    
    async function HandleRent(data){
      const esMayor = esFechaMayorQueHoy(data.InitialDate);
      const esMayor2 = esFechaMayorQueHoy2(data.FinalDate);
if(esMayor2){
  if(esMayor){
    var referenceVehicle=data.Vehicle
    var referenceInitialDate=data.InitialDate
    var referenceFinalDate=data.FinalDate
    var numero=RentNumber.length-1
    RentNumber.push(numero+1)
    console.log(RentNumber)
    var RentCode=RentNumber[RentNumber.length-1]
    try {
      var datos=await GetCars()
      var filtro=datos.filter(({platenumber,brand,state,dailyvalue})=>{return platenumber==referenceVehicle})
      if(filtro[0]){
        var oldplatenumber=filtro[0].platenumber
        var oldbrand=filtro[0].brand
        var olddailyvalue=filtro[0].dailyvalue
        var id=filtro[0]._id
        try {
          await PostRent(RentCode,referenceVehicle,referenceInitialDate,referenceFinalDate,"user",true)
          await PutCar(id,oldplatenumber,oldbrand,0,olddailyvalue)
          setColor("green")
          setText("vehiculo rentado con exito tu numero de renta es: "+RentCode)
        } catch (error) {
          setColor("red")
          setText("error con la renta"+error)
        }
      }else{
        setColor("red")
      setText("no existe ese vhiculo")
      }
    } catch (error) {
      setColor("red")
      setText("error al rentar "+error)
    }
  }else{
    setColor("red")
      setText("la fecha inicial es menor a la fecha actual")
  }
}else{
  setColor("red")
      setText("la fecha final es debe ser mayor o igual a la fecha inicial")
}





      


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
          inputWeb={{width:"268px",height:"50px",marginBottom:"20px",borderRadius:"5px"}}
            onValueChange={(value) => setValue('Vehicle', value)}
            items={data.map((opcion) => ({
              label: opcion.platenumber,
              value: opcion.platenumber,
            }))}
            value={field.value}
          />
        )}
        name="Vehicle"
        defaultValue={""}
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
      <Text style={{color:`${color}`,fontSize:"20px"}}>{text}</Text>
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
</View>
      )
}