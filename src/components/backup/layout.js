import React, { useState, useEffect } from 'react';
import images from '../asset/data.js'; 
import useWindowSize from './useWindowSize.js';
import { Blurhash } from "react-blurhash";
function PinterestLayout() {
  const [imageHeights, setImageHeights] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const {width,height}=useWindowSize() 
  useEffect(() => {
    const fetchImageHeights = async () => {
      const heights = await Promise.all(
        images.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve({ url, height: img.height});
            img.onerror = () => reject(new Error('Failed to load image'));
          });
        })
      );
      setImageHeights(heights);
    };

    fetchImageHeights();
  }, []);
 
  
  return (
    <section style={{width:"100vw"}}>
    <div style={styles.pin_container}>
      {imageHeights.map((item, index) => (
        <div
          key={index}
          style={{
            ...styles.card,
            ...styles[item.height > 800 ? "large" : "small"],height:item.height>800?0.4545*width:width>1000? 198+(0.21868*(width-1000)):0.21868*(width-500)+88.66
          }}
        > 
        <p style={{position:"absolute",zIndex:1,color:"white",fontSize:"2rem",fontWeight:"600"}}>{index}</p>
        {/* <Blurhash
                hash={"LEHLk~WB2yk8pyo0adR*.7kCMdnj"}
                width={"100%"}
                height={"100%"}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                style={{ position: 'absolute', top: 0, left: 0 }}
              /> */}
        <img src={item.url} style={{width:"100%",objectFit:"fill",height:"100%" }} />
        </div>
      ))}
    </div>
    </section>
  );
}

const styles = {
  pin_container: {
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 32%)', 
    justifyContent: 'center',
    backgroundColor: 'black', 
  },
  card: { 
    margin:"0.3rem",
        padding: 0,
        borderRadius: '16px', 
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

export default PinterestLayout;
