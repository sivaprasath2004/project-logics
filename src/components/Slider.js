import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import images from '../asset/data' 
export const Slider = () => {
  const navigation=useNavigate()
  const [image,setImage]=useState({})
  const {id,place}=useParams()
  const [details,setDetails]=useState({id:id,place:place}) 
  const GetImageDetails=()=>{ 
    setImage(images[Number(details.place)]) 
  }
  const handleNavigate=()=>{
    navigation("/")
  }
    useEffect(()=>{
      GetImageDetails()
    },[details])
    console.log(details)
  return (
    <section style={styles.Slider}>
        <div style={{position:"absolute",top:"3%",right:"3%",zIndex:2}}><img style={{width:"30px"}} src='https://cdn-icons-png.flaticon.com/128/9068/9068699.png' alt='close' /></div>
         <div style={{width:"10%"}}><img onClick={()=>setDetails(pre=>({...pre,place:pre.place!==0?pre.place-1:0}))} style={{width:"30px"}} src='https://cdn-icons-png.flaticon.com/128/271/271220.png' alt='previous' /></div>
         <div style={{width:"80%"}}><img style={{objectFit:'contain',height:'100%',width:"100%"}} src={image.url} alt='image'/></div>
         <div style={{width:'10%'}}><img onClick={()=>setDetails(pre=>({...pre,place:pre.place+1}))} style={{width:"30px"}} src='https://cdn-icons-png.flaticon.com/128/271/271228.png' alt='Next'/></div>
    </section>
  )
}

const styles={
  Slider:{
    position:"relative",
    height:'100vh',
    width:"100vw", 
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
}