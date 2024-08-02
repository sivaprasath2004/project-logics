import React, { useState, useEffect } from 'react';
import images from '../asset/data.js'; 

function PinterestLayout() {
  const [imageHeights, setImageHeights] = useState([]);

  useEffect(() => {
    const fetchImageHeights = async () => {
      const heights = await Promise.all(
        images.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve({ url, height: img.height });
            img.onerror = () => reject(new Error('Failed to load image'));
          });
        })
      );
      setImageHeights(heights);
    };

    fetchImageHeights();
  }, []);

  console.log(imageHeights);
  
  return (
    <div style={styles.pin_container}>
      {imageHeights.map((item, index) => (
        <div
          key={index}
          style={{
            ...styles.card,
            ...styles[item.height > 800 ? "large" : "small"]
          }}
        > 
        <p style={{position:"absolute",zIndex:1,color:"white",fontSize:"2rem",fontWeight:"600"}}>{index}</p>
        <img src={item.url} style={{width:"100%",objectFit:"contain"}} />
        </div>
      ))}
    </div>
  );
}

const styles = {
  pin_container: {
    margin: 0,
    padding: 0,
    width: '100vw',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30vw)',
    gridAutoRows: '10px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    justifyContent: 'center',
    backgroundColor: 'black',
    rowGap:"0.2rem"
  },
  card: { 
    margin:"1rem",
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
    gridRowEnd: 'span 45',
  },
};

export default PinterestLayout;
