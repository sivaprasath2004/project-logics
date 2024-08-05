import React,{useState,useEffect} from 'react'
import useWindowSize from './useWindowSize';
import { Link } from 'react-router-dom';
import { Blurhash } from 'react-blurhash';
export const Vertical_image_loaded = ({item,index}) => {
    const [loaded, setLoaded] = useState(false);
    const {width,height}=useWindowSize() 
    useEffect(() => {
        const img=new Image()
        img.onload=()=>{
            setLoaded(true)
        }
        img.src=item.url
      }, [item.url]);
    
  return (
    <div
          key={index}
          style={{
            ...styles.card,
            ...styles[item.height > 800 ? "large" : "small"],height:item.height>800?0.4545*width:width>1000? 198+(0.21868*(width-1000)):0.21868*(width-500)+88.66
          }}
         id={item.id}
         className='child'
        > 
        <p style={{position:"absolute",zIndex:1,color:"white",fontSize:"2rem",fontWeight:"600"}}>{index}</p>
        {!loaded&&(<Blurhash
                hash={"LEHLk~WB2yk8pyo0adR*.7kCMdnj"}
                width={"100%"}
                height={"100%"}
                resolutionX={32}
                resolutionY={32}
                punch={1} 
              />
        )}
        {loaded&&(
        <Link to={`image/${item.id}/${index}`}>
        <img src={item.url} onLoad={()=>setLoaded(true)} style={{width:"100%",objectFit:"fill",height:"100%" }} />
        </Link>
        )}
        </div>
  )
}
const styles={
    
  card: { 
    margin:"0.3rem",
        padding: 0,
        borderRadius: '16px', 
        position:"relative"
  },
  small: {
    gridRowEnd: 'span 20',
  },
  medium: {
    gridRowEnd: 'span 33',
  },
  large: {
    gridRowEnd: 'span 43',
  },
};

