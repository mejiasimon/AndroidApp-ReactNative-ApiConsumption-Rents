import {Text,Button,TextInput} from "react-native-paper"
import { Icon } from "@mui/material";
import { View,Image,FlatList } from "react-native";
import {Controller,useForm}from "react-hook-form"
import { styles } from "../styles/styles";
import { useState } from "react";
import { FilterOutlined } from "@mui/icons-material";
import { GetCars } from "../services/GetCars";
import { useEffect } from "react";
export function ListCarsRent({navigation}){
const [data,setdata]=useState("")
    function handleBack(){
        navigation.navigate("Rent")
    }
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
    return(
        <View style={styles.container}>
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
     <FlatList
        data={data}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.carroItem}>
            <Text style={{color:"white"}}>{`Placa: ${item.platenumber}`}</Text>
            <Text style={{color:"white"}}>{`Marca: ${item.brand}`}</Text>
            <Text style={{color:"white"}}>{`Estado: ${item.state}`}</Text>
            <Text style={{color:"white"}}>{`valor diario: ${item.dailyvalue}`}</Text>
            <Text style={{color:"white"}}>{`id: ${item._id}`}</Text>
          </View>
          
        )}
      />
                 <Button
                label="Back"
                style={{    backgroundColor:"pink",
                width:"fitcontent",
                color:"white",
                marginTop:"20px",
                marginLeft:"5px",
                marginRight:"5px",
            marginBottom:"20px"}}
                onPress={handleBack}
              >Back</Button>
        </View>
    )
}