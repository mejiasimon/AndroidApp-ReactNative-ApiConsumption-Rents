import { grey } from "@mui/material/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
container:{
flex:1,
flexDirection: 'column',
justifyContent:"center",
alignItems:"center",
backgroundColor:"black"
},
button:{
    backgroundColor:"pink",
    width:"fitcontent",
    color:"white",
    marginTop:"20px",
    marginLeft:"5px",
    marginRight:"5px",
},
textInput:{
marginTop:"20px"
},containerButtons:{
    flexDirection: 'row',
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"black",
    flexWrap:"nowrap"
    },  carroItem: {

        backgroundColor:"purple",
        borderRadius:"10px",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,}
    


})